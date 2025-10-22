"use client";
import React, { useState } from "react";
import styles from "./filterBar2.module.css";
import { FaFilter, FaSearch } from "react-icons/fa";

const FilterBar2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    available: false,
    rating: "",
  });

  const handleFilterChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "with filters:", filters);
  };

  return (
    <div style={{boxShadow: 'none'}} className={styles.filterBar}>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search By Name..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          <FaSearch />
          Search
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {showFilters && (
        <section className={styles.popUpSec}>
          <div className={styles.filterPopup}>
          <div className={styles.filterHeader}>
            <h3>Filter Options</h3>
            <button
              className={styles.closeBtn}
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.filterContent}>
            <div className={styles.filterGroup}>
              <label>Trade:</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="Selct">Select</option>
                <option value="Approved">CS</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button
              className={styles.applyBtn}
              onClick={() => {
                setShowFilters(false);
                handleSearch();
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
        </section>
      )}
    </div>
  );
};

export default FilterBar2;
