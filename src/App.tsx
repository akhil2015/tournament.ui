import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ActiveTable from "./components/Table/ActiveTable";
import PastTable from "./components/Table/PastTable";
import { fetchActiveTournaments } from "./contracts/tournament";
import { useWeb3React } from "@web3-react/core";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const [liveTournaments, setLiveTournaments] = React.useState<any>([]);
  const [pastTournaments, setPastTournaments] = React.useState<any>([]);
  const [availableTournaments, setAvailableTournaments] = React.useState<any>(
    []
  );

  const getData = async () => {
    const provider = await detectEthereumProvider();
    const { lobby, active, past } = await fetchActiveTournaments(provider);
    setLiveTournaments(active);
    setAvailableTournaments(lobby);
    setPastTournaments(past);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div>
        <p className="text-3xl">Available Tournaments</p>
        <ActiveTable data={availableTournaments} getData={getData}/>
      </div>
      <div>
        <p className="text-3xl">Live Tournaments</p>
        <PastTable data={liveTournaments}/>
      </div>
      <div>
        <p className="text-3xl">Past Tournaments</p>
        <PastTable data={pastTournaments}/>
      </div>
    </div>
  );
}

export default App;
