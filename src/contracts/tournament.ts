import Web3 from 'web3';
import { TOURNAMENT_ABI } from '../abis/Tournament';
import { TOURNAMENT_CONTRACT } from '../constants';
export const fetchActiveTournaments = async (provider:any) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(TOURNAMENT_ABI,TOURNAMENT_CONTRACT)
  const tournamentCounter = await contract.methods.tournamentCounter.call().call()
  const active = []
  const lobby = []
  const past = []
  for (let i = 0; i < tournamentCounter; i++) {
    const isActive = await contract.methods.isActive(i).call()
    const roster = await contract.methods.getRoster(i).call()
    const maxPlayers = await contract.methods.maxPlayers(i).call()
    if(isActive==1){
      lobby.push({
        id: i,
        roster,
        maxPlayers
      })
    }
    if(isActive==2){
      active.push({
        id: i,
        roster,
        maxPlayers
      })
    }
    if(isActive==3){
      past.push({
        id: i,
        roster,
        maxPlayers
      })
    }
  }
  console.log({active,lobby,past})
  return {active,lobby,past}
}

export const joinTournament = async (provider:any, tournamentId:number,from:any) => {
  //ignore ts lint
  // @ts-ignore
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(TOURNAMENT_ABI,TOURNAMENT_CONTRACT)
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  const tx = await contract.methods.joinTournament(tournamentId).send({from})
  return tx
}

