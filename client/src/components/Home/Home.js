import React,{Fragment,useState} from 'react'
import Button from '@material-ui/core/Button'
import ReactS3 from 'react-s3'
import Landpage from '../Landpage/Landpage'
import './home.css'

export default function Home() {
    const [csvID,setCsvID] = useState('')

    const config = {
        bucketName: 'adhyan-csv-storage',
        dirName: 'csvStorage', /* optional */
        region: 'ap-south-1',
        accessKeyId: 'AKIAVSBDGESQ4IZMVP6D' ,
        secretAccessKey: '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' ,
    }
    const upload = (e) =>{
        console.log(e.target)
        ReactS3.uploadFile(e.target.files[0],config)
        .then((data)=>{
            //console.log(data.location)
            setCsvID(data.location)
        })
        .catch((err)=>console.log(err))
}

    return (
        <Fragment >
            <div className = 'HomeBody'>
                <Landpage/>
            </div>
        </Fragment>
    )
}