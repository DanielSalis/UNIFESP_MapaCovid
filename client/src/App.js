import React from 'react';
import './App.css';

//bibliotecas
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Componentes e Paginas
import Header from './components/Header';
import NotFound from './components/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;
