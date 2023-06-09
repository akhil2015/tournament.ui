import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector"

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 80001],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
  bridge: "https://bridge.walletconnect.org",
  supportedChainIds: [1],
});

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1],
	appName: "web3-react example"
  });