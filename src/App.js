import React from 'react';
import './styles/scss/main.scss';
import Forecast from './views/Forecast'
import Error from './views/Error'
import ForecastContextProvider from "./contextProviders/ForecastContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <main>
          <Switch>
            <ForecastContextProvider>
              <Route path='/' component={Forecast} exact />
            </ForecastContextProvider>
            <Route component={Error} />
          </Switch>
        </main>
    </BrowserRouter>
  );
}

export default App;
