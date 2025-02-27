import React from 'react';
import { Toolbar } from './components/Toolbar';
import { FormulaBar } from './components/FormulaBar';
import { Grid } from './components/Grid';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm">
        <Toolbar />
        <FormulaBar />
      </div>
      <Grid />
    </div>
  );
}

export default App;