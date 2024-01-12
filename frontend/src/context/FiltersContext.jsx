import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const FiltersContext = createContext();

export function FiltersContextProvider({ children }) {
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterPriceId, setFilterPriceId] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterCountryId, setFilterCountryId] = useState([]);
  const [filterRegime, setFilterRegime] = useState([]);
  const [filterRegimeId, setFilterRegimeId] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState([]);
  const [filterDifficultyId, setFilterDifficultyId] = useState([]);
  const [filterDuration, setFilterDuration] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [favorisTable, setFavorisTable] = useState([]);
  const selectContext = useMemo(() => {
    return {
      filterCountry,
      setFilterCountry,
      filterDifficulty,
      setFilterDifficulty,
      filterDifficultyId,
      setFilterDifficultyId,
      filterDuration,
      setFilterDuration,
      filterPrice,
      setFilterPrice,
      filterRegime,
      setFilterRegime,
      filterRegimeId,
      setFilterRegimeId,
      filterType,
      setFilterType,
      filterPriceId,
      setFilterPriceId,
      filterCountryId,
      setFilterCountryId,
      favorisTable,
      setFavorisTable,
    };
  }, [
    filterCountry,
    setFilterCountry,
    filterDifficulty,
    setFilterDifficulty,
    filterDuration,
    setFilterDuration,
    filterPrice,
    setFilterPrice,
    filterRegime,
    setFilterRegime,
    filterRegimeId,
    setFilterRegimeId,
    filterType,
    setFilterType,
    filterPriceId,
    setFilterPriceId,
    filterCountryId,
    setFilterCountryId,
    filterDifficultyId,
    setFilterDifficultyId,
    favorisTable,
    setFavorisTable,
  ]);

  return (
    <FiltersContext.Provider value={selectContext}>
      {children}
    </FiltersContext.Provider>
  );
}

FiltersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FiltersContext;
