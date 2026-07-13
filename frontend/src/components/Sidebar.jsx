import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        ☁️ Drive
      </div>

      <button className="new-btn">
        + New
      </button>

      <ul className="sidebar-menu">

        <li className="active">
          📁 My Drive
        </li>

        <li>
          🕒 Recent
        </li>

        <li>
          ⭐ Starred
        </li>

        <li>
          👥 Shared
        </li>

        <li>
          🗑 Trash
        </li>

        <li>
          ⚙ Settings
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;








// import "../styles/Sidebar.css";

// function Sidebar() {
//   return (
//     <aside className="sidebar">

//       <h3 className="sidebar-title">Menu</h3>

//       <ul className="sidebar-menu">
//         <li>📁 My Drive</li>
//         <li>⭐ Starred</li>
//         <li>🕒 Recent</li>
//         <li>👥 Shared</li>
//         <li>🗑 Trash</li>
//         <li>⚙ Settings</li>
//       </ul>

//     </aside>
//   );
// }

// export default Sidebar;