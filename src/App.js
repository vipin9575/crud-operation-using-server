import { useState, useEffect } from "react";
import ContactCard from "./components/ContactCard";
import Headers from "./components/Headers";
import { v4 as uuidv4 } from "uuid";
import api from "./api/contact.js";

function App() {
  const [show, setShow] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContact = async (contact) => {
    const payload = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", payload);
    setContactData((prevContacts) => [...prevContacts, response.data]);
  };

  const editContact = async (contact) => {
    console.log(contact);
    const response = await api.put(`/contacts/${contact.id}`, contact);
    setContactData((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === response.data.id ? response.data : contact
      )
    );
  };

  const removeContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContactData((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContactData(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div>
      <Headers
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        addContact={addContact}
        editContact={editContact}
        selectedContact={selectedContact}
      />
      <ContactCard
        contactData={contactData}
        removeContact={removeContact}
        setSelectedContact={setSelectedContact}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
