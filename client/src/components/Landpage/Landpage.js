import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Parallax, ParallaxLayer } from 'react-spring'
import Navbar from '../Navbar/Navbar'
import './Landpage.css'

class Landpage extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="graph-img"></div>
                <section className="Landpage-central">
                    <h1 className = "main-heading">Adhyayan</h1>
                    <h3 className = "tagline">Data Visualisation made easy.</h3>
                    <Link exact to = '/submitDetails' className = 'getStarted'>
                    Get Started!</Link>
                </section>

                <ul className="about-us">
                    <li>
                        <img src="https://images.unsplash.com/photo-1470955233021-2c79a52e5034?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="profile"/>
                        <h4>Aayush Kumbhare</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,sint!</p>
                    </li>
                    <li>
                        <img src="https://images.unsplash.com/photo-1470955233021-2c79a52e5034?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="profile"/>
                        <h4>Aayush Kumbhare</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,sint!</p>
                    </li>
                    <li>
                        <img src="https://images.unsplash.com/photo-1470955233021-2c79a52e5034?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="profile"/>
                        <h4>Aayush Kumbhare</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,sint!</p>
                    </li>
                </ul>
                <div class="contact">
                    {/* <h3 className="title">Contact Us</h3> */}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,sint!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,sint!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,sint!</p>
                    <ul>
                        <li>Icons</li>
                        <li>Icons</li>
                        <li>Icons</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Landpage;