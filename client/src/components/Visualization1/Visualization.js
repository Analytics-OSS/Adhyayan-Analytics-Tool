import React,{Fragment,useState,useEffect} from 'react'
import { embed as BokehEmbed } from "@bokeh/bokehjs"
import Axios from 'axios'

import './Visualization.css'
export default function Visualization() {

    const [data,setData] = useState('')
    const getResult = ()=>{
   
        Axios.get('/submit')
        .then(resp=>BokehEmbed.embed_item(resp.data,'dataPlot'))
     
     }
    
    return (
        <Fragment>
            <h4>{data}</h4>
            <div className="file-details">
                <p className="details-heading">DETAILS</p>
            </div>
            <div className="tools-area">
                <p className="tools-heading">Tools</p>
            </div>
            <button onClick = {getResult} className = "getResult-button">Get Result</button>
            <div className = 'resultedData' id = 'dataPlot'></div>
        </Fragment>
    )
}
