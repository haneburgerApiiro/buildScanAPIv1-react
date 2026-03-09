import logo from './logo.svg';
import './App.css';
import { getUserData, findUserById } from './insecureApi';
import React, { useEffect, useState } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchHtml, setSearchHtml] = useState('');
  const [userId, setUserId] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  useEffect(() => {
    getUserData().then(data => {
      console.log('Fetched insecure data:', data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // DEMO: Reflected XSS - user input rendered as HTML (vulnerable)
    setSearchHtml(searchInput);
  };

  const handleUserIdQuery = async (e) => {
    e.preventDefault();
    // DEMO: SQL injection - user input concatenated into "query" (vulnerable)
    const result = await findUserById(userId);
    setQueryResult(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        {/* DEMO: XSS - rendered with dangerouslySetInnerHTML */}
        <form onSubmit={handleSearch} style={{ marginTop: 16 }}>
          <label>
            Search (demo only):
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter text"
            />
          </label>
          <button type="submit">Show</button>
        </form>
        {searchHtml && (
          <div dangerouslySetInnerHTML={{ __html: searchHtml }} />
        )}

        {/* DEMO: SQL injection - userId passed to concatenated query */}
        <form onSubmit={handleUserIdQuery} style={{ marginTop: 16 }}>
          <label>
            User ID (demo only):
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 1 or 1' OR '1'='1"
            />
          </label>
          <button type="submit">Lookup</button>
        </form>
        {queryResult !== null && (
          <pre style={{ fontSize: 12, textAlign: 'left' }}>{JSON.stringify(queryResult, null, 2)}</pre>
        )}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
