import React,{useEffect,useState,Fragment} from 'react'
import ReactS3 from 'react-s3'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import Navbar from '../Navbar/Navbar'
import Visualization from '../Visualization/Visualization'
import { embed as BokehEmbed } from "@bokeh/bokehjs"

import './submitFile.css'


export default function SubmitFile() {
    
    const [csvID,setCsvID] = useState('')
    const [xVar, setXVar] = useState('')
    const [yVar,setYVar] = useState('')
    const [data,setData] = useState('test')

    const config = {
        bucketName: 'adhyan-csv-storage',
        dirName: 'csvStorage', /* optional */
        region: 'ap-south-1',
        accessKeyId: "AKIAVSBDGESQ4IZMVP6D" ,
        secretAccessKey: "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",
    }
    const upload = (e)=>{
        console.log(e.target)
        ReactS3.uploadFile(e.target.files[0],config)
        .then((data)=>{
            //console.log(data.location)
            setCsvID(data.location)
        })
        .catch((err)=>console.log(err))
}

const submit = async(e) =>{
  try {
    const details = {
      csvLink: csvID,
      xvar: xVar,
      yvar: yVar
    }
    const response = await fetch("/submit",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    })
  } catch (error) {
      console.log(error)
  }
}

const getResult = ()=>{
   
   Axios.get('/submit')
   .then(resp=>BokehEmbed.embed_item(resp.data,'dataPlot'))

}
  

return (
  <Fragment>
    <Navbar/>
          <div className = "background">
            <section className="glass"></section>
          </div>
      
          <h3 className = "data_details">Enter Details of your data</h3>
          <ul className = 'details_form'>
            <li className = 'items'>
              <p className='item-title'>Upload your CSV file:</p>
              <input className = 'file-input'type = 'file' onChange = {upload}/>
            </li>
            <li className = 'items'>
              <p className='item-title'>Enter x variable:</p>
              <input className = 'text-input'
                     type = 'text'
                     onChange = {(e)=>
                     {setXVar(e.target.value)
                      console.log(xVar)
              }}/>
            </li>
            <li className = 'items'>
              <p className='item-title'>Enter y variable:</p>
              <input className = 'text-input'
                     type = 'text'
                     onChange = {(e)=>
                     {setYVar(e.target.value)
                      console.log(yVar)
              }}/>
            </li>
          </ul>
          <button onClick = {submit} className = "submit-button">Submit</button>
          <button onClick = {getResult} className = "getResult-button">Get Result</button>
          
          <div className = 'resultedData' id = 'dataPlot'></div>
   
  </Fragment>
);
}

