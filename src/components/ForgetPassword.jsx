import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import { Alert, Button, Card, Form, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef();

  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // @ts-ignore
      await resetPassword(emailRef.current.value);
      setMessage("check your inbox in email to get new password");
    } catch {
      setError("Faild to reset password");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handeSubmit}>
            <FormGroup>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} />
            </FormGroup>

            <Button
              className="w-100 my-3"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Reset
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to={"/login"}>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Do not have an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  );
};

export default ForgetPassword;
