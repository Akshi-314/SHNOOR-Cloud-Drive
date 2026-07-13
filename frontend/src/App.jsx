import { useEffect, useState } from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import socket from "./socket/socket";
import API from "./api/api";

function App() {

  // Files State
  const [files, setFiles] = useState([]);

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  // Function to fetch files
  const fetchFiles = async () => {

    try {

      const response = await API.get("/files");

      setFiles(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Load files when app starts
  useEffect(() => {

    fetchFiles();

  }, []);

  // Listen for Socket Notifications
  useEffect(() => {

    socket.on("notification", (data) => {

      setNotifications((prev) => [data, ...prev]);

      // Refresh dashboard automatically
      fetchFiles();

    });

    return () => {

      socket.off("notification");

    };

  }, []);

  return (
   <>
  <Navbar
  notifications={notifications}
  fetchFiles={fetchFiles}
/>

  <div className="container">
    <Sidebar />

    <Dashboard
      files={files}
      setFiles={setFiles}
    />
  </div>
</>
  );
}

export default App;
   