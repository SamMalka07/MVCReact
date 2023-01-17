import React, { useEffect, useState } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import AddModal from "../components/CustomerModals/AddModal.jsx";
import EditModal from "../components/CustomerModals/EditModal.jsx";
import DeleteModal from "../components/SharedModals/DeleteModal.jsx";
import { fetchCustomers } from "../utils/fetchHelpers.jsx";

const Customer = () => {
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchCustomersFromUtils() {
    await fetchCustomers()
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchCustomersFromUtils();
  }, []);

  function refreshList() {
    fetchCustomersFromUtils();
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Button primary onClick={() => setAddModal(true)}>
            New Customer
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                <Table.HeaderCell width={5}>Address</Table.HeaderCell>
                <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {customers.map((customer, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>{customer.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() => setEditingId(customer.id)}
                    >
                      <Icon name="edit" /> EDIT
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      onClick={() => setDeletingId(customer.id)}
                    >
                      <Icon name="trash" />
                      DELETE
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Add Modal */}

          <AddModal
            open={addModal !== false}
            onClose={() => setAddModal(false)}
            refreshList={refreshList}
          />

          {/* Delete Modal */}
          {deletingId !== null ? (
            <DeleteModal
              open={deletingId !== null}
              id={deletingId}
              onClose={() => setDeletingId(null)}
              refreshList={refreshList}
              editingTable="Customer"
            />
          ) : (
            <></>
          )}

          {/* Edid Modal */}
          {editingId !== null ? (
            <EditModal
              open={editingId !== null}
              id={editingId}
              onClose={() => setEditingId(null)}
              refreshList={refreshList}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Customer;
