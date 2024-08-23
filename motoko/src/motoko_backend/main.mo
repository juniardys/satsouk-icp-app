import Array "mo:base/Array";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Trie "mo:base/Trie";

actor BettingContract {

    type BetStatus = {
        #ACTIVE;
        #FINISHED;
        #CANCELED;
    };

    type Bettor = {
        bettor: Principal;
        amount: Nat;
    };

    type Bet = {
        title: Text;
        category: Text;
        isAIPick: Bool;
        picture: Text;
        executionTime: Time.Time;
        expirationDate: Time.Time;
        id: Nat;
        status: BetStatus;
        options: Trie.Trie<Text, Nat>;
        optionKeys: Array<Text>;
        bettors: Trie.Trie<Text, Array<Bettor>>;
        correctAnswer: Text;
        oracleAnswer: Text;
    };

    type UserBet = {
        betId: Nat;
        optionChosen: Text;
        amount: Nat;
    };

    let admins: Trie.Trie<Principal, Bool> = Trie.empty();
    let betCounter: Nat = 0;
    var betIds: Array<Nat> = Array.empty();
    var bets: Trie.Trie<Nat, Bet> = Trie.empty();

    public func addAdmin(newAdmin: Principal) : async () {
        if (not Trie.contains(admins, newAdmin)) {
            admins := Trie.put(admins, newAdmin, true);
        }
    };

    public func removeAdmin(admin: Principal) : async () {
        if (Trie.contains(admins, admin) and admin != Principal.self) {
            admins := Trie.remove(admins, admin);
        }
    };

    public func registerBet(
        title: Text,
        category: Text,
        isAIPick: Bool,
        picture: Text,
        executionTime: Time.Time,
        expirationDate: Time.Time,
        options: Array<Text>
    ) : async Nat {
        betCounter := betCounter + 1;
        let newBet: Bet = {
            title = title;
            category = category;
            isAIPick = isAIPick;
            picture = picture;
            executionTime = executionTime;
            expirationDate = expirationDate;
            id = betCounter;
            status = #ACTIVE;
            options = Trie.empty<Text, Nat>();
            optionKeys = options;
            bettors = Trie.empty<Text, Array<Bettor>>();
            correctAnswer = "";
            oracleAnswer = "";
        };

        bets := Trie.put(bets, betCounter, newBet);
        betIds := Array.append(betIds, [betCounter]);

        return betCounter;
    };

    public func placeBet(betId: Nat, option: Text, amount: Nat) : async () {
        let betOption = Trie.get(bets, betId);
        if (betOption != null) {
            let bet = betOption;
            if (Time.now() < bet.executionTime) {
                if (not Array.contains(bet.optionKeys, option)) {
                    Debug.print("Invalid option");
                    return;
                };
                
                let currentAmount = Trie.get(bet.options, option);
                let updatedOptions = Trie.put(bet.options, option, currentAmount + amount);

                let existingBettors = Trie.get(bet.bettors, option);
                let updatedBettors = Array.append(existingBettors, [Bettor {bettor = Principal.self; amount = amount}]);

                let updatedBet = {
                    bet with
                        options = updatedOptions;
                        bettors = Trie.put(bet.bettors, option, updatedBettors);
                };
                bets := Trie.put(bets, betId, updatedBet);
                Debug.print("Bet placed successfully");
            } else {
                Debug.print("Betting period has expired");
            }
        } else {
            Debug.print("Bet does not exist");
        }
    };

    public func executeBet(betId: Nat) : async () {
        let betOption = Trie.get(bets, betId);
        if (betOption != null) {
            let bet = betOption;
            if (Time.now() >= bet.executionTime and bet.status == #ACTIVE) {
                let updatedBet = {
                    bet with
                        status = #FINISHED;
                        correctAnswer = "ExampleAnswer";
                };
                bets := Trie.put(bets, betId, updatedBet);
                distributeRewards(updatedBet, updatedBet.correctAnswer);
            } else {
                Debug.print("Bet cannot be executed");
            }
        } else {
            Debug.print("Bet does not exist");
        }
    };

    public func adminExecuteBet(betId: Nat, correctAnswer: Text) : async () {
        let betOption = Trie.get(bets, betId);
        if (betOption != null) {
            let bet = betOption;
            if (bet.status == #ACTIVE) {
                let updatedBet = {
                    bet with
                        status = #FINISHED;
                        correctAnswer = correctAnswer;
                };
                bets := Trie.put(bets, betId, updatedBet);
                distributeRewards(updatedBet, correctAnswer);
            } else {
                Debug.print("Bet cannot be executed");
            }
        } else {
            Debug.print("Bet does not exist");
        }
    };

    public func getOracleAnswer(
        betId: Nat,
        mainArg: Text,
        extraArgs: Array<Blob>
    ) : async () {
        let betOption = Trie.get(bets, betId);
        if (betOption != null) {
            let bet = betOption;
            if (Time.now() < bet.executionTime) {
                Debug.print("Bet execution time has not been reached");
                return;
            };
            if (bet.status != #ACTIVE) {
                Debug.print("Bet has already been executed");
                return;
            };

            let queryData = encode((mainArg, encode(extraArgs)));
            let queryId = Sha256.hash(queryData);

            let (value, timestampRetrieved) = getDataBefore(queryId, bet.executionTime + 1_000_000_000_000);
            if (timestampRetrieved == 0) {
                Debug.print("No data retrieved from Oracle");
                return;
            };

            let oracleAnswer = decode<String>(value);
            let updatedBet = {
                bet with
                    oracleAnswer = oracleAnswer;
            };
            bets := Trie.put(bets, betId, updatedBet);
        } else {
            Debug.print("Bet does not exist");
        }
    };

    public func distributeRewards(bet: Bet, correctAnswer: Text) : async () {
        var totalPool = 0;
        for (i in Iter.range(0, Array.size(bet.optionKeys))) {
            totalPool += Trie.get(bet.options, bet.optionKeys[i]);
        };

        let rewardPool = (totalPool * 99) / 100; // 1% fee for the contract/admin
        let correctOptionBets = Trie.get(bet.options, correctAnswer);

        let correctBettors = Trie.get(bet.bettors, correctAnswer);
        for (i in Iter.range(0, Array.size(correctBettors))) {
            let reward = (rewardPool * correctBettors[i].amount) / correctOptionBets;
            let _ = transferToBettor(correctBettors[i].bettor, reward);
        }
    };

    public func transferToBettor(bettor: Principal, amount: Nat) : async () {
        let _ = ICPTs.transfer(bettor, amount);
    };

    public func getOptionsWithAmounts(betId: Nat) : async (Array<Text>, Array<Nat>) {
        let betOption = Trie.get(bets, betId);
        if (betOption != null) {
            let bet = betOption;
            let optionsCount = Array.size(bet.optionKeys);
            var options = Array.create<Text>(optionsCount, "");
            var amounts = Array.create<Nat>(optionsCount, 0);

            for (i in Iter.range(0, optionsCount)) {
                let optionKey = bet.optionKeys[i];
                options[i] := optionKey;
                var amount = Trie.get(bet.options, optionKey);
                amounts[i] := amount;
            };

            return (options, amounts);
        } else {
            return (Array.empty<Text>(), Array.empty<Nat>());
        }
    };

    public func getBetDetails(betId: Nat) : async (Text, Text, Bool, Text, Time.Time, Time.Time, Nat, BetStatus, Array<Text>, Array<Nat>) {
        let betOption = Trie.get(bets, betId);
        if (betOption != null) {
            let bet = betOption;
            let (options, amounts) = await getOptionsWithAmounts(betId);
            return (bet.title, bet.category, bet.isAIPick, bet.picture, bet.executionTime, bet.expirationDate, bet.id, bet.status, options, amounts);
        } else {
            return ("", "", false, "", Time.now(), Time.now(), 0, #ACTIVE, Array.empty<Text>(), Array.empty<Nat>());
        }
    };

    public func getTotalBetsOfUser(user: Principal) : async Nat {
        var userBetCount = 0;
        for (i in Iter.range(0, Array.size(betIds))) {
            let betId = betIds[i];
            let betOption = Trie.get(bets, betId);
            if (betOption != null) {
                let bet = betOption;
                for (j in Iter.range(0, Array.size(bet.optionKeys))) {
                    let option = bet.optionKeys[j];
                    let bettors = Trie.get(bet.bettors, option);

                    for (k in Iter.range(0, Array.size(bettors))) {
                        if (bettors[k].bettor == user) {
                            userBetCount += 1;
                        }
                    }
                }
            }
        };
        return userBetCount;
    };

    public func getAllBetIds() : async Array<Nat> {
        return betIds;
    };

    public func getUserBets(user: Principal) : async Array<UserBet> {
        let totalUserBets = await getTotalBetsOfUser(user);
        var userBets = Array.create<UserBet>(totalUserBets, UserBet { betId = 0; optionChosen = ""; amount = 0 });
        var betIndex = 0;

        for (i in Iter.range(0, Array.size(betIds))) {
            let betId = betIds[i];
            let betOption = Trie.get(bets, betId);
            if (betOption != null) {
                let bet = betOption;
                for (j in Iter.range(0, Array.size(bet.optionKeys))) {
                    let option = bet.optionKeys[j];
                    let bettors = Trie.get(bet.bettors, option);

                    for (k in Iter.range(0, Array.size(bettors))) {
                        if (bettors[k].bettor == user) {
                            userBets[betIndex] := UserBet {
                                betId = betId;
                                optionChosen = option;
                                amount = bettors[k].amount;
                            };
                            betIndex += 1;
                        }
                    }
                }
            }
        };

        return userBets;
    };
};
