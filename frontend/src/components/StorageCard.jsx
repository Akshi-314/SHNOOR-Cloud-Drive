import "../styles/StorageCard.css";

function StorageCard() {
  return (
    <div className="storage-card">
      <h3>Storage</h3>

      <div className="storage-info">
        <span>8 GB Used</span>
        <span>15 GB Total</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <p>55% Storage Used</p>
    </div>
  );
}

export default StorageCard;