<p align="center">
  <img src="projects/CivicChain-frontend/public/Algocc_logo.png" alt="CivicChain Logo" width="600" />
</p>

# CivicChain — On-Chain Citizen Budget Participation Platform

---

## 🎯 Problem Statement
Local governments manage public funds but often lack transparency and citizen involvement in budgeting and spending decisions. This limited openness causes mistrust, inefficient resource allocation, and increased risk of misuse. The absence of participatory and accountable budget processes weakens public confidence and government accountability. CivicChain addresses these challenges by enabling transparent, on-chain citizen participation using blockchain technology.


---

## 💡 Solution

CivicChain empowers citizens to actively participate in local budget decisions by distributing voting tokens (Algorand Standard Assets - ASAs) based on their residency or tax contributions. Using a decentralized autonomous organization (DAO) on the Algorand blockchain, citizens can securely vote on municipal budget proposals. Smart contracts automatically release funds only when proposals achieve the required quorum, ensuring transparent, accountable, and democratic management of public resources.

---

## 🤝 User Value
- Direct citizen participation in local governance
- Transparent, verifiable budget usage
- Increased public accountability for government spending

---

## 🔗 Algorand Ecosystem Value
- Real-world DAO application showcasing Algorand’s strengths
- Uses ASAs for voting tokens and PyTeal smart contracts for fund disbursement logic
- Demonstrates scalable, low-cost blockchain governance for the public sector

---

## 🚀 Purpose & Vision
Create a trustless, transparent budgeting platform that bridges governments and citizens, promoting democratic governance and responsible public spending.

---

## 🛠️ Tech Stack
| Layer            | Technologies / Tools                         |
|------------------|---------------------------------------------|
| Smart Contracts   | PyTeal (via AlgoKit)                         |
| Tokenization     | Algorand Standard Assets (ASA)               |
| Voting Logic     | Beaker Framework + Algorand Stateful Contracts|
| Wallet Integration| Pera Wallet + WalletConnect (React)          |
| Frontend         | React, Tailwind CSS, Algorand SDK             |
| Storage (Optional)| IPFS (for proposals and documents)           |

---

## ⚙️ Using AlgoKit
This project leverages AlgoKit to simplify Algorand smart contract development, testing, and deployment, speeding up the MVP development and enhancing scalability.

---

## 📦 Features (MVP)
| Feature              | Purpose                                    |
|----------------------|--------------------------------------------|
| Proposal Creation    | Admins submit municipal budget proposals  |
| Token Distribution  | Voting tokens assigned to verified citizens|
| On-Chain Voting     | DAO-based voting with quorum verification  |
| Fund Release Logic  | Smart contract automates fund disbursement |
| Public Dashboard    | Real-time visibility of proposals and results |

---

## 🧭 MVP Workflow
1. Admin Council creates a budget proposal (e.g., ₹5L for road repairs)
2. Citizens receive voting tokens (ASAs)
3. Citizens cast votes on proposals via the DAO
4. If quorum is met, smart contract releases funds to the project
5. Dashboard updates public records transparently

---

## 🚀 Installation & Setup (with AlgoKit)

### Prerequisites
- Python 3.10+, Node.js 16+, Docker
- [AlgoKit CLI](https://github.com/algorandfoundation/algokit-cli)

### Steps

###  1. Install AlgoKit

###  2. Clone the repo
`git clone https://github.com/your-org/civicchain.git`

`cd civicchain`

###  3. Install dependencies
`npm install `                         # For frontend 

###  4. Start localnet and deploy
`algokit localnet start`

`algokit deploy`

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo and submit pull requests for bug fixes, features, or improvements.

---


## 📞 Contact
For questions, collaboration, or support:  
**Mulinti Rohith Naidu**

Email: mulintirohan159@gmail.com 


---

> _“CivicChain — Empowering citizens with transparent governance on Algorand.”_

