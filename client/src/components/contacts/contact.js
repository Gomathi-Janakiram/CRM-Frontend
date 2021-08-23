import { Typography,Container,Card,CardContent,Button,Table,TableBody,TableHead,TableCell,TableContainer,Paper, TableRow,makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {React,useState,useEffect }from 'react';
import './contact.css'


const useStyles=makeStyles({
    table:{
        marginTop:30,
        boxShadow:'none',
    }

})


const Contacts=()=>{

    const [data,setData]=useState([])

    useEffect(()=>{
        fetch('http://localhost:4000/contact')
        .then(res=>{
            return res.json()     
        })
        .then(data=>{
            setData(data)
        })
    },[])


    console.log(data)



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
                    <Button color='primary' variant='contained'><AddIcon className='icon'/>Add Contact</Button>
                </CardContent>
            </Card>

            <TableContainer component={Paper} className={classes.table}>
                <Table >
                    <TableHead>
                        <TableRow classname='row'>
                            <TableCell align='center'>First Name</TableCell>
                            <TableCell align='center'>Last Name</TableCell>
                            <TableCell align='center'>Mail Id</TableCell>
                            <TableCell align='center'>Company Name</TableCell>
                            <TableCell align='center'>Contact Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item)=>(
                            <TableRow key={item._id} classname='row'>
                                <TableCell align='center'>{item.firstName}</TableCell>
                                <TableCell align='center'>{item.lastName}</TableCell>
                                <TableCell align='center'>{item.email}</TableCell>
                                <TableCell align='center'>{item.company}</TableCell>
                                <TableCell align='center'>{item.Phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}

export default Contacts