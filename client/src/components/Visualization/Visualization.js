import React,{Fragment,useState,useEffect} from 'react'

export default function Visualization() {

    const [data,setData] = useState('')

    useEffect(
        async()=>{
       const response =  await fetch('http://127.0.0.1:5000/submit')
                                .then(res => res.json())
                                .then((result)=>setData(result))
                                .catch((e)=>console.log(e))
        },[])
    
    return (
        <Fragment>
            <h4>{data}</h4>
        </Fragment>
    )
}
