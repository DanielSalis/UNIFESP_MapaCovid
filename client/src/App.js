import React from 'react';

//Styles
import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './react-geo.css';

//bibliotecas
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Componentes e Paginas
import Header from './components/Header';
import RightSidebar from './components/RightSidebar';
import NotFound from './components/NotFound';
import Home from './pages/Home';

//Redux
import store from './store';
import { Provider } from 'react-redux';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <RightSidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={AboutUs} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
