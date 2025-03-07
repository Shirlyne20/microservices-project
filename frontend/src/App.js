import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000')
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>Microservices Frontend</h1>
        {data ? (
          <div>
            <p>Database Time: {data.db_time}</p>
            <p>Last Access: {data.last_access}</p>
          </div>
        ) : (
        <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
