import React from 'react'
import { useState } from "react"
function SearchBar({searchTerm, setSearchTerm}) {
  return (
    <input type="text" 
    className='nav-search-input'
    placeholder='search'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    ></input>
  )
}

export default SearchBar