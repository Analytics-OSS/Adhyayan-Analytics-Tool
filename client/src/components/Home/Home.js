import React,{Fragment,useState} from 'react'
import Button from '@material-ui/core/Button'
import ReactS3 from 'react-s3'
import Landpage from '../Landpage/Landpage'
import ContactForm from '../ContactForm/ContactForm'
import './home.css'

export default function Home() {
    const [csvID,setCsvID] = useState('')

    const config = {
        bucketName: '',
        dirName: '', /* optional */
        region: '',
        accessKeyId: '' ,
        secretAccessKey: '' ,
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
                <ContactForm />
            </div>
        </Fragment>
    )
}