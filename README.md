# Authorization Governed Vault – Smart Contract Deployment

This project demonstrates the deployment of an **Authorization-Governed Secure Vault** using **Hardhat**, **Docker**, and a **local Hardhat blockchain**.

The setup uses Docker containers to:
- Run a Hardhat local blockchain node
- Compile and deploy smart contracts automatically

---

## 📦 Smart Contracts

### 1️⃣ AuthorizationManager
- Manages authorized addresses
- Ensures only approved users can access protected actions

### 2️⃣ SecureVault
- A vault contract protected by AuthorizationManager
- Only authorized accounts can interact with sensitive functions

---

## 🛠 Tech Stack

- Solidity `0.8.20`
- Hardhat
- Docker & Docker Compose
- Node.js
- Local Hardhat Network (JSON-RPC)

---

## 🚀 Deployment Flow

1. Docker starts a local Hardhat blockchain
2. Contracts are compiled inside the deployer container
3. `AuthorizationManager` is deployed first
4. `SecureVault` is deployed using the AuthorizationManager address

---

## 📸 Deployment Proof (Assignment Requirement)

### ✅ 1. Successful Contract Deployment
Shows:
- AuthorizationManager deployed address
- SecureVault deployed address
- Deployment completed successfully

![Deployment](docs/1_successful_contract_deployment.png)

---

### ✅ 2. Docker Containers Running
Shows:
- blockchain container
- deployer container

![Docker Containers](docs/2_docker_containers_authorization_governed_vault.png)

---

### ✅ 3. Hardhat Node Running
Shows:
- Hardhat JSON-RPC server running on `http://0.0.0.0:8545`
- Generated test accounts

![Hardhat Node](docs/3_hardhat_node_running.png)

---

## ▶️ How to Run the Project

```bash
docker-compose up --build

```bash
docker-compose down

