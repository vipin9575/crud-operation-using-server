import React from "react";
import { Container, Card } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegFrownOpen } from "react-icons/fa";

const ContactCard = (props) => {
  const { contactData, removeContact, setSelectedContact, handleShow } = props;

  const handleRemoveContact = (id) => {
    removeContact(id);
  };

  const renderContact = contactData.map((contact) => {
    return (
      <Card key={contact.name} className="my-3 bg-primary-subtle">
        <Card.Body className="d-flex align-items-center gap-4">
          <CgProfile size={60} />
          <div>
            <h4>{contact.name}</h4>
            <p className="mb-0">{contact.email}</p>
          </div>
          <div className="ms-auto">
            <FaRegEdit
              className="text-primary fs-2 me-3"
              onClick={() => {
                setSelectedContact(contact);
                handleShow();
              }}
            />
            <MdDeleteForever
              className="text-danger fs-2"
              onClick={() => handleRemoveContact(contact.id)}
            />
          </div>
        </Card.Body>
      </Card>
    );
  });
  return (
    <Container className="w-50">
      {contactData.length > 0 ? (
        renderContact
      ) : (
        <div className="d-flex flex-column align-items-center gap-3 justify-content-center mt-5">
          <code className="fs-2">
            {" "}
            <FaRegFrownOpen /> No contacts found
          </code>
          <pre>Please add a contact by clicking on the Add Contact button</pre>
        </div>
      )}
    </Container>
  );
};

export default ContactCard;
