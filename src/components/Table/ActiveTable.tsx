import React from "react";
import { joinTournament } from "../../contracts/tournament";
import detectEthereumProvider from "@metamask/detect-provider";
import { useWeb3React } from "@web3-react/core";

type Props = {
  data: any;
  getData: any;
};

const ActiveTable = ({ data,getData }: Props) => {
  const { account } = useWeb3React()
  const handleJoin =async (id:any) => {
    const provider = detectEthereumProvider()
    await joinTournament(provider,id,account)
    await getData()
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-[50%] mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th>TournamentId</th>
            <th>Players</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                {item?.roster.length}/{item.maxPlayers}
              </td>
              <td>
                <button className="btn" onClick={()=>handleJoin(item.id)}>Join</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveTable;
