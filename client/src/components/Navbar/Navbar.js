import React,{Fragment} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'

import './navbar.css'

import Adh from "../../assets/Adhyayan.svg"

export default function Navbar() {
    return (
        <Fragment>
          <Router>
<<<<<<< HEAD
            <section className="nav">
               <Link className = 'brand' exact to = '/'>
                  <img className = "logo"src={Adh} alt="logo"/>
                  <h2>Adhyayan</h2>
=======
            <div className="nav">
               <Link exact to = '/' className = "brand">
                  <img className = "logo brand"src={Adh} />
>>>>>>> 464c05fbd2cc7d50fda2ae6c6a94cdbd9a116d1d
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
