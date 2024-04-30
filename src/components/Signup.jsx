import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Alert, Button, Card, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, emailVerify } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();
  const handeSubmit = async (e) => {
    e.preventDefault();
    // @ts-ignore
    if (passwordRef.current.value != passwordConfirmationRef.current.value) {
      return setError("Password not match");
    }
    try {
      setError("");
      setLoading(true);
      // @ts-ignore
      await signup(emailRef.current.value, passwordRef.current.value);
      await emailVerify();
      navigate("/");
    } catch {
      setError("Faild to create an account");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handeSubmit}>
            <FormGroup>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control ref={emailRef} type="email" id="email" required />
            </FormGroup>
            <FormGroup>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" id="password" />
            </FormGroup>
            <FormGroup>
              <Form.Label htmlFor="password-confirmation">
                Password Confirmation
              </Form.Label>
              <Form.Control
                ref={passwordConfirmationRef}
                type="password"
                id="password-confirmation"
              />
            </FormGroup>
            <Button
              className="w-100 my-3"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Log In</Link>
      </div>
    </>
  );
};

export default Signup;
