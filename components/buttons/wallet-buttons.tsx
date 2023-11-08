import { Provider } from "@txnlab/use-wallet";

import { Button } from "@/components/ui/button";

interface WalletConnectProps {
  className?: string;
  provider: Provider;
}

export function WalletConnectButton({
  className,
  provider,
}: WalletConnectProps) {
  return (
    <Button
      id={provider.metadata.id}
      className="w-full"
      variant={provider.isConnected ? "outline" : "default"}
      onClick={provider.connect}
      aria-label={`Connect ${provider.metadata.name} Wallet`}
    >
      {provider.metadata.name}
    </Button>
  );
}
