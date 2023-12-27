import React, { useState, useCallback } from "react";
import { useConversations } from "./context/ConversationsProvider";
import { Button, Form, InputGroup } from "react-bootstrap";

const OpenConversations = () => {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);
  const { sendMessage, selectedConversations } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversations.recipients.map((r) => r.id),
      text
    );
  }

  return (
    <>
      <div className="d-flex flex-column flex-grow-1">
        {/* Conversation Text */}
        <div className="flex-grow-1 overflow-auto">
          <div className="d-flex flex-column align-items-start justify-content-end px-3">
            {selectedConversations.messages.map((message, index) => {
              const lastMessage =
                selectedConversations.messages.length - 1 === index;
              return (
                <div
                  ref={lastMessage ? setRef : null}
                  className={`my-1 d-flex flex-column ${
                    message.fromMe
                      ? "align-self-end align-items-end"
                      : "align-items-start"
                  }`}
                  key={index}
                >
                  <div
                    className={`rounded px-2 py-1 ${
                      message.fromMe ? "bg-primary text-white" : "border"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-muted small ${
                      message.fromMe ? "text-right" : ""
                    }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ height: "75px", resize: "none" }}
              />
              <InputGroup.Text>
                <Button type="submit">Send</Button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default OpenConversations;
