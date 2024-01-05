import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const FiltersContext = createContext();

export function FiltersContextProvider({ children }) {
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterRegime, setFilterRegime] = useState([]);
  const [filterRegimeId, setFilterRegimeId] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState([]);
  const [filterDuration, setFilterDuration] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const selectContext = useMemo(() => {
    return {
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
