import React from "react";
import { useConversations } from "./context/ConversationsProvider";
import { ListGroup } from "react-bootstrap";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <>
      <ListGroup variant="flush">
        {conversations &&
          conversations.map((conversation, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => selectConversationIndex(index)}
              active={conversation.selected}
            >
              {conversation.recipients.map((r) => r.name).join(", ")}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default Conversations;
