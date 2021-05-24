import * as React from "react";
import * as ReactDOM from "react-dom";
import './navbar.css';
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { Popup } from "@progress/kendo-react-popup";
import { Button } from "@progress/kendo-react-buttons";
import {Link} from 'react-router-dom';
import appBarBg from '../../assets/nav-bg.svg'
let kendokaAvatar =
  "https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png";
  



const Navbar = () => {
    const [show, setShow] = React.useState(false);
    const anchor = React.useRef(null);

    const [loggedIn,setLoggedIn]=React.useState(false);

    React.useEffect(()=>{
        const token = localStorage.getItem('helpbrew-token');
        if(token){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }

    },[])
  
    

    const openRoutes = (
        <React.Fragment>
        <AppBar themeColor="inherit" className="app-bar">
          <AppBarSection className="title">
            <h1 className="title">Help Brew</h1>
          </AppBarSection>
  
          <AppBarSpacer
            style={{
              width: 32,
            }}
          />
          <AppBarSpacer />
          <AppBarSection>
          <ul>
          <li>
            <Link className="nav-text" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-text" to="/resources">Resources</Link>
          </li>
          <li>
          <Link className="nav-text" to="/login">Get Started</Link>
          </li>
        </ul>
          </AppBarSection>
        </AppBar>
        
      </React.Fragment>
    )

    const closedRoutes = (
        <React.Fragment>
        <AppBar themeColor="inherit" style={{marginTop:0}} className="app-bar">
          <AppBarSection className="title">
            <h1 className="title">Help Brew</h1>
          </AppBarSection>
  
          <AppBarSpacer
            style={{
              width: 32,
            }}
          />
          <AppBarSpacer />
          <AppBarSection>
          <ul>
          <li>
            <Link className="nav-text" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-text" to="/resources">Resources</Link>
          </li>
          <li>
            <Link className="nav-text" to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link className="nav-text" to="/profile">Profile</Link>
          </li>
        </ul>
          </AppBarSection>
        </AppBar>
        
      </React.Fragment>
    )
  
    return loggedIn ? closedRoutes : openRoutes;
  };

export default Navbar;