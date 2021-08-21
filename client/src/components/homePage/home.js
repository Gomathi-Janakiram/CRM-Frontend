import React from 'react'
import './home.css'
import PermContactCalendarSharpIcon from '@material-ui/icons/PermContactCalendarSharp';
import { Typography,Button } from '@material-ui/core';

const HomePage=()=>{
    return(
        <div className='container'>
            <PermContactCalendarSharpIcon className='contact-icon' color='primary'/>
            <Typography color='primary' variant='h4'>Where Every Contact Counts!!!</Typography>
            <section class='button-container'>
                <Button href='/contacts' color='primary' variant='contained'>VIEW</Button>
                <Button href='/addContact' color='primary' variant='contained'>CREATE</Button>
            </section>
        </div>
    )
}

export default HomePage