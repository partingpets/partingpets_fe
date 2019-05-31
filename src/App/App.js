import React from 'react';
import { Button } from 'reactstrap';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button tag="a" color="success" size="large" href="http://reactstrap.github.io" target="_blank">
          View Reactstrap Docs
        </Button>
      </header>
    </div>
  );
}

export default App;
