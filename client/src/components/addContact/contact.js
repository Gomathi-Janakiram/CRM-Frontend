import React,{useState} from 'react'
import {TextField,Typography,Paper,Button} from '@material-ui/core'
import './contact.css'


const AddContact=()=>{

    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        company:"",
        Phone:""
    })

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(data)
        postData(data)
    }

    const postData=(data)=>{
        fetch("http://localhost:4000/contact",{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(result=>{
            return result.json()
        })
        .then((res)=>{
            console.log(res)
        })
    }

    return(
        <div className='container'>
            <Paper>
                <Typography variant='h4' color='primary' className='heading'>Create New Contact</Typography>
                <form className='form-wrapper' autoComplete='off' onSubmit={handleSubmit}>
                    <TextField label='First Name' variant='outlined' className='fields' onChange={(e)=>setData({...data,firstName:e.target.value})}/>
                    <TextField label='Last name' variant='outlined' className='fields' onChange={(e)=>setData({...data,lastName:e.target.value})}/>
                    <TextField label='Email Id' variant='outlined' className='fields' onChange={(e)=>setData({...data,email:e.target.value})}/>
                    <TextField label='Company' variant='outlined' className='fields' onChange={(e)=>setData({...data,company:e.target.value})}/>
                    <TextField label='Contact Number' variant='outlined' className='fields' onChange={(e)=>setData({...data,Phone:e.target.value})}/>
                    <button type='submit' className='create-btn'>Create</button>
                </form>
            </Paper>
        </div>
       
    )
}

export default AddContact