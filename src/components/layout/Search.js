import React from 'react'

const Search = ({searchForm, onChange, onSubmit}) => {
  return (
    <div className="pt-3 pb-3">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Repo Name</label>
        <input className="form-control mb-3"
               type="text"
               name="name"
               placeholder="Enter a repo name"
               value={searchForm.name}
               onChange={onChange}
               aria-label="name"
               required />

        
        <label>Sort By</label>
        <select className="form-control mb-3"
                name="sorting" id="sorting" value={searchForm.sorting} onChange={onChange} aria-label="sorting">
          <option value="stars">stars</option>
          <option value="forks">forks</option>
          <option value="help-wanted-issues">help-wanted-issues</option>
        </select>
        
        <input type="submit" value="Search" className="d-block m-auto btn btn-info"/>
      </form>
    </div>
  )
}

export default Search
