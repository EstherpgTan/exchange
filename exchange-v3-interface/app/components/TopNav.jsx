"use client"

import { useState, useEffect } from "react"
import { useSDK } from "@metamask/sdk-react"
import { ethers } from "ethers"

// Import hooks
import { useProvider } from "@/app/hooks/useProvider"

function TopNav() {

    const { sdk } = useSDK()
    const { provider, chainId } = useProvider()

    const [account, setAccount] = useState("")
    const [balance, setBalance] = useState("")

    async function connectHandler() {
        if (!sdk || !provider) return
        //     try {
        //         await sdk.connectAndSign({ msg: "Sign in to BTC Exchange" })
        //         await getAccountInfo()
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // 1️⃣ Connect wallet (user-initiated)
        await sdk.connect()

        const ethereum = sdk.getProvider()

        // 2️⃣ Force switch to Hardhat (31337)
        try {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x7a69" }], // 31337
            })
        } catch (err) {
            // If Hardhat is not added, add it
            if (err.code === 4902) {
                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: "0x7a69",
                            chainName: "Hardhat",
                            nativeCurrency: {
                                name: "ETH",
                                symbol: "ETH",
                                decimals: 18,
                            },
                            rpcUrls: ["http://127.0.0.1:8545"],
                        },
                    ],
                })
            } else {
                throw err
            }
        }

        // async function getAccountInfo() {
        // Get the currently connected account & balance
        // const account = await provider.getSigner()
        // const balance = await provider.getBalance(account)

        // 3️⃣ Fetch account + balance
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const bal = await provider.getBalance(address)

        // Store the values in the state
        // setAccount(account.address)
        // setBalance(balance)
        setAccount(address)
        setBalance(ethers.formatEther(bal))
    }

    // Refresh balance if network changes
    useEffect(() => {
        // Connect to Blockchain here...
        if (!provider || !account) return
        connectHandler()
    }, [chainId])

    return (
        <nav className="topnav">
            <button onClick={connectHandler}>Connect Wallet</button>
            <p>My Account: {account}</p>
            <p>My Balance: {balance}</p>
        </nav >
    )
}

export default TopNav