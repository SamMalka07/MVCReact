import React, { useEffect, useState } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import AddModal from "../components/StoreModals/AddModal.jsx";
import EditModal from "../components/StoreModals/EditModals.jsx";
import DeleteModal from "../components/SharedModals/DeleteModal.jsx";
import { fetchStores } from "../utils/fetchHelpers.jsx";

const Store = () => {
  const [stores, setStores] = useState();
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchStoreFromUtils() {
    await fetchStores()
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchStoreFromUtils();
  }, []);

  function refreshList() {
    fetchStoreFromUtils();
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Button primary onClick={() => setAddModal(true)}>
            New Store
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
              {stores.map((store, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{store.name}</Table.Cell>
                  <Table.Cell>{store.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() => setEditingId(store.id)}
                    >
                      <Icon name="edit" /> Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="red" onClick={() => setDeletingId(store.id)}>
                      <Icon name="trash" />
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

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
              editingTable="Store"
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

export default Store;
