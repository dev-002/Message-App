import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversations } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    createConversations(selectedContactsIds);
    closeModal();
  }

  function handelCheckbox(id) {
    setSelectedContactsIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((allIds) => {
          return allIds !== id;
        });
      } else {
        return [...prevIds, id];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Iterate over all contacts as checkbox */}
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handelCheckbox(contact.id)}
              />
            </Form.Group>
          ))}

          <Button type="submit" className="mt-3">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
