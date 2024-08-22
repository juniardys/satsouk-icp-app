import { BellSimple, FireSimple, GearSix, HandCoins, Seal, User } from "@phosphor-icons/react/dist/ssr";

const SidebarMenu: React.FC = () => {
  return (
    <div className="flex flex-col bg-zinc-950 rounded-[24px] gap-3 p-3">
      <div className="flex gap-4 p-3 cursor-pointer hover:bg-zinc-800 hover:rounded-2xl">
        <FireSimple weight="bold" size={24} />
        <p className="text-base">Leaderboards</p>
      </div>
      <div className="flex gap-4 p-3 cursor-pointer hover:bg-zinc-800 hover:rounded-2xl">
        <BellSimple weight="bold" size={24} />
        <p className="text-base">Notification</p>
      </div>
      <div className="flex gap-4 p-3 cursor-pointer hover:bg-zinc-800 hover:rounded-2xl">
        <Seal weight="bold" size={24} />
        <p className="text-base">Achievements</p>
      </div>
      <div className="flex gap-4 p-3 cursor-pointer hover:bg-zinc-800 hover:rounded-2xl">
        <HandCoins weight="bold" size={24} />
        <p className="text-base">Your active positions</p>
      </div>
      <div className="flex gap-4 p-3 cursor-pointer hover:bg-zinc-800 hover:rounded-2xl">
        <User weight="bold" size={24} />
        <p className="text-base">Profile</p>
      </div>
      <div className="flex gap-4 p-3 cursor-pointer hover:bg-zinc-800 hover:rounded-2xl">
        <GearSix weight="bold" size={24} />
        <p className="text-base">Settings</p>
      </div>
    </div>
  )
}

export default SidebarMenu;