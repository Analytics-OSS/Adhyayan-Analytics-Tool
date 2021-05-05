import React,{useEffect,useState,useRef,Fragment} from 'react'
import ReactS3 from 'react-s3'
import Axios from 'axios'
import Navbar from "../Navbar/Navbar"
import { embed as BokehEmbed } from "@bokeh/bokehjs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import JsonTable from 'ts-react-json-table';

import './Dashboard.css'


export default function SubmitFile() {
    
    const [csvID,setCsvID] = useState("")
    const [data,setData] = useState('test')
    const [uploaded,setUploaded] = useState(false)
    const [linkSent,setLinkSent] = useState(false)
    const [filename,setFilename] = useState()
    const [recDetails,setRecDetails] = useState({})
    const [xVar,setXVar] = useState("")
    const [yVar,setYVar] = useState("")

    const config = {
      bucketName: 'adhyan-csv-storage',
      dirName: 'csvStorage', /* optional */
      region: 'ap-south-1',
      accessKeyId: "AKIAVSBDGESQ4IZMVP6D" ,
      secretAccessKey: "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",
    }
    

    const upload = async (e)=>{
      console.log(e.target)
      ReactS3.uploadFile(e.target.files[0],config)
      .then((data)=>{
          setCsvID(data.location)
          alert("File Uploaded: " + e.target.files[0].name)
      })
      .catch((err)=>console.log(err))
      setLinkSent(true)
      
    }
    const submit = async(e) =>{
      try {
        const details = {
          csvLink: csvID,
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
  const loadData = async()=>{
   
    try {
      if(linkSent === false){
        alert("Please Upload a file first")
      }
      else{
        await submit()
        await Axios.get('/fileDetails')
        .then(response => {
          const parsedJSON = JSON.parse(response.data)
          console.log(response.data)
          setRecDetails(parsedJSON)
          
        })
        await setUploaded(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const renderVariables = (columnList)=>{
    return(
      columnList.map((item)=>{
        return(
          <>
          <li key = {item}>{item}</li>
          </>
        )
      })
    )
  }

  const getScatterPlot = async(e)=>{
    try {
      const var_details = {
        "xVar":xVar,
        "yVar":yVar
      }
      const response = await fetch('/variableDetails',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(var_details)
      })
      await Axios.get('/scatterPlot')
            .then(resp=>BokehEmbed.embed_item(resp.data,'dataPlot'))
            .catch(error=>console.log(error))
    } catch (error) {
      console.log(error)
    }
  }
  const getLinePlot = async(e)=>{
    try {
      const var_details = {
        "xVar":xVar,
        "yVar":yVar
      }
      const response = await fetch('/variableDetails',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(var_details)
      })
      await Axios.get('/linePlot')
            .then(resp=>BokehEmbed.embed_item(resp.data,'dataPlot'))
            .catch(error=>console.log(error))
    } catch (error) {
      console.log(error)
    }
  }
  const getBarPlot = async(e)=>{
    try {
      const var_details = {
        "xVar":xVar,
        "yVar":yVar
      }
      const response = await fetch('/variableDetails',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(var_details)
      })
      await Axios.get('/barPlot')
            .then(resp=>BokehEmbed.embed_item(resp.data,'dataPlot'))
            .catch(error=>console.log(error))
    } catch (error) {
      console.log(error)
    }
  }
return (
  <Fragment>
    <Navbar/>
    
    <div className="file-details">
      <p className="details-heading">DETAILS:</p>
      {uploaded === true?
            (<>
              <button onClick={loadData} className = "side-getResult-button">
                GET RESULTS</button>
              <div className = "details-div">
                  <p className = "detail-name"><strong>NUMBER OF ROWS:</strong>
                    <span className="detail-value">{recDetails.rows}</span>
                  </p>
                  <p className = "detail-name"><strong>NUMBER OF COLUMNS:</strong>
                    <span className = "detail-value">{recDetails.cols}</span>
                  </p>
                  <p className = "detail-name">Variables in your file:</p>
                  <ul className = "detail -value">
                     {renderVariables(recDetails.columns)}
                  </ul>
                  {/* {recDetails.row_data} */}
                  <p className="detail-name">Data Description</p>
                  <JsonTable rows={recDetails.row_data} columns={recDetails.columns}/>
              </div>
            </>

            ):<><p className = "no_file_tagline">Upload a file to view details</p></>
      }
    </div>
    <div className="chart-area"> 
      
      {uploaded === false? 
        (
          <>
        <FontAwesomeIcon icon={faFileUpload} size = "6x"className = "fileUpload-icon" />
        <div className="file-input">
          <p className="fileInput-heading">Select a .xlsx or .csv file</p>

          <input type = "file" className = "file" id = "file" onChange = {upload}/>
          <label for = "file">UPLOAD</label>
          <button onClick = {loadData} className = "center-getResult-button">GET RESULT</button>
        </div> 
        </> 
        ):
        <><div className = 'graphArea' id = 'dataPlot'></div></>
      }
      
      <div className = 'resultedData' id = 'dataPlot'></div>
    </div>
    <div className="tools-area">
      <p className="tools-heading">Tools</p>
      <div className="variable-select">
          <label htmlFor="xVar" className = "enter-variable">Enter X-Variable</label>
          <input className = 'text-input'
                        type = 'text'
                        id = "xVar"
                        onChange = {(e)=>
                        {setXVar(e.target.value)
                          console.log(xVar)
                  }}/>
          <br/>
          <label htmlFor="yVar" className = "enter-variable">Enter Y-Variable</label>
          <input className = 'text-input'
                        type = 'text'
                        id = "yVar"
                        onChange = {(e)=>
                        {setYVar(e.target.value)
                          console.log(yVar)
                  }}/>
      </div>
      <div className="graph-tools">
        <p>Select Visualization</p>
        <button className="scatterPlot-chart-button" onClick = {getScatterPlot}>Scatter-Plot</button>
        <button className="scatterPlot-chart-button" onClick = {getLinePlot}>Line-Plot</button>
        <button className="scatterPlot-chart-button" onClick = {getBarPlot}>Bar-Plot</button>      
      </div>
    </div>
  </Fragment>
);
}

