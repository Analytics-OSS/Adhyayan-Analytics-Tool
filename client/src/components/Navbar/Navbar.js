import React,{Fragment} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'

import './navbar.css'

import Adh from "../../assets/newsvg.svg"

export default function Navbar() {
    return (
        <Fragment>
          <Router>
            <div className="nav">
               <Link exact to = '/' className = "brand">
                  <img className = "logo brand"src={Adh} alt="Adhyayan"/>
                </Link>
               <div className = 'nav-items'>
                <Link className = 'item' exact to = '/'>About Us</Link>
                <Link className = 'item' exact to = '/'>Contact</Link>
               </div>
            </div>
          </Router>
        </Fragment>
    )
}
