import React from 'react';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <div className="welcome">
        <h1>Welcome to UrbanScout</h1>
      </div>

      <div className="content">
        <button className="button" onClick={clickEvent}>Find Me</button>
      </div>
    </div>
  );
}

const clickEvent = () => {
  alert("Clicked");
};

export default App;
