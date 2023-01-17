import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon, Dropdown } from "semantic-ui-react";
import {
  fetchCustomers,
  fetchProducts,
  fetchStores,
} from "../../utils/fetchHelpers.jsx";

const AddModal = (props) => {
  const { open, onClose, refreshList } = props;

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedStore, setSelectedStore] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  function clearInputs() {
    setCustomers({ Name: "", Address: "" });
  }

  const validateForm = () => {
    const formErrors = {};
    if (selectedCustomer === undefined) {
      formErrors.customer = "Cusotmer is required";
    }
    if (selectedProduct === undefined) {
      formErrors.product = "Product is required";
    }
    if (selectedStore === undefined) {
      formErrors.store = "Store is required";
    }
    if (selectedDate === undefined) {
      formErrors.date = "Date is required";
    }
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  async function fetchCustomersFromUtils() {
    await fetchCustomers()
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      });
  }

  async function fetchStoresFromUtils() {
    await fetchStores()
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      });
  }

  async function fetchProductsFromUtils() {
    await fetchProducts()
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }

  useEffect(() => {
    fetchCustomersFromUtils();
    fetchProductsFromUtils();
    fetchStoresFromUtils();
  }, []);

  useEffect(() => {
    if (products.length > 0 && stores.length > 0 && customers.length > 0) {
      setLoading(false);
    }
  }, [products, customers, stores]);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      DateSold: selectedDate,
      CustomerId: selectedCustomer,
      StoreId: selectedStore,
      ProductId: selectedProduct,
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch("/Sale/Create", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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
      <Modal.Header>Create sales</Modal.Header>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Date Sold</label>
                <div className="ui calendar" id="example1">
                  <div className="ui input left icon">
                    <i className="calendar icon"></i>
                    <input
                      type="date"
                      placeholder="Date"
                      value={selectedDate || ""}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      onBlur={validateForm}
                    />
                  </div>
                  {errors.date && (
                    <span style={{ color: "red" }}>{errors.date}</span>
                  )}
                </div>
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <select
                  name="customer"
                  className="ui dropdown"
                  id="select"
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  onBlur={validateForm}
                >
                  <option value="">Select Customer</option>
                  {customers.map((item, index) => (
                    <option key={index} value={`${item.id}`}>
                      {item.name}
                    </option>
                  ))}
                  ;
                </select>
                {errors.customer && (
                  <span style={{ color: "red" }}>{errors.customer}</span>
                )}
              </Form.Field>

              <Form.Field>
                <label>Product</label>
                <select
                  name="customer"
                  className="ui dropdown"
                  id="select"
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  onBlur={validateForm}
                >
                  <option value="">Select Product</option>
                  {products.map((item, index) => (
                    <option key={index} value={`${item.id}`}>
                      {item.name}
                    </option>
                  ))}
                  ;
                </select>
                {errors.product && (
                  <span style={{ color: "red" }}>{errors.product}</span>
                )}
              </Form.Field>

              <Form.Field>
                <label>Store</label>
                <select
                  name="customer"
                  className="ui dropdown"
                  id="select"
                  onChange={(e) => setSelectedStore(e.target.value)}
                  onBlur={validateForm}
                >
                  <option value="">Select Store</option>
                  {stores.map((item, index) => (
                    <option key={index} value={`${item.id}`}>
                      {item.name}
                    </option>
                  ))}
                  ;
                </select>
                {errors.store && (
                  <span style={{ color: "red" }}>{errors.store}</span>
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
              create
              <Icon name="check" />
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};

export default AddModal;
