import React from "react";
import { useContacts } from "./context/ContactsProvider";
import { ListGroup } from "react-bootstrap";

const Contacts = () => {
  const { contacts } = useContacts();

  return (
    <>
      <ListGroup variant="flush">
        {contacts &&
          contacts.map((contact) => {
            return (
              <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
};

export default Contacts;
