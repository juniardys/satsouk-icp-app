const UserStatisticsCard: React.FC = () => {
  return (
    <div className="flex flex-col bg-zinc-950 rounded-[24px] gap-4 p-6">
      <p className="text-base font-medium">Your stats</p>
      <div className="flex gap-4">
        <div className="flex items-center w-full bg-zinc-900 rounded-xl p-3">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs text-zinc-400">Positive value</p>
            <p className="text-sm font-medium">$239,642.51</p>
          </div>
        </div>
        <div className="flex items-center w-full bg-zinc-900 rounded-xl p-3">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs text-zinc-400">Profit/loss</p>
            <p className="text-sm font-medium">$159,092.43</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center w-full bg-zinc-900 rounded-xl p-3">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs text-zinc-400">Volume traded</p>
            <p className="text-sm font-medium">$5,116,322.05</p>
          </div>
        </div>
        <div className="flex items-center w-full bg-zinc-900 rounded-xl p-3">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs text-zinc-400">Markets traded</p>
            <p className="text-sm font-medium">57</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserStatisticsCard;