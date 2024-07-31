import React, { useState, useEffect, useRef, useContext } from "react";
import "./Search.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../header/index";
import Banner from "../../assets/banner-search.jpg";
import BannerLight from "../../assets/banner-search-light.png";
import data from "../../data/varietydata.json";
import sortAscImg from "../../assets/asc-sort.png";
import sortDescImg from "../../assets/des-sort.png";
import sortAscDarkImg from "../../assets/asc-sort-dark.png";
import sortDescDarkImg from "../../assets/des-sort-dark.png";
import { ThemeContext } from "../../contexts/ThemeContext";

const Search = () => {
  const { theme } = useContext(ThemeContext);

  const columnHeaders = [
    "acno",
    "ACCESSION",
    "CULTIVAR NAME",
    "Origin Country",
    "Origin Province",
    "Origin City",
    "E pedigree",
    "E GENUS",
    "E SPECIES",
  ];

  const columnDisplayNames = [
    "Acc Number",
    "Accession",
    "Cultivar Name",
    "Origin Country",
    "Origin Province",
    "Origin City",
    "E Pedigree",
    "E Genus",
    "E Species",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: columnHeaders[0],
    direction: "ascending",
  });
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const tableRef = useRef(null);

  useEffect(() => {
    setTableData(data);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm) {
      tableRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...tableData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [tableData, sortConfig]);

  const filteredData = sortedData
    .filter((row) => {
      const matchesSearchTerm = Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const allValuesNA = columnHeaders.every(
        (col) => !row[col] || row[col] === "NA"
      );

      return matchesSearchTerm && !allValuesNA;
    })
    .map((row) => {
      let newRow = {};
      for (let key in row) {
        newRow[key] = row[key] || "NA";
      }
      return newRow;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VarietyData");
    XLSX.writeFile(workbook, "VarietyData.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableRows = filteredData.map((row) =>
      columnHeaders.map((col) => row[col])
    );

    doc.autoTable({
      head: [columnDisplayNames],
      body: tableRows,
    });
    doc.save("VarietyData.pdf");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending"
        ? theme === "dark"
          ? sortAscDarkImg
          : sortAscImg
        : theme === "dark"
        ? sortDescDarkImg
        : sortDescImg;
    }
    return theme === "dark" ? sortAscDarkImg : sortAscImg;
  };

  return (
    <div className={`search-container ${theme}`}>
      <div className="search-banner">
        <Header />
        <img
          src={theme === "dark" ? Banner : BannerLight}
          alt="Apple Banner"
          className="search-banner-image"
        />
        <div className="header1">
          <div className="search-bar-container">
            <div className="search-head">
              <p className="search-instruction">
                Find the perfect apple variety
              </p>
            </div>
            <div className="search-body">
              <input
                type="text"
                className="search-bar"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>
      {searchTerm && (
        <>
          <div className="table-wrapper">
            <table className="search-table" ref={tableRef}>
              <thead>
                <tr>
                  {columnDisplayNames.map((col, index) => (
                    <th
                      key={index}
                      onClick={() => handleSort(columnHeaders[index])}
                    >
                      <div className="col-head">
                        {col}
                        <img
                          src={getSortIcon(columnHeaders[index])}
                          alt={
                            sortConfig.key === columnHeaders[index]
                              ? sortConfig.direction === "ascending"
                                ? "Ascending"
                                : "Descending"
                              : "Sort"
                          }
                          style={{
                            width: "20px",
                            height: "20px",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={index}>
                      {columnHeaders.map((col, colIndex) => (
                        <td key={colIndex}>{row[col]}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columnHeaders.length}>No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <div className="entries-per-page">
              <label htmlFor="entriesPerPage">Entries per page:&nbsp;</label>
              <select
                id="entriesPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="pagination-btns">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                &#11013;
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                &#11157;
              </button>
            </div>
          </div>

          <div className="export-buttons">
            <button onClick={exportToExcel}>Export to Excel</button>
            <button onClick={exportToPDF}>Export to PDF</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
