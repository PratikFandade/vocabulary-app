import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import axios from 'axios'

import NavBar from './components/NavBar.js';
import WordList from './components/WordList.js'
import AddWord from './components/AddWord.js'
import Search from './components/Search.js'

import './App.css';

export default function App() {
  // Main wordlist Data
  const [wordList, setWordList] = useState([])

  // Fetching Data from API
  const fetchData = async () => {
    const port = process.env.REACT_APP_SERVER_PORT;
    const wordlist = await axios.get(`http://localhost:${port}/`)
    setWordList(wordlist.data)
  }
  
  // Updating Data on render
  useEffect(() => {
    const fetchData = async () => {
      const port = process.env.REACT_APP_SERVER_PORT || 5000;
      const wordlist = await axios.get(`http://localhost:${port}/`)
      setWordList(wordlist.data)
    }
    fetchData()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <NavBar />
            <WordList wordList={wordList} />
            <AddWord updateRes={fetchData} />
          </div>
        } />
        <Route path="/search" element={
          <div className="App">
            <Search wordList={wordList} />
          </div>
        } />
      </Routes>
    </Router>
  );
}
