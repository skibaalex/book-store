import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/style/style.scss';
import Header from './components/header/Header';
import AdminRoute from './components/protected-routes/AdminRoute';
import { AuthProvider } from './context/AuthContext/AuthContext';
import Admin from './pages/Admin';
import BookDetails from './pages/BookDetails';
import Books from './pages/Books';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/book/:id" component={BookDetails} />
            <Route path="/books" component={Books} />
            <AdminRoute path="/admin" component={Admin} />
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
