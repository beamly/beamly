import { ConnectWallet } from "@/components/connect-wallet";
import { MainLogo } from "@/components/main-logo";
import { ModeToggle } from "@/components/toggle-mode";

export function Header() {
  return (
    <div className="border-b h-16 flex justify-between items-center">
      <div className="hidden sm:flex flex items-center px-4">
        <MainLogo />
      </div>
      <div className="flex items-start pr-4 ml-auto">
        <ConnectWallet />
        <ModeToggle />
      </div>
    </div>
  );
}
