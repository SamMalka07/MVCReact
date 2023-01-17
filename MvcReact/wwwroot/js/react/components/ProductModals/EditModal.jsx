import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
import { fetchProductById } from "../../utils/fetchHelpers.jsx";

const EditModal = (props) => {
  const { id, open, onClose, refreshList } = props;
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({ Name: "", Price: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  function validateForm() {
    const formErrors = {};
    if (!product.Name) {
      formErrors.Name = "Name is required";
    }

    if (!product.Price) {
      formErrors.Price = "Price is required";
    }

    if (product.Price < 0) {
      formErrors.Price = "Invalid input";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  async function fetchData() {
    await fetchProductById(id)
      .then((response) => response.json())
      .then((data) => {
        setProduct({
          ...product,
          Id: data.id,
          Name: data.name,
          Price: data.price,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...product,
      Price: parseFloat(product.Price).toFixed(2),
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch("/Product/Edit", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            //Could use toastr to show success message
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
      <Modal.Header>Edit product</Modal.Header>
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
                  value={product.Name}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                {errors.Name && (
                  <span style={{ color: "red" }}>{errors.Name}</span>
                )}
              </Form.Field>
              <Form.Field>
                <label>PRICE</label>
                <input
                  placeholder="Price"
                  name="Price"
                  type="number"
                  value={product.Price}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                {errors.Price && (
                  <span style={{ color: "red" }}>{errors.Price}</span>
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
