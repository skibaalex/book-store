import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/style/style.scss';
import Header from './components/header/Header';
import HomePage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
