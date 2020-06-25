import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import List from './components/List/List';
import SaveProduct from './components/SaveProduct/SaveProduct';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

class App extends React.Component {

  render() {

    return (
      <div >
        <BrowserRouter>
          <Toolbar />
          <Switch>
            <Route path="/list" component={List} />
            <Route path="/save" component={SaveProduct} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
