// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import React, { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import AppCalls from './components/AppCalls'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }

 return (
    <div className="hero min-h-screen bg-gradient-to-br from-green-300 to-teal-500">
      <div className="hero-content text-center rounded-lg p-6 max-w-3xl bg-white shadow-xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            CivicChain <span className="text-teal-600">— On-Chain Budget Participation</span>
          </h1>
          <p className="py-4 text-gray-600">
            Participate in local governance with transparent voting on budget proposals via Algorand blockchain.
          </p>

          <div className="mb-6">
            <button
              data-test-id="connect-wallet"
              className="btn btn-accent"
              onClick={toggleWalletModal}
            >
              {activeAddress ? `Connected: ${activeAddress.slice(0, 6)}...` : 'Connect Wallet'}
            </button>
          </div>

          {activeAddress ? (
            <div>
              <ProposalSection />
              <div className="divider"></div>
              <AdminPanel />
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please connect your wallet to view and vote on proposals.</p>
          )}

          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        </div>
      </div>
    </div>
  )
}

export default Home
