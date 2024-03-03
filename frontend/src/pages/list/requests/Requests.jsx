/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import "./Requests.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import robot from "../../../assets/avatars/square-head.svg";
import { listPendingRepositories } from "../../../helpers/Http";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { changeRepoStatus } from "../../../helpers/Http";

function Requests() {
  const params = useParams();
  const { token } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [pages, setPages] = useState(1);

  const [counter, setCounter] = useState(0);

  const enviar = async () => {
    let response = await listPendingRepositories(token, params.page);
    setPages(response.pages);
    setRepositories(response.repositories);
  };

  const allowRepo = async (id) => {
    await changeRepoStatus(token, {
      repository: id,
      status: "aprobado",
    });
    setCounter((count) => count + 1);
  };
  const denyRepo = async (id) => {
    await changeRepoStatus(token, {
      repository: id,
      status: "denegado",
    });
    setCounter((count) => count + 1);
  };

  useEffect(() => {
    enviar();
  }, [params.page, counter]);

  return (
    <>
      <div className="create_project_navigation">
        <Link
          className="create_project_navigation-button"
          to={"/repositories/todos/byRate/1"}
        >
          {"< REGRESAR"}
        </Link>
      </div>
      <div className="requests_projects">
        <div className="repositories">
          {repositories.map((repo) => (
            <div key={repo._id} className="requests_projects-project">
              <div className="request_repository">
                <div className="index_repository-title">
                  <p className="index_repository-title-text">{repo.title}</p>
                </div>
                <div className="index_repository-description">
                  <p className="index_repository-description-text">
                    {repo.description}
                  </p>
                </div>
                <div className="request_repository-info">
                  <div className="index_repository-info-tags">
                    <p className="index_repository-info-tags-label">
                      Etiquetas:
                    </p>
                    <p className="index_repository-info-tags-items">
                      {repo.tags.map((tag) => tag + ", ")}
                    </p>
                  </div>
                  <div className="index_repository-info-links">
                    <Link
                      target="_blank"
                      to={repo.link}
                      className="index_repository-info-links-button-link"
                    >
                      Ir a GitHub
                    </Link>
                    <img
                      src={robot}
                      alt="user image"
                      className="index_repository-info-links-avatar"
                    />
                  </div>
                </div>
              </div>
              <div className="requests_projects-project-buttons">
                <button
                  className="requests_projects-project-buttons-button"
                  onClick={async () => allowRepo(repo._id)}
                >
                  Aprobar
                </button>
                <button
                  type="button"
                  onClick={async () => denyRepo(repo._id)}
                  className="requests_projects-project-buttons-button"
                >
                  Denegar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="projects_navigation">
          {parseInt(params.page) > 1 ? (
            <Link
              className="projects_navigation-navegator navegator1"
              to={`/repositories/${params.type}/${params.sort}/${
                parseInt(params.page) - 1
              }`}
            >
              {"<"}
            </Link>
          ) : (
            <div className="projects_navigation-navegator navegator1"></div>
          )}
          <p className="projects_navigation-indicator">{params.page}</p>
          {parseInt(params.page) < pages ? (
            <Link
              className="projects_navigation-navegator navegator2"
              to={`/repositories/${params.type}/${params.sort}/${
                parseInt(params.page) + 1
              }`}
            >
              {">"}
            </Link>
          ) : (
            <div className="projects_navigation-navegator navegator2"></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Requests;
