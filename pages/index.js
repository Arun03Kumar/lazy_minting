import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react'
import Mint from '../components/Mint';


export default function Home() {
    const [isConnected, setisConnected] = useState(false);
      const [signer, setsigner] = useState(undefined);
      const [walletAddress, setwalletAddress] = useState("");
    const checkIfWalletIsConnected = async () => {
      if(!window.ethereum){
          return toast.error("Metamask is not installed")
      }
      const accounts = await window.ethereum.request({method: "eth_accounts"})
      if(accounts.length) {
          setwalletAddress(accounts[0])
          setisConnected(true)
      }else{
          setisConnected(false)
          toast.warn("Please connect your wallet")
      }
  }

  useEffect(() => {
      checkIfWalletIsConnected()
      // interact()
      connectWallet()
  }, [])

  const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
        setwalletAddress(accounts[0])
        setisConnected(true)
      } else {
        setisConnected(false);
      }
  }
  return (
    <div className={styles.container}>
     <Mint address={walletAddress}/>
    </div>
  )
}
