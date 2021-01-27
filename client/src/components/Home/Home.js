import React,{useEffect,useState,Fragment} from 'react'
import ReactS3 from 'react-s3'
import Button from '@material-ui/core/Button'
import './home.css'
import data from '../../assets/data.png'

export default function Home() {
    
    const [csvID,setCsvID] = useState('')

    const config = {
        bucketName: 'adhyan-csv-storage',
        dirName: 'csvStorage', /* optional */
        region: 'ap-south-1',
        accessKeyId: "AKIAVSBDGESQYIHAAT57" ,
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
    const csv_loc = csvID;
    const response = await fetch("/submit",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(csv_loc)
    })
  } catch (error) {
      console.log(error)
  }
}


return (
  <Fragment>
    <div className = "background">
      <section className="glass"></section>
      
    </div>
   <div className = 'main'>
   <h1 className = "adhyan">Adhyan</h1>
    <h2 className = "subHeading">Data Visualization and Analytics Tool</h2>
    <img src={data} className = "dataImage"/>
    </div>
    <div className = "uploadBody">
    <h3 className = "uploadCsv">Upload Your CSV file here</h3>
    <input type = 'file'
    onChange = {upload}
    />
    <Button 
    variant="contained" 
    color="primary"
    onClick={submit}
    >
     Submit
    </Button>
    </div>
   
  </Fragment>
);
}

