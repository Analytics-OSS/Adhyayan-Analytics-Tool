import React,{Fragment} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'
import data from '../../assets/data.png'
import Navbar from '../Navbar/Navbar'
import Button from '@material-ui/core/Button'
import './home.css'

export default function Home() {
    return (
        <Fragment >
            <div className = 'HomeBody'>

            <Navbar/>
            <div className = 'main'>
                <h1 className = "adhyan">Adhyan</h1>
                <h2 className = "subHeading">Data Visualization and Analytics Tool</h2>
                <p className = 'description'>Lorem ipsum dolor sit 
                amet, consectetur adipiscing elit, sed do
                eiusmod temm ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
               
                <img src={data} className = "dataImage"/>
                
                <Link exact to = '/submitDetails' className = 'getStarted'>
                    Get Started!</Link>
        </div>
            </div>
        </Fragment>
    )
}
