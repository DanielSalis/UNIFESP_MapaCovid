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

//Redux
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
