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
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Add, Delete, Edit } from "@material-ui/icons";
import { React, useState, useEffect } from "react";
import "./contact.css";

const useStyles = makeStyles({
  table: {
    marginTop: 30,
    boxShadow: "none",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Contacts = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [data, setData] = useState([]);

  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getData = () => {
    fetch("http://localhost:4000/contact")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
        setDeleteOpen(true);
        getData();
      });
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const editContact = (data) => {
    fetch("http://localhost:4000/contact/edit", {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setEditOpen(true);
        getData();
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editContact(editData);
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
              Edit Contact
            </Typography>
            <form>
              <TextField
                label="First Name"
                variant="outlined"
                className="fields"
                value={editData.firstName}
                onChange={(e) =>
                  setEditData({ ...editData, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                variant="outlined"
                className="fields"
                value={editData.lastName}
                onChange={(e) =>
                  setEditData({ ...editData, lastName: e.target.value })
                }
              />
              <TextField
                label="Email Id"
                variant="outlined"
                className="fields"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
              <TextField
                label="Company"
                variant="outlined"
                className="fields"
                value={editData.company}
                onChange={(e) =>
                  setEditData({ ...editData, company: e.target.value })
                }
              />
              <TextField
                label="Contact Number"
                variant="outlined"
                className="fields"
                value={editData.Phone}
                onChange={(e) =>
                  setEditData({ ...editData, Phone: e.target.value })
                }
              />
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Snackbar open={editOpen} onCLose={() => setEditOpen(false)}>
        <Alert
          open={editOpen}
          onClose={() => setEditOpen(false)}
          severity="success"
        >
          Updated Contact Successfully
        </Alert>
      </Snackbar>

      <Snackbar open={deleteOpen} onCLose={() => setDeleteOpen(false)}>
        <Alert
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          severity="error"
        >
          Contact Deleted Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contacts;
