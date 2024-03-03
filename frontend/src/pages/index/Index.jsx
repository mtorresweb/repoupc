import "./Index.css";
import Sidebar from "../../containers/Sidebar.jsx";
import Searchbar from "../../containers/Searchbar";
import Filtro from "../../containers/Filtro";
import { Outlet } from "react-router-dom";

function Index() {
  return (
    <div className="index_container">
      <Sidebar />
      <Searchbar />
      <Filtro />
      <div className="projects">
        <Outlet />
      </div>
    </div>
  );
}

export default Index;
