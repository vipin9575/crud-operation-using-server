import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddContact = ({
  show,
  handleClose,
  addContact,
  editContact,
  selectedContact,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (selectedContact) {
      setValue("name", selectedContact.name);
      setValue("email", selectedContact.email);
    } else {
      reset();
    }
  }, [selectedContact, setValue, reset]);

  const onSubmit = (data) => {
    if (selectedContact) {
      editContact({ ...selectedContact, ...data });
    } else {
      addContact(data);
    }
    reset();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedContact ? "Edit Contact" : "Add Contact"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register("name", { required: "Name is required" })}
            />
            {/* Validation Error Message for Name */}
            {errors.name && (
              <Form.Text className="text-danger">
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>

          {/* Email Input */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {/* Validation Error Message for Email */}
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>

          {/* Submit Button */}
          <Button variant="success" type="submit">
            {selectedContact ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddContact;
