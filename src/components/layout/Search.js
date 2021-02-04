import React from 'react'

const Search = ({searchForm, onChange, onSubmit}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Repo Name</label>
        <input type="text"
               name="name"
               placeholder="Enter a repo name"
               value={searchForm.name}
               onChange={onChange}
               required />

        
        <label>Sort By</label>
        <select name="sorting" id="sorting" value={searchForm.sorting} onChange={onChange}>
          <option value="stars">stars</option>
          <option value="forks">forks</option>
          <option value="help-wanted-issues">help-wanted-issues</option>
        </select>
        
        <input type="submit" value="Search" style={{display: 'block'}}/>
      </form>
    </div>
  )
}

export default Search
