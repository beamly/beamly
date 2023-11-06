"use client";

import {
  PROVIDER_ID,
  useInitializeProviders,
  WalletProvider as TxnLabWalletProvider,
} from "@txnlab/use-wallet";

const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import("@perawallet/connect"))
    .PeraWalletConnect;
  return PeraWalletConnect;
};

const getDynamicDeflyWalletConnect = async () => {
  const DeflyWalletConnect = (await import("@blockshake/defly-connect"))
    .DeflyWalletConnect;
  return DeflyWalletConnect;
};

const getDynamicDaffiWalletConnect = async () => {
  const DaffiWalletConnect = (await import("@daffiwallet/connect"))
    .DaffiWalletConnect;
  return DaffiWalletConnect;
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, getDynamicClient: getDynamicDeflyWalletConnect },
      { id: PROVIDER_ID.DAFFI, getDynamicClient: getDynamicDaffiWalletConnect },
    ],
  });

  return (
    <TxnLabWalletProvider value={providers}>{children}</TxnLabWalletProvider>
  );
}
