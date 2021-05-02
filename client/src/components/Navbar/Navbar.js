import React,{Fragment} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
    return (
        <Fragment>
          <Router>
            <section className="nav">
               <Link className = 'brand' exact to = '/'><h2>Adhyayan</h2></Link>
               <section className = 'nav-items'>
                <Link className = 'item' exact to = '/'>About Us</Link>
                <Link className = 'item' exact to = '/'>Contact</Link>
               </section>
            </section>
          </Router>
        </Fragment>
    )
}
