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
  
return (
  <Fragment>
    <div className="file-details"></div>
    <input className = 'file-input' type = 'file' onChange = {upload}/>
    <button onClick = {submit} className = "submit-button">Submit</button>  
  </Fragment>
);
}

