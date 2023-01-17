import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon, Dropdown, Item } from "semantic-ui-react";
import {
  fetchCustomers,
  fetchProducts,
  fetchSaleById,
  fetchStores,
} from "../../utils/fetchHelpers.jsx";
import { format } from "date-fns";

const EditModal = (props) => {
  const { open, onClose, refreshList, id } = props;

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState({});

  const [selectedDate, setSelectedDate] = useState();

  const [errors, setErrors] = useState({});

  function clearInputs() {
    setCustomers({ Name: "", Address: "" });
  }

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

  async function fetchSalesByIDFromUtils() {
    await fetchSaleById(id)
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
      });
  }

  useEffect(() => {
    fetchCustomersFromUtils();
    fetchProductsFromUtils();
    fetchStoresFromUtils();
    fetchSalesByIDFromUtils();
  }, []);

  function formatDate(dateTime) {
    return format(new Date(dateTime), "yyyy-MM-dd");
  }

  useEffect(() => {
    if (products.length > 0 && stores.length > 0 && customers.length > 0) {
      setLoading(false);
    }
  }, [products, customers, stores]);

  useEffect(() => {
    if (Object.keys(sales).length > 0) {
      setSelectedDate(formatDate(sales.dateSold));
    }
  }, [sales]);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sales),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/Sale/Edit", options)
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
                      onChange={(e) =>
                        setSales({ ...sales, dateSold: e.target.value })
                      }
                    />
                  </div>
                </div>
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <select
                  name="customer"
                  className="ui dropdown"
                  id="select"
                  onChange={(e) =>
                    setSales({ ...sales, customerId: e.target.value })
                  }
                >
                  {customers.map((item, index) => {
                    if (item.id === sales.customerId) {
                      return (
                        <option key={index} value={`${item.id}`} selected>
                          {item.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={`${item.id}`}>
                          {item.name}
                        </option>
                      );
                    }
                  })}
                  ;
                </select>
              </Form.Field>

              <Form.Field>
                <label>Product</label>
                <select
                  name="customer"
                  className="ui dropdown"
                  id="select"
                  onChange={(e) =>
                    setSales({ ...sales, productId: e.target.value })
                  }
                >
                  {products.map((item, index) => {
                    if (item.id === sales.productId) {
                      return (
                        <option key={index} value={`${item.id}`} selected>
                          {item.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={`${item.id}`}>
                          {item.name}
                        </option>
                      );
                    }
                  })}
                  ;
                </select>
              </Form.Field>

              <Form.Field>
                <label>Store</label>
                <select
                  name="customer"
                  className="ui dropdown"
                  id="select"
                  onChange={(e) =>
                    setSales({ ...sales, storeId: e.target.value })
                  }
                >
                  {stores.map((item, index) => {
                    if (item.id === sales.storeId) {
                      return (
                        <option key={index} value={`${item.id}`} selected>
                          {item.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={`${item.id}`}>
                          {item.name}
                        </option>
                      );
                    }
                  })}
                  ;
                </select>
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
