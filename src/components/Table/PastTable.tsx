import React from "react";

type Props = {
  data: any;
};

const PastTable = ({ data }: Props) => {
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
              <td><label htmlFor="my-modal" className="btn">Scores</label></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastTable;
