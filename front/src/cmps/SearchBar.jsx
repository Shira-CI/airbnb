import { useRef, useState } from 'react'

export function SearchBar({ onExpandSearch, isSearchOpen, isStayId }) {


    function onSearchHandle(key) {
        onExpandSearch()
    }


    const dynClass = isSearchOpen ? "hide" : ""
    // console.log(isStayId);
    return (

        <div className={`search-bar  ${dynClass}`}>
            {!isStayId && <>
                <button onClick={() => onSearchHandle("where")} className="anywhere-search-btn">
                    <p>Anywhere</p>

                </button>
                <button onClick={() => onSearchHandle("week")} className="anyweek-search-btn">
                    <p>Any week</p>
                </button>
            </>}
            <button onClick={() => onSearchHandle("guests")} className="add-guests-search-btn">
                <p>{isStayId ? "Start your search" : "Add guests"}</p>
            </button>
            <button onClick={() => onSearchHandle("search")} className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    )
}