# 📜 Decentralized Notary

A blockchain-based application that allows users to **prove the existence and integrity of documents** without storing the actual files.

---

## 🚀 Overview

This project uses **cryptographic hashing (SHA-256)** and **blockchain technology** to create a tamper-proof record of documents.

Instead of storing documents, the system stores their **unique digital fingerprints (hashes)**, ensuring:
- Privacy
- Security
- Immutability

---

## 🧠 Problem Statement

Traditional notarization systems:
- Are centralized  
- Can be forged or manipulated  
- Require trust in authorities  

---

## ✅ Solution

This project provides a **decentralized notarization system** where:

- Documents are hashed locally  
- Only the hash is stored on blockchain  
- Anyone can verify document integrity  

---

## ⚙️ How It Works

```
Upload File → Generate SHA-256 Hash → Store on Blockchain
                                       ↓
                               Later Verification
                                       ↓
                          Match Hash → Valid / Invalid
```

---

## 🔑 Features

- 🔐 **Tamper Detection** — even 1 character change is detected  
- 📦 **Privacy First** — no document upload, only hash stored  
- 🌐 **Decentralized** — no central authority required  
- ⏱ **Timestamped Proof** — blockchain provides time of notarization  
- 🔍 **Public Verification** — anyone can verify authenticity  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Ethers.js

### Backend
- Solidity Smart Contract

### Blockchain
- Ethereum / Testnet (Sepolia / Polygon)

---

## 📡 API Reference

### 📝 Notarize Document

```solidity
notarize(bytes32 _hash)
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `_hash`   | bytes32  | SHA-256 hash of the document |

---

### 🔍 Verify Document

```solidity
verify(bytes32 _hash)
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `_hash`   | bytes32  | SHA-256 hash of the document |

#### Returns

| Name        | Type      | Description                          |
|------------|----------|--------------------------------------|
| exists     | bool      | Whether document is notarized        |
| signer     | address   | Address of notarizing user           |
| timestamp  | uint256   | Time of notarization (Unix time)     |

---

## 🧪 Usage

### 1. Upload Document
Select any file (PDF, image, text, etc.)

### 2. Generate Hash
The app generates a SHA-256 hash of the file

### 3. Notarize
Store the hash on blockchain using MetaMask

### 4. Verify
Re-upload file and verify authenticity

---

## 🔥 Demo

### Valid Case
- Same file → ✅ Verified  

### Tampered Case
- Modified file → ❌ Not Verified  

---

## ⚠️ Important Notes

- Only document hashes are stored  
- Files are never uploaded or saved  
- Hash must be:
  - 32 bytes  
  - prefixed with `0x`  

---

## 📌 Project Structure

```
notary-dapp/
 ├── frontend/
 │    ├── src/
 │    │    └── App.jsx
 │    └── package.json
 └── smart-contract/
      └── Notary.sol
```

---

## 🧠 Key Concept

> “We don’t store documents — we store their cryptographic fingerprints.”

---

## 🎯 Use Cases

- Legal contracts  
- Property agreements  
- Academic certificates  
- Intellectual property proof  
- Digital signatures  

---

## 🚀 Future Improvements

- IPFS integration for document storage  
- Multi-signature notarization  
- PDF certificate generation  
- User dashboard  

---

## 👨‍💻 Author

- Piyush Gupta  

---

## 📄 License

This project is open-source and available under the MIT License.
