import "../styles/FileCard.css";
import API from "../api/api";

function FileCard({ icon, name, size, id, onDelete }) {

  const deleteFile = async () => {

    try {
      await API.delete(`/files/${id}`);

      onDelete(id);

      alert("File Deleted Successfully ✅");
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <div className="file-card">

      <div className="file-icon">
        {icon}
      </div>

      <h4>{name}</h4>

      <p>{size}</p>

      <button onClick={deleteFile}>
        Delete
      </button>

    </div>
  );
}

export default FileCard;
