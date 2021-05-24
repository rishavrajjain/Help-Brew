import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ResourceList from './components/resources/ResourceList';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import AddResource from './components/resources/AddResource';
import EditResource from './components/resources/EditResource';
import ResourcePage from './components/resources/ResourcePage';
import Profile from './components/auth/Profile';
import Contribute from './components/pages/Contribute';
import Home from './components/pages/Home';



function App() {
  return (
    <Router>
        
        <Switch>
          <Route exact path="/" component={Home}></Route>
            <Route exact path="/resources" component={ResourceList}></Route>
            <Route exact path="/resources/:id" component={ResourcePage}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/contribute" component={Contribute}></Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path="/resource/add" component={AddResource}></PrivateRoute>
            <PrivateRoute exact path="/resource/edit/:id" component={EditResource}></PrivateRoute>
            <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>

        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;
