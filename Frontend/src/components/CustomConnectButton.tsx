import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="px-4 py-2 text-white font-medium register bg-transparent rounded-lg"
                    style={{
                      border: "2px solid",
                      borderImage:
                        "linear-gradient(to right, #f705fb, #7057f6) 1",
                    }}
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="px-4 py-2 text-white font-medium register bg-transparent rounded-lg"
                    style={{
                      border: "2px solid",
                      borderImage:
                        "linear-gradient(to right, #f705fb, #7057f6) 1",
                    }}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="px-4 py-2 text-white font-medium register bg-transparent rounded-lg"
                  style={{
                    border: "2px solid",
                    borderImage:
                      "linear-gradient(to right, #f705fb, #7057f6) 1",
                  }}
                >
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
