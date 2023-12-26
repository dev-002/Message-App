import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";

import Converstations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./Modal/NewConversationModal";
import NewContactModal from "./Modal/NewContactModal";

const CONVERSTATION_KEY = "converstations";
const CONTACT_KEY = "contacts";

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSTATION_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationOpen = activeKey === "converstations";

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        {/* NavBar */}
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSTATION_KEY}>Converstations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Content */}
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSTATION_KEY}>
            <Converstations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACT_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>

        {/* Displaying ID */}
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>

        {/* Buttons */}
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>
          New {conversationOpen ? "Converstation" : "Contact"}
        </Button>
      </Tab.Container>

      {/* Modals */}
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
