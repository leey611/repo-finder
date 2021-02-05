import './App.css';
import React, { useState } from 'react'
import axios from 'axios'
import Search from './components/layout/Search'
import Repos from './components/layout/Repos'

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}


function App() {
  const [loading, setLoading] = useState(false)
  const [searchForm, setSearchForm] = useState({
    name: '',
    sorting: 'stars'
  })
  const [repos, setRepos] = useState([])
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setSearchForm({ ...searchForm,
                   [e.target.name]: e.target.value})
  }

  const getRepos = async (e) => {
    e.preventDefault()
    // if name is empty, set an alert
    if (!searchForm.name) {
      setError(true)
      setTimeout(() => setError(false), 5000)
    } else {
      setLoading(true)
      try {
        const baseURL = `https://api.github.com/search/repositories?`
        const queryString = `q=` +
                        encodeURIComponent(`${searchForm.name} in:name`) +
                        `&sort=${searchForm.sorting}&per_page=100`;
        
        const response = await axios.get(`${baseURL}${queryString}`, {
          headers: {
            'Authorization': `${githubClientId}`
          }
        })
        const repo_items = response.data.items
        setRepos(repo_items)
        setLoading(false)
      } catch (e) {
        console.log('there is something wrong')
      }
    }
  }




  return (
    <div className="App">
      <div className="container">
        <Search searchForm={searchForm} onChange={onChange} onSubmit={getRepos} error={error}/>
        <Repos loading={loading} repos={repos} />
      </div>
    </div>
  );
}

export default App;
