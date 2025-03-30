import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3StackOverflowABI from "../contract/BlockOverflow.json";
import { toast } from "react-toastify";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Web3StackOverflowABI,
        signer
      );

      const accountAddress = await signer.getAddress();
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAccount(accountAddress);
      setLoading(false);

      // Fetch balance after connecting
      fetchBalance(provider, accountAddress);
      localStorage.setItem("walletAddress", account);
      localStorage.setItem("walletBalance", balance.toString());

      toast.success("Wallet connected!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Wallet connection failed");
    }
    setLoading(false);
  };

  const fetchBalance = async (
    providerInstance = provider,
    userAccount = account
  ) => {
    if (!providerInstance || !userAccount) return;

    try {
      const balance = await providerInstance.getBalance(userAccount);
      setBalance(ethers.formatEther(balance)); // Convert from Wei to Ether
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(0);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletBalance");
    toast.success("Wallet disconnected");
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedBalance = localStorage.getItem("walletBalance");

    if (storedAddress) {
      setAccount(storedAddress);
      setBalance(storedBalance ? parseFloat(storedBalance) : 0);
    }
  }, []);

  // Fetch balance whenever the account changes
  useEffect(() => {
    if (account) fetchBalance();
  }, [account]);

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        signer,
        contract,
        connectWallet,
        balance,
        disconnectWallet,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
