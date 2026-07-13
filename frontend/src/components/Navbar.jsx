import { useRef, useState } from "react";
import "../styles/Navbar.css";
import API from "../api/api";

function Navbar({ notifications, fetchFiles }) {

  const fileInputRef = useRef();

  const [showNotifications, setShowNotifications] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {

    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    try {

      const formData = new FormData();

      formData.append("file", selectedFile);

      await API.post("/files/upload", formData, {

        headers: {
          "Content-Type": "multipart/form-data",
        },

      });

      fetchFiles();

      alert("File Uploaded Successfully ✅");

    } catch (error) {

      console.log(error);

      alert("Upload Failed ❌");

    }

  };

  return (

    <nav className="navbar">

      <div className="logo">
        ☁️ SHNOOR Cloud Drive
      </div>

      <div className="search-container">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search files..."
          className="search-box"
        />

      </div>

      <div className="navbar-right">

        <button
          className="upload-btn"
          onClick={handleUploadClick}
        >
          ⬆ Upload
        </button>

        <div className="notification-container">

          <span
            className="notification"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
          </span>

          {notifications.length > 0 && (

            <span className="notification-count">

              {notifications.length}

            </span>

          )}

          {showNotifications && (

            <div className="notification-dropdown">

              <h4>Notifications</h4>

              {

                notifications.length === 0 ?

                  <p>No Notifications</p>

                  :

                  notifications.map((notification, index) => (

                    <div
                      className="notification-item"
                      key={index}
                    >

                      {notification.message}

                    </div>

                  ))

              }

            </div>

          )}

        </div>

        <div className="profile">

          👤 Akshita

        </div>

      </div>

      <input

        type="file"

        ref={fileInputRef}

        style={{ display: "none" }}

        onChange={handleFileChange}

      />

    </nav>

  );

}

export default Navbar;