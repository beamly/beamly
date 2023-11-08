"use client";

import { useWallet } from "@txnlab/use-wallet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { WalletConnectButton } from "./buttons/wallet-buttons";

export function ConnectWallet() {
  const { providers, activeAccount } = useWallet();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Connect Wallet">
            {activeAccount ? activeAccount.name : "Connect"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[150px]">
              {providers?.map((provider) => (
                <li key={provider.metadata.id}>
                  <WalletConnectButton provider={provider} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
