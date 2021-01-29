import React,{Fragment} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
    return (
        <Fragment>
          <Router>
            <div className="nav">
               <Link className = 'brand' exact to = '/'>Adhyan</Link>
               <section className = 'nav-items'>
                <Link className = 'item' exact to = '/'>Navitem1</Link>
                <Link className = 'item' exact to = '/'>Navitem2</Link>
               </section>
            </div>
          </Router>
        </Fragment>
    )
}
