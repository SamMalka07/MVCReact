import React, { useEffect, useState } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import AddModal from "../components/ProductModals/AddModal.jsx";
import EditModal from "../components/ProductModals/EditModal.jsx";
import DeleteModal from "../components/SharedModals/DeleteModal.jsx";
import { fetchProducts } from "../utils/fetchHelpers.jsx";

const Product = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchProductsfromUtils() {
    await fetchProducts()
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchProductsfromUtils();
  }, []);

  function refreshList() {
    fetchProductsfromUtils();
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Button primary onClick={() => setAddModal(true)}>
            New Product
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                <Table.HeaderCell width={5}>Price</Table.HeaderCell>
                <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.map((product, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>
                    ${parseFloat(product.price).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() => setEditingId(product.id)}
                    >
                      <Icon name="edit" /> EDIT
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      onClick={() => setDeletingId(product.id)}
                    >
                      <Icon name="trash" />
                      DELETE
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
              editingTable="Product"
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

export default Product;
