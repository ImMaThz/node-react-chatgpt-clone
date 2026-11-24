import "./Sidemenu.css";

function SideMenu({ onNewChat }) {
  return (
    <aside className="sidemenu">
      <button className="side-menu-button" onClick={onNewChat}>
        <span>+</span> Novo chat
      </button>
    </aside>
  );
}

export default SideMenu;
