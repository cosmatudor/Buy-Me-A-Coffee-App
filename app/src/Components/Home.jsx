import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import styles from "../Home.module.css";

import BuyMeACoffee from '../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json'

const contractAddress = "0x28d3d58DC0EB508Fd4d5b80c25BCeC5809E2797A"

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.BaseContract(contractAddress, BuyMeACoffee.abi, signer);

function Home() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [memos, setMemos] = useState([]);

    // Access the user's accounts
    const connectWallet = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        setCurrentAccount(account);
    }

    //  Handle user accounts and accountsChanged
    const isAccountChanged = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
            .catch((err) => {
                console.log(err);
            });
        console.log("accounts: ", accounts);
        if (accounts.length === 0) {
            console.log("Please connect to MetaMask!");
        } else if (accounts[0] != currentAccount) {
            setCurrentAccount(accounts[0]);
        }
    }

    // Buy A Coffee function
    const buyCoffe = async () => {
        console.log("buying coffee...");

        const txn = await contract.buyACoffee(
            name ? name : "anon",
            message ? message : "Enjoy your coffee!",
            { value: ethers.parseEther("0.01") });
        await txn.wait();

        console.log("mined ", txn.hash);

        // clear the form fields
        setName("");
        setMessage("");
    }

    // Function to fetch all memos stored on-chain
    const getMemos = async () => {
        console.log("Fetching data...");

        const memos = await contract.getMemos();

        console.log("Data fetched!");

        setMemos(memos);
    }

    // handler function for when someone sends us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
        const date = new Date(Number(timestamp)).toLocaleDateString('en-US');
        setMemos((prevState) => [
            ...prevState,
            {
                address: from,
                timestamp: date,
                message: message,
                name: name,
            }
        ]);
        console.log("Memo received!!!!!!!!!!!!!!!!!!!!!!!");
    }


    useEffect(() => {
        // Listen to accountsChanged event
        window.ethereum.on('accountsChanged', isAccountChanged);

        // gets the memos once the site is rendered
        getMemos();

        // Listen to NoteEvent
        contract.on("NoteEvent", onNewMemo);

        return () => {
            contract.off("NoteEvent", onNewMemo);
        }
    }, [])

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <title>Buy Me A Coffee</title>
            </header>

            <main className={styles.main}>
                <h1 className={styles.title}>Buy Tudor A Coffee</h1>

                {currentAccount ? (
                    <div className={styles.form}>
                        <div>
                            <p>Connected with: {currentAccount}</p>
                        </div>
                        <form>

                            <label>Name</label><br />
                            <input type="text" id="name" placeholder="anon" onChange={(e) => {
                                setName(e.target.value);
                            }} />

                            <br /><br />

                            <label>Send Tudor a message</label><br />
                            <textarea
                                rows={3}
                                id="message"
                                placeholder="Enjoy your coffee!"
                                required
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            >
                            </textarea>

                        </form>
                        <br />
                        <button onClick={buyCoffe}>Buy coffee for 0.01 ETH</button>
                    </div>
                ) : (
                    <button onClick={connectWallet}> Connect Wallet </button>
                )}


                {/** The following part is for showing sent tips 
             * They will be displayed only if the wallet is conected
            */}

                {currentAccount && (<h1>Memos received</h1>)}
                {currentAccount && (memos.map((memo, id) => {
                    return (
                        <div key={id} style={{ border: "2px solid", padding: "5px", margin: "5px" }}>
                            <p>"{memo.message}"</p>
                            <p>From: {memo.name} at {memo.timestamp.toString()}</p>
                        </div>
                    )
                }))}
            </main>

            <footer className={styles.footer}>
                <p>Made by Cosma Tudor.</p>
                <a href="https://github.com/cosmatudor"> Check my Github for other projects</a>
            </footer>
        </div>
    )
}

export default Home;