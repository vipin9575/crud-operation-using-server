import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import AddContact from "./AddContact";

const Headers = ({
  addContact,
  show,
  handleClose,
  handleShow,
  editContact,
  selectedContact,
}) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      <Navbar className="bg-body-tertiary shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold fs-3">Contact Manager</Navbar.Brand>
          <Button variant="dark ms-auto" onClick={handleShow}>
            Add Contact
          </Button>
        </Container>
      </Navbar>
      <AddContact
        show={show}
        handleClose={handleClose}
        addContact={addContact}
        editContact={editContact}
        selectedContact={selectedContact}
      />
    </>
  );
};

export default Headers;
