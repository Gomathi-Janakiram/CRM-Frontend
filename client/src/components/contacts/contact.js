import { Typography,Container,Card,CardContent,Button,Table,TableBody,TableHead,TableCell,TableContainer,Paper,TableRow,makeStyles,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@material-ui/core';
import {Add,Delete,Edit} from '@material-ui/icons';
import {React,useState,useEffect }from 'react';
import './contact.css'


const useStyles=makeStyles({
    table:{
        marginTop:30,
        boxShadow:'none',
    }

})


const Contacts=()=>{

    const [open,setOpen]=useState(false)

    const [data,setData]=useState([])

    const [deleteData,setDeleteData]=useState({})

    useEffect(()=>{
        fetch('http://localhost:4000/contact')
        .then(res=>{
            return res.json()     
        })
        .then(data=>{
            setData(data)
        })
    })

    const deleteContact=(item)=>{
        fetch("http://localhost:4000/contact/delete",{
            method:"delete",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(item)
        })
        .then(res=>{
            return res.json()
        })
        .then(result=>{
            console.log(result)
        })
    }



    const handleDelete=()=>{
        console.log(deleteData)
        deleteContact(deleteData)
        handleClose()
    }


    const handleOpen=(item)=>{
        setOpen(true)
        setDeleteData(item)
    }

    const handleClose=()=>{
        setOpen(false)
    }


    const classes=useStyles()
    return(
        <Container>
            <div className='section'>
                <Typography variant='h4' color='primary' className='heading'>Contacts</Typography>
                <Typography variant='h5' className='heading'>Here you can manage your contacts!</Typography>
            </div>
            
            <Card className='card'>
                <CardContent className='card-head'>
                    <Typography variant='h5'>Contacts</Typography>
                    <Button color='primary' variant='contained' href='/addContact'><Add className='icon'/>Add Contact</Button>
                </CardContent>
            </Card>

            <TableContainer component={Paper} className={classes.table}>
                <Table >
                    <TableHead>
                        <TableRow className='row'>
                            <TableCell align='center'>First Name</TableCell>
                            <TableCell align='center'>Last Name</TableCell>
                            <TableCell align='center'>Mail Id</TableCell>
                            <TableCell align='center'>Company Name</TableCell>
                            <TableCell align='center'>Contact Number</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item)=>(
                            <TableRow key={item._id} className='row tableRow'>
                                <TableCell align='center'>{item.firstName}</TableCell>
                                <TableCell align='center'>{item.lastName}</TableCell>
                                <TableCell align='center'>{item.email}</TableCell>
                                <TableCell align='center'>{item.company}</TableCell>
                                <TableCell align='center'>{item.Phone}</TableCell>
                                <TableCell align='center'>
                                    <Button startIcon={<Edit/>} variant='contained' color='primary'>Edit</Button>
                                    <Button startIcon={<Delete/>} variant='contained' color='secondary' className='deleteIcon' onClick={()=>handleOpen(item)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                        Delete Contact
                </DialogTitle>
                <DialogContent>
                    <DialogContentText><p>Are you sure? Do you want to delete the contact <span style={{fontWeight:'bolder'}}>{`${deleteData.firstName} ${deleteData.lastName}`}</span>?</p></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary' variant='contained'>Cancel</Button>
                    <Button onClick={handleDelete} color='secondary' variant='contained'>Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Contacts