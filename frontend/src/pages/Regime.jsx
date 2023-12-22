import { useEffect, useState } from "react";
import FilterRegime from "../components/FilterRegime";

function Regime() {
  const [filterChip, setFilterChip] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/tags")
      .then((res) => res.json())
      .then((data) => setFilterChip(data))
      .catch((err) => console.error(err));
  }, []);

  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);

  return (
    <div className="regime">
      <div className="title">
        {" "}
        <h3>Votre régime</h3>
        <p>Sélectionner vos préférences (si vous en avez)</p>
      </div>
      <div className="regimetag">
        <FilterRegime regimeTag={regimeTag} />
      </div>
      <div className="ingredientTag">To do</div>
    </div>
  );
}

export default Regime;
