import { createContext, useMemo, useState, useEffect } from "react";
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

  useEffect(() => {
    if (localStorage.favoris) {
      const favorisData = JSON.parse(localStorage.favoris);
      setFavorisTable(favorisData);
    }

    if (localStorage.regimeTable) {
      const regimeTableData = JSON.parse(localStorage.regimeTable);
      setFilterRegime(regimeTableData);
    }

    if (localStorage.countryTable) {
      const countryTableData = JSON.parse(localStorage.countryTable);
      setFilterCountry(countryTableData);
    }

    if (localStorage.priceTable) {
      const priceTableData = JSON.parse(localStorage.priceTable);
      setFilterPrice(priceTableData);
    }

    if (localStorage.difficultyTable) {
      const difficultyTableData = JSON.parse(localStorage.priceTable);
      setFilterDifficulty(difficultyTableData);
    }
  }, []);

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
