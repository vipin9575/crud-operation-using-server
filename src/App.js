import { useState, useEffect } from "react";
import ContactCard from "./components/ContactCard";
import Headers from "./components/Headers";
import { v4 as uuidv4 } from "uuid";
import api from "./api/contact.js";

function App() {
  const [show, setShow] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const retrieveContacts = async () => {
    setLoading(true);
    const response = await api.get("/contacts");
    if (response.status === 200) setLoading(false);
    return response.data;
  };

  const addContact = async (contact) => {
    setLoading(true);
    const payload = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", payload);
    if(response.status === 201) setLoading(false);
    setContactData((prevContacts) => [...prevContacts, response.data]);
  };

  const editContact = async (contact) => {
    setLoading(true);
    const response = await api.put(`/contacts/${contact.id}`, contact);
    if(response.status === 200) setLoading(false);
    setContactData((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === response.data.id ? response.data : contact
      )
    );
  };

  const removeContact = async (id) => {
    setLoading(true);
    await api.delete(`/contacts/${id}`).then((response) => {
      setLoading(false);
    });
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
        loading={loading}
      />
    </div>
  );
}

export default App;
