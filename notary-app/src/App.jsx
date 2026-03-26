import { useState } from "react";
import { ethers } from "ethers";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const CONTRACT_ADDRESS = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

const ABI = [
  "function notarize(bytes32 _hash)",
  "function verify(bytes32 _hash) view returns (bool,address,uint256)",
  "function signDocument(bytes32 _hash)",
  "function isApproved(bytes32 _hash) view returns (bool)"
];

export default function App() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");

  // 🔐 Generate SHA-256
  async function generateHash() {
    if (!file) return alert("Upload file first");

    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);
  }

  // 🔌 Connect Wallet
  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }
  async function signHash(hash, signer) {
  const domain = {
    name: "BlockStamp",
    version: "1",
    chainId: 80001,
    verifyingContract: CONTRACT_ADDRESS,
  };

  const types = {
    Notarization: [{ name: "hash", type: "bytes32" }],
  };

  const value = {
    hash: "0x" + hash,
  };

  return await signer.signTypedData(domain, types, value);
}

  // 📝 Notarize
  async function notarize() {
    
  if (!hash) return alert("Generate hash first");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  // ✍️ NEW: sign before sending
  const signature = await signHash(hash, signer);

  console.log("Signature:", signature);

  const tx = await contract.notarize("0x" + hash);
  await tx.wait();

  setStatus(`Notarized ✅\nTx: ${tx.hash}`);

  // 📄 Generate certificate
  generatePDF(hash, tx.hash);


  }
  async function generatePDF(hash, txHash) {
  const doc = new jsPDF();

  doc.text("BlockStamp Certificate", 20, 20);
  doc.text(`Hash: ${hash}`, 20, 40);
  doc.text(`Tx: ${txHash}`, 20, 60);

  const qr = await QRCode.toDataURL(
    `https://mumbai.polygonscan.com/tx/${txHash}`
  );

  doc.addImage(qr, "PNG", 20, 80, 50, 50);

  doc.save("certificate.pdf");
}
async function verifyDoc() {
  if (!hash) return alert("Generate hash first");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  const result = await contract.verify("0x" + hash);

  if (result[0]) {
    setStatus(
      `Valid ✅\nSigner: ${result[1]}\nTime: ${new Date(
        Number(result[2]) * 1000
      ).toLocaleString()}`
    );
  } else {
    setStatus("Not Found ❌");
  }
}

  return (
    <div style={{ padding: 20 }}>
      <h1>🔐 BlockStamp - Decentralized Notary</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={generateHash}>Generate Hash</button>
      <p><b>Hash:</b> {hash}</p>

      <button onClick={connectWallet}>Connect Wallet</button>
      <p><b>Account:</b> {account}</p>

      <button onClick={notarize}>Notarize</button>
      <button onClick={verifyDoc}>Verify</button>

      <h3 style={{ whiteSpace: "pre-line" }}>{status}</h3>
    </div>
  );
}