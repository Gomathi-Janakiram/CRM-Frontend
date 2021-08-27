import React, { useState } from "react";
import { TextField, Typography, Paper, Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import "./contact.css";

const AddContact = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    Phone: "",
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    postData(data);
  };

  const postData = (data) => {
    fetch("http://localhost:4000/contact", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        return result.json();
      })
      .then(() => {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          Phone: "",
        });
      });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="container">
      <Paper>
        <Typography variant="h4" color="primary" className="heading">
          Create New Contact
        </Typography>
        <form
          className="form-wrapper"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="First Name"
            variant="outlined"
            className="fields"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <TextField
            label="Last name"
            variant="outlined"
            className="fields"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
          <TextField
            label="Email Id"
            variant="outlined"
            className="fields"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            label="Company"
            variant="outlined"
            className="fields"
            value={data.company}
            onChange={(e) => setData({ ...data, company: e.target.value })}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            className="fields"
            value={data.Phone}
            onChange={(e) => setData({ ...data, Phone: e.target.value })}
          />
          <button
            type="submit"
            className="create-btn"
            onClick={() => setOpen(true)}
          >
            Create
          </button>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)}>Contact Saved Successfully</Alert>
      </Snackbar>
    </div>
  );
};

export default AddContact;
