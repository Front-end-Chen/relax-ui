import React from 'react';
import Button from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button >hello</Button>
        <Button btnType="primary" size="lg">hello</Button>
        <Button disabled btnType="danger">hello</Button>
        <Button btnType="link" href="https://www.baidu.com" target="_blank" size="sm">hello</Button>
        <hr />
        <h1>Hello world</h1>
        <h2>Hello world</h2>
        <h3>Hello world</h3>
      </header>
    </div>
  );
}

export default App;