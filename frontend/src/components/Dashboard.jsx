import FileCard from "./FileCard";
import StorageCard from "./StorageCard";
import "../styles/Dashboard.css";

function Dashboard({ files, setFiles }) {

  return (
    <main className="dashboard">

      <div className="dashboard-header">

        <div>
          <h2>My Drive</h2>
          <p>Welcome back, Akshita 👋</p>
        </div>

        <button className="new-folder-btn">
          + New Folder
        </button>

      </div>

      <div className="dashboard-subtitle">
        <h3>Recent Files</h3>
      </div>

      <div className="file-grid">

        {files.length === 0 ? (

          <p>No files uploaded.</p>

        ) : (

          files.map((file) => (

            <FileCard
              key={file._id}
              id={file._id}
              icon="📄"
              name={file.fileName}
              size="Uploaded File"
              onDelete={(id) => {
                setFiles(files.filter((file) => file._id !== id));
              }}
            />

          ))

        )}

      </div>

      <StorageCard />

    </main>
  );
}

export default Dashboard;