import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const AddModal = (props) => {
  const { open, onClose, refreshList } = props;

  const [store, setStore] = useState({ Name: "", Address: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  function clearInputs() {
    setStore({ Name: "", Address: "" });
  }

  function validateForm() {
    const formErrors = {};
    if (!store.Name) {
      formErrors.Name = "Name is required";
    }
    if (!store.Address) {
      formErrors.Address = "Address is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(store),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch("/Store/Create", options)
        .then((response) => response.json())
        .then((data) => {
          clearInputs();
          if (data.status === "success") {
            //Could use toastr to show the success message
          } else {
            //Could use toastr to show the error message
          }
          onClose();
          refreshList();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Modal
      size="small"
      open={open}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Modal.Header>Create store</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder="Name"
              name="Name"
              value={store.Name}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.Name && <span style={{ color: "red" }}>{errors.Name}</span>}
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Address"
              name="Address"
              value={store.Address}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.Address && (
              <span style={{ color: "red" }}>{errors.Address}</span>
            )}
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          cancel
        </Button>

        <Button color="green" icon labelPosition="right" onClick={handleSubmit}>
          create
          <Icon name="check" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddModal;
