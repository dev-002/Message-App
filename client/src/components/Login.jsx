import React, { useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button, Container, Form } from "react-bootstrap";

const Login = ({ onIdSubmit }) => {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  };

  const handleNewId = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Enter your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2">
          Login
        </Button>
        <Button variant="secondary" onClick={() => handleNewId()}>
          Create a new Id
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
