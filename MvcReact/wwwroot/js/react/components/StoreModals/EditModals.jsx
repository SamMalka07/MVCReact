import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
import { fetchStoreById } from "../../utils/fetchHelpers.jsx";

const EditModal = (props) => {
  const { id, open, onClose, refreshList } = props;
  const [loading, setLoading] = useState(true);

  const [store, setStore] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

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

  async function fetchData() {
    await fetchStoreById(id)
      .then((response) => response.json())
      .then((data) => {
        setStore({
          ...store,
          Id: data.id,
          Name: data.name,
          Address: data.address,
        });
      })
      .finally(() => setLoading(false));
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(store),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch("/Store/Edit", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            onClose();
            refreshList();
          } else {
            onClose();
            refreshList();
          }
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
      <Modal.Header>Edit store</Modal.Header>
      {loading ? (
        <Modal.Content>Loading...</Modal.Content>
      ) : (
        <>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Name"
                  name="Name"
                  value={store.Name}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                {errors.Name && (
                  <span style={{ color: "red" }}>{errors.Name}</span>
                )}
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
            <Button
              color="green"
              icon
              labelPosition="right"
              onClick={handleSubmit}
            >
              edit
              <Icon name="check" />
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};

export default EditModal;
