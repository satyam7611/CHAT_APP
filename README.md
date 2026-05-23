Real-Time Chat Application | MERN + Socket.io
A fully functional real-time chat application inspired by WhatsApp Application, built using the MERN stack (MongoDB, Express, React, Node.js). The app enables instant messaging, File sharing, online status tracking, and Secure authentication using JWT and Socket.io.

🚀 Feature
⚡ Real-Time Messaging Using Socket.io (Bi-directional Communication)
🟢 Live Online/Offline Status updates instantly
📎 File Sharing Support using the multer (Images, PDFs, Videos )
🖼️ Image Preview Lightbox (fullscreen view + download option)
🗑️ Delete for Everyone (real-time Message Removal)
🔔 Unread Message Notifications
🔍 Search Contacts (Instant filtering using Zustand)
🕒 Smart Timestamps & Date Separators
🔐 JWT Authentication (Stored in HTTP-only cookie)
🔔 Toast Notifications (Using React-hot-toast)
🧠 How It Work
User logs in → JWT stored securely in cookies
Socket connection is established
Messages are sent via Socket.io
Messages are stored in MongoDB
Receiver gets messages instantly without refresh
🛠️ Tech Stack
Frontend
React (Vite)
Zustand (State Management)
TailwindCSS + daisyUI
Socket.io-client
React Hook Form
Lucide React (for icons)
Backend
Node.js + Express
MongoDB + Mongoose
Socket.io
Multer (File Uploads)
JWT Authentication
📁 Project Structure
CHAT_APP/ ├── Backend/ ├── Frontend/ └── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone <your-repo-link>
cd CHAT_APP
2. Setup Backend
cd Backend
npm install
Create a .env File in Backend:

PORT=3000
MONGO_URI=your_mongodb_connection
JWT_KEY=your_secret_key
Run backend:

npm run dev
3. Setup Frontend
cd ../Frontend
npm install
npm run dev
4. Open App
http://localhost:5173
🌐 Future Improvements (Optional)
Typing indicators
Group chat support
Message reactions
Push notifications
📄 License
This project is open-source and available for learning and customization.

🙌 Author
Satyam Singh
