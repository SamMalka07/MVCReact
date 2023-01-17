import React, { useEffect, useState } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import AddModal from "../components/SaleModals/AddModal.jsx";
import EditModal from "../components/SaleModals/EditModal.jsx";
import DeleteModal from "../components/SharedModals/DeleteModal.jsx";
import { format } from "date-fns";
import { fetchSales } from "../utils/fetchHelpers.jsx";

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchSalesFromUtils() {
    await fetchSales()
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchSalesFromUtils();
  }, []);

  function refreshList() {
    fetchSalesFromUtils();
  }

  function formatDate(dateTime) {
    return format(new Date(dateTime), "dd MMMM, yyyy");
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Button primary onClick={() => setAddModal(true)}>
            New Sale
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>Customer</Table.HeaderCell>
                <Table.HeaderCell width={3}>Product</Table.HeaderCell>
                <Table.HeaderCell width={3}>Store</Table.HeaderCell>
                <Table.HeaderCell width={3}>Date Sold</Table.HeaderCell>
                <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sales.map((sale, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{sale.customerName}</Table.Cell>
                  <Table.Cell>{sale.productName}</Table.Cell>
                  <Table.Cell>{sale.storeName}</Table.Cell>
                  <Table.Cell>{formatDate(sale.dateSold)}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() => setEditingId(sale.id)}
                    >
                      <Icon name="edit" /> Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="red" onClick={() => setDeletingId(sale.id)}>
                      <Icon name="trash" />
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Add Modal */}

          {addModal === true ? (
            <AddModal
              open={addModal !== false}
              onClose={() => setAddModal(false)}
              refreshList={refreshList}
            />
          ) : (
            <></>
          )}

          {/* Delete Modal */}
          {deletingId !== null ? (
            <DeleteModal
              open={deletingId !== null}
              id={deletingId}
              onClose={() => setDeletingId(null)}
              refreshList={refreshList}
              editingTable="Sale"
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

export default Sale;
