import "./Filtro.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Filtro() {
  const params = useParams();
  const navigate = useNavigate();

  const sort = (e) => {
    if (e.target.checked == true) {
      switch (e.target.id) {
        case "orden_nuevo":
          navigate(`/repositories/${params.type}/byDate/1`);
          break;
        case "orden_puntuado":
          navigate(`/repositories/${params.type}/byRate/1`);
          break;
        case "orden_alfabetico":
          navigate(`/repositories/${params.type}/byName/1`);
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="filtro">
      <div className="filtro_cuadro">
        <label className="filtro_subtitulo">Ordenar por</label>
        <div className="filtro_orden">
          <input type="radio" name="orden" id="orden_nuevo" onChange={sort} />
          <label htmlFor="orden_nuevo">Mas nuevo</label>
          <input
            type="radio"
            name="orden"
            id="orden_puntuado"
            onChange={sort}
          />
          <label htmlFor="orden_puntuado">Mejor puntuado</label>
          <input
            type="radio"
            name="orden"
            id="orden_alfabetico"
            onChange={sort}
          />
          <label htmlFor="orden_alfabetico">Alfabéticamente</label>
        </div>
      </div>
    </div>
  );
}
