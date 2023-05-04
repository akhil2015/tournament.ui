import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/connector";
import { toast } from "react-toastify";

type Props = {};

function LargeNavbar(props: Props) {
  const { account, activate, deactivate, active } = useWeb3React();
  const notify = () =>
    toast.success("Wallet Connected", {
      toastId: "toast-message",
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const handleMetamask = async () => {
    await connectWallet(injected);
    notify();
  };
  async function connectWallet(provider:any) {
    try {
      await activate(provider);
      console.log(active);
    } catch (ex) {
      console.log(ex);
    }
  }
  async function disconnectWallet() {
    try {
      deactivate();
      console.log(active);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">Tournament Mania</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/add">Add Tournament</a>
          </li>

          <li>
            <a onClick={handleMetamask}>{!active?'Connect Wallet':account?.slice(0,6)+'...'}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LargeNavbar;
