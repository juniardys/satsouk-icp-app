// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "usingtellor/contracts/UsingTellor.sol";

contract BettingContract is UsingTellor {
    mapping(address => bool) public admins;
    uint256 public betCounter;

    enum BetStatus {
        ACTIVE,
        FINISHED,
        CANCELED
    }

    struct Bet {
        string title;
        string category;
        bool isAIPick;
        string picture;
        uint256 executionTime;
        uint256 expirationDate;
        uint256 id;
        BetStatus status;
        mapping(string => uint256) options;
        string[] optionKeys;
        mapping(string => Bettor[]) bettors;
        string correctAnswer;
        string oracleAnswer;
    }

    struct Bettor {
        address bettor;
        uint256 amount;
    }

    struct UserBet {
        uint256 betId;
        string optionChosen;
        uint256 amount;
    }

    uint256[] public betIds;
    mapping(uint256 => Bet) public bets;

    event BetRegistered(
        uint256 id,
        string title,
        string picture,
        string category,
        uint256 executionTime,
        string[] options
    );
    event BetPlaced(uint256 id, address bettor, string option, uint256 value);
    event BetExecuted(uint256 id, string correctAnswer);
    event BetAdminExecuted(uint256 id, string correctAnswer);
    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);
    event OracleAnswerRetrieved(uint256 betId, string oracleAnswer);

    constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) {
        admins[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can call this function");
        _;
    }

    function addAdmin(address _newAdmin) external onlyAdmin {
        require(!admins[_newAdmin], "Address is already an admin");
        admins[_newAdmin] = true;
        emit AdminAdded(_newAdmin);
    }

    function removeAdmin(address _admin) external onlyAdmin {
        require(admins[_admin], "Address is not an admin");
        require(_admin != msg.sender, "Admin cannot remove themselves");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function registerBet(
        string memory _title,
        string memory _category,
        bool _isAIPick,
        string memory _picture,
        uint256 _executionTime,
        uint256 _expirationDate,
        string[] memory _options
    ) external onlyAdmin {
        betCounter++;
        Bet storage newBet = bets[betCounter];
        newBet.title = _title;
        newBet.category = _category;
        newBet.isAIPick = _isAIPick;
        newBet.picture = _picture;
        newBet.executionTime = _executionTime;
        newBet.expirationDate = _expirationDate;
        newBet.id = betCounter;
        newBet.status = BetStatus.ACTIVE;

        for (uint256 i = 0; i < _options.length; i++) {
            newBet.options[_options[i]] = 0;
            newBet.optionKeys.push(_options[i]);
        }

        betIds.push(betCounter);
        emit BetRegistered(
            betCounter,
            _title,
            _picture,
            _category,
            _executionTime,
            _options
        );
    }

    function placeBet(uint256 _betId, string memory _option) external payable {
        Bet storage bet = bets[_betId];
        require(
            block.timestamp < bet.executionTime,
            "Betting on this event has expired"
        );

        bool available = bet.options[_option] > 0;

        if (!available) {
            // Check valid option
            for (uint256 i = 0; i < bet.optionKeys.length; i++) {
                if (
                    keccak256(abi.encodePacked(bet.optionKeys[i])) ==
                    keccak256(abi.encodePacked(_option))
                ) {
                    available = true;
                    break;
                }
            }
        }

        require(available, "Invalid option");

        bet.options[_option] += msg.value;
        bet.bettors[_option].push(Bettor(msg.sender, msg.value));

        emit BetPlaced(_betId, msg.sender, _option, msg.value);
    }

    function executeBet(uint256 _betId) external onlyAdmin {
        Bet storage bet = bets[_betId];
        require(
            block.timestamp >= bet.executionTime,
            "Bet execution time has not been reached"
        );
        require(
            bet.status == BetStatus.ACTIVE,
            "Bet has already been executed"
        );

        // Oracle Logic comes here

        bet.status = BetStatus.FINISHED;
        distributeRewards(bet, bet.correctAnswer);

        emit BetExecuted(_betId, bet.correctAnswer);
    }

    function adminExecuteBet(
        uint256 _betId,
        string memory _correctAnswer
    ) external onlyAdmin {
        Bet storage bet = bets[_betId];
        require(
            bet.status == BetStatus.ACTIVE,
            "Bet has already been executed"
        );

        bet.correctAnswer = _correctAnswer;
        bet.status = BetStatus.FINISHED;
        distributeRewards(bet, _correctAnswer);

        emit BetAdminExecuted(_betId, _correctAnswer);
    }

    function getOracleAnswer(
        uint256 _betId,
        string memory main_arg,
        bytes[] memory extra_args
    ) external onlyAdmin {
        Bet storage bet = bets[_betId];
        require(
            block.timestamp >= bet.executionTime,
            "Bet execution time has not been reached"
        );
        require(
            bet.status == BetStatus.ACTIVE,
            "Bet has already been executed"
        );

        // Prepare the query to the Oracle
        bytes memory _queryData = abi.encode(main_arg, abi.encode(extra_args));
        bytes32 _queryId = keccak256(_queryData);

        // Retrieve data from the Oracle
        (bytes memory _value, uint256 _timestampRetrieved) = _getDataBefore(
            _queryId,
            bet.executionTime + 1 hours
        );
        require(_timestampRetrieved != 0, "No data retrieved from Oracle");

        // Convert the retrieved Oracle data into a string (or whatever format you need)
        string memory oracleAnswer = abi.decode(_value, (string));

        // Store the Oracle's answer in the bet
        bet.oracleAnswer = oracleAnswer;

        // Emit an event or proceed with additional logic if needed
        emit OracleAnswerRetrieved(_betId, oracleAnswer);
    }

    function distributeRewards(
        Bet storage bet,
        string memory correctAnswer
    ) internal {
        uint256 totalPool = 0;
        for (uint256 i = 0; i < bet.optionKeys.length; i++) {
            totalPool += bet.options[bet.optionKeys[i]];
        }

        uint256 rewardPool = (totalPool * 99) / 100; // 1% fee for the contract/admin
        uint256 correctOptionBets = bet.options[correctAnswer];

        Bettor[] storage correctBettors = bet.bettors[correctAnswer];
        for (uint256 i = 0; i < correctBettors.length; i++) {
            uint256 reward = (rewardPool * correctBettors[i].amount) /
                correctOptionBets;
            payable(correctBettors[i].bettor).transfer(reward);
        }
    }

    function getOptionsWithAmounts(
        uint256 _betId
    ) public view returns (string[] memory, uint256[] memory) {
        Bet storage bet = bets[_betId];
        uint256 optionsCount = bet.optionKeys.length;
        string[] memory options = new string[](optionsCount);
        uint256[] memory amounts = new uint256[](optionsCount);

        for (uint256 i = 0; i < optionsCount; i++) {
            options[i] = bet.optionKeys[i];
            amounts[i] = bet.options[options[i]];
        }

        return (options, amounts);
    }

    function getBetDetails(
        uint256 _betId
    )
        public
        view
        returns (
            string memory title,
            string memory category,
            bool isAIPick,
            string memory picture,
            uint256 executionTime,
            uint256 expirationDate,
            uint256 id,
            BetStatus status,
            string[] memory optionKeys,
            uint256[] memory optionAmounts
        )
    {
        Bet storage bet = bets[_betId];
        (
            string[] memory options,
            uint256[] memory amounts
        ) = getOptionsWithAmounts(_betId);
        return (
            bet.title,
            bet.category,
            bet.isAIPick,
            bet.picture,
            bet.executionTime,
            bet.expirationDate,
            bet.id,
            bet.status,
            options,
            amounts
        );
    }

    function getTotalBetsOfUser(address _user) public view returns (uint256) {
        uint256 userBetCount = 0;
        for (uint256 i = 0; i < betIds.length; i++) {
            uint256 betId = betIds[i];
            Bet storage bet = bets[betId];

            for (uint256 j = 0; j < bet.optionKeys.length; j++) {
                string memory option = bet.optionKeys[j];
                Bettor[] storage bettors = bet.bettors[option];

                for (uint256 k = 0; k < bettors.length; k++) {
                    if (bettors[k].bettor == _user) {
                        userBetCount++;
                    }
                }
            }
        }
        return userBetCount;
    }

    function getAllBetIds() public view returns (uint256[] memory) {
        return betIds;
    }

    struct UserBetPosition {
        uint256 id;
        string image;
        string title;
        uint256 datePurchased;
        uint256 volume;
        string position;
        uint256 amount;
        uint256 potentialPrize;
    }

    function getUserBets(
        address _user
    ) public view returns (UserBetPosition[] memory) {
        uint256 totalUserBets = getTotalBetsOfUser(_user);
        UserBetPosition[] memory userBets = new UserBetPosition[](
            totalUserBets
        );
        uint256 betIndex = 0;

        for (uint256 i = 0; i < betIds.length; i++) {
            uint256 betId = betIds[i];
            Bet storage bet = bets[betId];

            for (uint256 j = 0; j < bet.optionKeys.length; j++) {
                string memory option = bet.optionKeys[j];
                Bettor[] storage bettors = bet.bettors[option];

                for (uint256 k = 0; k < bettors.length; k++) {
                    if (bettors[k].bettor == _user) {
                        userBets[betIndex] = UserBetPosition({
                            id: betId,
                            image: bet.picture,
                            title: bet.title,
                            datePurchased: block.timestamp, // Set to current block timestamp or actual purchase time
                            volume: bettors[k].amount, // Assuming volume is the amount of ETH staked
                            position: option,
                            amount: bettors[k].amount,
                            potentialPrize: calculatePotentialPrize(
                                bet,
                                option,
                                bettors[k].amount
                            ) // Add calculation logic
                        });
                        betIndex++;
                    }
                }
            }
        }

        return userBets;
    }

    function calculatePotentialPrize(
        Bet storage bet,
        string memory option,
        uint256 amount
    ) internal view returns (uint256) {
        uint256 totalPool = 0;
        for (uint256 i = 0; i < bet.optionKeys.length; i++) {
            totalPool += bet.options[bet.optionKeys[i]];
        }

        uint256 rewardPool = (totalPool * 99) / 100; // 1% fee
        uint256 correctOptionBets = bet.options[option];

        if (correctOptionBets == 0) return 0;

        return (rewardPool * amount) / correctOptionBets;
    }
}
