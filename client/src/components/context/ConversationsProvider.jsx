import React, { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  function createConversations(recipients) {
    setConversations((prevValues) => {
      return [...prevValues, { recipients, messages: [] }];
    });
  }

  const addMessageToConversatino = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        let newMessage = { sender, text };

        const newConversations = prevConversations.map((conversation) => {
          console.log(conversation);
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          // when a unkown person starts a new conversation with you or in a group
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversatino);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversatino]);

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversatino({ recipients, text, sender: id });
  }

  // Formatted Conversations
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name: name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return {
        ...message,
        senderName: name,
        fromMe,
      };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversations: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectedConversationIndex: setSelectedConversationIndex,
    createConversations,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

// Checking if 2 Array Equal
function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
}
