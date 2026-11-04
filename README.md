
<div align="center">
  <img src="https://altkriz.github.io/favicon.ico" alt="KrizDrop Logo" width="72" height="72" />

  # ⚡ KrizDrop
  **Instant, Encrypted Peer-to-Peer File Sharing Directly Between Browsers**

  [![Live Demo](https://img.shields.io/badge/Live_App-altkriz.github.io%2Fkrizdrop-4f46e5?style=for-the-badge&logo=googlechrome&logoColor=white)](https://altkriz.github.io/krizdrop/)
  [![PWA Ready](https://img.shields.io/badge/PWA-Installable-10b981?style=for-the-badge&logo=pwa&logoColor=white)](https://altkriz.github.io/krizdrop/)
  [![WebRTC](https://img.shields.io/badge/WebRTC-DTLS_Encrypted-0ea5e9?style=for-the-badge&logo=webrtc&logoColor=white)](https://github.com/altkriz/krizdrop)
  [![License](https://img.shields.io/badge/License-MIT-slate?style=for-the-badge)](LICENSE)

  <p align="center">
    <b>No accounts · No cloud storage · No middleman servers · Unlimited transfer speed</b>
  </p>

  <h3>
    👉 <a href="https://altkriz.github.io/krizdrop/">Launch KrizDrop Live</a> 👈
  </h3>
</div>

---

## ✨ What is KrizDrop?

**KrizDrop** is a zero-knowledge, serverless peer-to-peer (P2P) file transfer web application built on **WebRTC DataChannels**. 

Unlike traditional file-sharing services where you upload your files to a third-party cloud server and wait for the recipient to download them, KrizDrop creates a **direct, encrypted tunnel between two browsers** (phone-to-PC, phone-to-phone, or PC-to-PC). Files stream directly from the sender's device memory to the receiver's device in real time.

---

## 🚀 Key Features

- 🔒 **End-to-End Encrypted in Transit** — Powered by WebRTC's mandatory DTLS (Datagram Transport Layer Security) encryption.
- ⚡ **Blazing-Fast 16 KB SCTP Streaming** — Uses native WebRTC `bufferedamountlow` backpressure control and 2 MB disk slicing for maximum local/remote throughput without browser memory crashes.
- 📱 **Adaptive UI (Mobile App + Desktop Dashboard)** — Automatically transforms into a native-style bottom-tabbed application on smartphones and a multi-column command center on desktops.
- 📲 **Installable Progressive Web App (PWA)** — Install KrizDrop directly to your Android, iOS, Windows, or macOS home screen for full-screen standalone access.
- 🔆 **Smart Screen Wake-Lock** — Automatically keeps mobile screens awake during active file transfers so your phone never sleeps mid-transfer.
- 📷 **Instant QR & Link Pairing** — Scan the dynamic QR code with your phone camera or share a one-tap pairing link via WhatsApp, Telegram, or AirDrop.
- 🌗 **Adaptive Dark & Light Mode** — Sleek glassmorphic interface with system theme detection and one-click toggle.

---

## 📖 How to Use

1. **Open KrizDrop** on both devices at **[altkriz.github.io/krizdrop](https://altkriz.github.io/krizdrop/)**.
2. **Pair the Devices:**
   - **Option A (QR Code):** Scan the QR code shown on Device 1 using Device 2's camera.
   - **Option B (Share Link):** Tap **Share Link** / **Copy URL** and open it on the other device.
   - **Option C (Peer ID):** Copy your temporary **Peer ID** and paste it into the *Join Another Device* box on the other device.
3. **Select & Send Files:**
   - Drag & drop files (or tap to browse) in the **Transfer Center**.
   - Click **Send Files Now**.
4. **Accept & Download:**
   - The recipient will see an **Incoming File Request** modal showing the file name and size.
   - Tap **Accept** to stream the file directly to your device with live percentage, transfer speed (`MB/s`), and ETA.

---

## 📲 Install as an App (PWA)

KrizDrop works as a standalone native-feel app on mobile and desktop:

- **Android (Chrome / Edge / Brave):** Tap the **Install** button in the top navigation bar, or open the browser menu (`⋮`) → **Install app**.
- **iOS / iPadOS (Safari):** Tap the **Share** button at the bottom of Safari → scroll down and tap **Add to Home Screen**.
- **Desktop (Chrome / Edge):** Click the **Install** button in the header or the install icon in your browser's address bar.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Transport Protocol** | WebRTC `RTCDataChannel` (SCTP over DTLS/UDP) |
| **Signaling & NAT Traversal** | PeerJS (`0.peerjs.com`) + Google STUN (`stun.l.google.com:19302`) |
| **Flow Control** | 16 KB chunk framing + `bufferedamountlow` event-driven backpressure |
| **Frontend & Styling** | Vanilla ES2022 JavaScript, HTML5, Tailwind CSS |
| **PWA & Offline Shell** | Web App Manifest (`manifest.webmanifest`) + Service Worker (`sw.js`) |
| **Device APIs** | Screen Wake Lock API, Web Share API, Clipboard API, Blob/File API |

---

## 💻 Self-Hosting / Local Development

KrizDrop is 100% static and requires zero backend setup.

```bash
# 1. Clone the repository
git clone https://github.com/altkriz/krizdrop.git

# 2. Navigate into the project folder
cd krizdrop

# 3. Serve locally using any static server (e.g., Python or Node)
npx serve .
# or
python3 -m http.server 8080

Then open http://localhost:8080 in two browser tabs or devices on your network.

Repository Structure

krizdrop/
├── index.html             # Complete application UI & WebRTC transfer engine
├── manifest.webmanifest   # PWA configuration & app icons
├── sw.js                  # Service Worker for offline shell caching & installability
├── .nojekyll              # Ensures GitHub Pages serves all static/manifest files cleanly
└── README.md              # Project documentation

🛡️ Privacy & Security

  - No File Storage: Files never touch a central database or cloud bucket.
  - Ephemeral Identity: Your Peer ID is generated randomly per session. Clicking
    New ID or refreshing the page immediately rotates your identity.
  - Explicit Consent: No file data is transmitted until the recipient explicitly
    accepts the incoming file offer.

📄 License

Distributed under the MIT License. Built as a KrizTech experiment by @altkriz.

