import React ,{useState}from 'react'
import {useHistory} from 'react-router-dom'
import {Paper,Typography,Button,TextField} from '@material-ui/core'
import './login.css'

const LoginPage=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errorMessage,setErrorMessage]=useState('')

    const history=useHistory()

    return(
        <div className='container'>
            <Paper>
            <Typography variant='h2' color='primary' className='heading'>Log In</Typography>
            {errorMessage && <div>{errorMessage}</div>}
            <form className='form-wrapper'>
                <TextField className='fields' label='Email' variant='outlined' required='true' onChange={e=>setEmail(e.target.value)}/>
                <TextField className='fields' label='Password' variant='outlined' required='true' onChange={e=>setPassword(e.target.value)}/>
                <div className='button-wrapper'>
                    <Button variant='contained' color='primary' disabled={!email| !password}>Log In</Button>
                    <Button onClick={()=>history.push('/forgot-password')}>Forgot Password?</Button>
                </div>
                <p className='signup-btn'>Don't have an account? <Button onClick={()=>history.push('/signup')}>Sign Up</Button></p>      
            </form>
        </Paper>
        </div>
    )
}

export default LoginPage
