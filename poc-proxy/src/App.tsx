import React from 'react';
import './App.css';
import { ProxyEmbed } from './ProxyEmbed/ProxyEmbed';

function App() {
  return (
    <div className="App">
      <ProxyEmbed targetUrl='http://www.google.com' />
    </div>
  );
}

export default App;
