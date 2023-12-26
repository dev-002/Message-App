import React from "react";
import Sidebar from "./Sidebar";
import OpenConversations from "./OpenConversations";
import { useConversations } from "./context/ConversationsProvider";

const Dashboard = ({ id }) => {
  const { selectedConversations } = useConversations();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversations && <OpenConversations />}
    </div>
  );
};

export default Dashboard;
