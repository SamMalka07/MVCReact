import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const DeleteModal = (props) => {
  const { id, open, onClose, editingTable, refreshList } = props;

  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/${editingTable}/Delete/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          onClose();
          refreshList();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      size="tiny"
      open={open}
      onClose={onClose}
      as={Form}
      onSubmit={(e) => handleSubmit(e)}
      className="delete-modal"
    >
      <Modal.Header>Delete {editingTable.toLowerCase()}</Modal.Header>

      <Modal.Content>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Are you Sure?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" icon labelPosition="right" onClick={handleSubmit}>
          delete
          <Icon name="cancel" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
