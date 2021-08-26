import {
  Typography,
  TextField,
  Container,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { React, useState, useEffect } from "react";
import "./contact.css";

const useStyles = makeStyles({
  table: {
    marginTop: 30,
    boxShadow: "none",
  },
});

const Contacts = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [data, setData] = useState([]);

  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/contact")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  });

  const deleteContact = (item) => {
    fetch("http://localhost:4000/contact/delete", {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        handleDeleteClose();
      });
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const classes = useStyles();
  return (
    <Container>
      <div className="section">
        <Typography variant="h4" color="primary" className="heading">
          Contacts
        </Typography>
        <Typography variant="h5" className="heading">
          Here you can manage your contacts!
        </Typography>
      </div>

      <Card className="card">
        <CardContent className="card-head">
          <Typography variant="h5">Contacts</Typography>
          <Button color="primary" variant="contained" href="/addContact">
            <Add className="icon" />
            Add Contact
          </Button>
        </CardContent>
      </Card>

      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow className="row">
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Mail Id</TableCell>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item._id} className="row tableRow">
                  <TableCell align="center">{item.firstName}</TableCell>
                  <TableCell align="center">{item.lastName}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.company}</TableCell>
                  <TableCell align="center">{item.Phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      startIcon={<Edit />}
                      variant="contained"
                      color="primary"
                      onClick={() => (setEditModal(true), setEditData(item))}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<Delete />}
                      variant="contained"
                      color="secondary"
                      className="deleteIcon"
                      onClick={() => (
                        setDeleteModal(true), setDeleteData(item)
                      )}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteModal} onClose={handleDeleteClose}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Are you sure? Do you want to delete the contact{" "}
              <span
                style={{ fontWeight: "bolder" }}
              >{`${deleteData.firstName} ${deleteData.lastName}`}</span>
              ?
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteContact(deleteData)}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editModal} onClose={handleEditClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h4" color="primary" className="heading">
              Create New Contact
            </Typography>
            <form>
              <TextField></TextField>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contacts;
