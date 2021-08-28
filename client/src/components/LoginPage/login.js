import React ,{useState}from 'react'
import {useHistory} from 'react-router-dom'
import {Paper,Typography,Button,TextField} from '@material-ui/core'
import './login.css'

const LoginPage=()=>{
    return(
        <div className='container'>
            <Paper>
            <Typography variant='h2' color='primary' className='heading'>Log In</Typography>
            <form className='form-wrapper'>
                <TextField className='fields' label='Email' variant='outlined' required='true'/>
                <TextField className='fields' label='Password' variant='outlined' required='true'/>
                <div className='button-wrapper'>
                    <Button variant='contained' color='primary'>Log In</Button>
                    <Button>Forgot Password?</Button>
                </div>
                <p className='signup-btn'>Don't have an account? <Button>Sign Up</Button></p>      
            </form>
        </Paper>
        </div>
    )
}

export default LoginPage
