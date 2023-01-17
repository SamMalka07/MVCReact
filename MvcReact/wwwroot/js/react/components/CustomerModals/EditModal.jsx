import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
import { fetchCustomerById } from "../../utils/fetchHelpers.jsx";

const EditModal = (props) => {
  const { id, open, onClose, refreshList } = props;
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState();
  const [errors, setErrors] = useState({});

  function validateForm() {
    const formErrors = {};
    if (!customer.Name) {
      formErrors.Name = "Name is required";
    }
    if (!customer.Address) {
      formErrors.Address = "Address is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  async function fetchData() {
    await fetchCustomerById(id)
      .then((response) => response.json())
      .then((data) => {
        setCustomer({
          ...customer,
          Id: data.id,
          Name: data.name,
          Address: data.address,
        });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch("/Customer/Edit", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            //Could use toastr to show the success message
          } else {
            //Could use toastr to show error message
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
      <Modal.Header>Edit customer</Modal.Header>
      {loading ? (
        <Modal.Content>Loading...</Modal.Content>
      ) : (
        <>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>NAME</label>
                <input
                  placeholder="Name"
                  name="Name"
                  value={customer.Name}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                {errors.Name && (
                  <span style={{ color: "red" }}>{errors.Name}</span>
                )}
              </Form.Field>
              <Form.Field>
                <label>ADDRESS</label>
                <input
                  placeholder="Address"
                  name="Address"
                  value={customer.Address}
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
