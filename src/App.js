import './App.css';
import React, { useState } from 'react'
import axios from 'axios'
import Search from './components/layout/Search'
import Repos from './components/layout/Repos'


function App() {
  const [loading, setLoading] = useState(false)
  const [searchForm, setSearchForm] = useState({
    name: '',
    sorting: 'stars'
  })
  const [repos, setRepos] = useState([])

  const onChange = (e) => {
    setSearchForm({ ...searchForm,
                   [e.target.name]: e.target.value})
  }

  

  const getRepos = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseURL = `https://api.github.com/search/repositories?`
      let queryString = 'q='

      if (searchForm.name) {
        queryString += encodeURIComponent(`${searchForm.name} in:name`) + '&';
      }
      queryString += `&sort=${searchForm.sorting}&per_page=100`
      
      console.log(queryString)
      const response = await axios.get(`${baseURL}${queryString}`)
      const repo_items = response.data.items
      
      setRepos(repo_items)
      setLoading(false)
      console.log(repo_items)
    } catch (e) {
      console.log('there is something wrong')
    }
  }




  return (
    <div className="App">
      <div className="container">
        <Search searchForm={searchForm} onChange={onChange} onSubmit={getRepos} />
        <Repos loading={loading} repos={repos} />
      </div>
    </div>
  );
}

export default App;
