import React,{Fragment} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
    return (
        <Fragment>
          <Router>
            <div className="nav">
               <Link className = 'brand' exact to = '/'>Adhyayan</Link>
               <section className = 'nav-items'>
                <Link className = 'item' exact to = '/'>About Us</Link>
                <Link className = 'item' exact to = '/'>Contact</Link>
               </section>
            </div>
          </Router>
        </Fragment>
    )
}
