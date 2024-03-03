import "./Searchbar.css";
import robot from "../assets/avatars/robot-art.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Searchbar() {
  const { setSearch } = useContext(AuthContext);
  let navigate = useNavigate();

  const detectEnter = (e) => {
    let keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
      setSearch(e.target.value);
      navigate("/repositories/search/byRate/1");
    }
  };

  return (
    <div className="searchbar">
      <div className="searchbar_cuadro">
        <div className="textInput">
          <p>/</p>
          <input
            onKeyDown={detectEnter}
            type="text"
            className="searchInput"
            placeholder="search....."
          />
        </div>
        <Link to={"/user"}>
          <img src={robot} alt="avatar" id="sidebar_avatar" />
        </Link>
      </div>
    </div>
  );
}

export default Searchbar;
