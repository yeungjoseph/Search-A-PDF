import React from 'react';
import './App.css';
import { PdfContainer } from './Containers/PdfContainer';

const App = () => {
  return (
    <div className="App">
      <h1 className="App__title">Search a PDF</h1>
      <PdfContainer />
    </div>
  );
};

export default App;
