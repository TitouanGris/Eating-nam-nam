import { useEffect, useState } from "react";
import Chip from "../components/Chip";

function Filters() {
  const [filterChip, setFilterChip] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/tags")
      .then((res) => res.json())
      .then((data) => setFilterChip(data))
      .catch((err) => console.error(err));
  }, []);
  console.info(filterChip);

  const typeTag = filterChip.filter((tag) => tag.category_id === 6);
  const countryTag = filterChip.filter((tag) => tag.category_id === 2);
  const priceTag = filterChip.filter((tag) => tag.category_id === 1);
  const difficultyTag = filterChip.filter((tag) => tag.category_id === 4);
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);
  const durationTag = filterChip.filter((tag) => tag.category_id === 5);

  return (
    <div className="filters">
      <div className="filters-header">
        <button type="button">⬅️</button>
        <p>Mes filtres</p>
        <button type="button">réinitialiser</button>
      </div>
      <div className="Category">
        {typeTag.map((tag) => {
          return <Chip name={tag.name} />;
        })}
      </div>
      {countryTag.map((tag) => {
        return <Chip name={tag.name} />;
      })}
      {priceTag.map((tag) => {
        return <Chip name={tag.name} />;
      })}
      {difficultyTag.map((tag) => {
        return <Chip name={tag.name} />;
      })}
      {regimeTag.map((tag) => {
        return <Chip name={tag.name} />;
      })}
      {durationTag.map((tag) => {
        return <Chip name={tag.name} />;
      })}
    </div>
  );
}
export default Filters;
