import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import { Alert, Button, Card, Form, FormGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const handeSubmit = async (e) => {
    e.preventDefault();

    // this is a way from ways to make authentacation
    // const auth = getAuth();
    // await signInWithEmailAndPassword(
    //   auth,
    //   emailRef.current.value,
    //   passwordRef.current.value
    // )
    //   .then(() => {
    //     setError("");
    //     setLoading(true);
    //     navigate(redirectPath, { replace: true });
    //   })
    //   .catch(() => {
    //     setError("Faild to login");
    //   });

    try {
      setError("");
      setLoading(true);
      // @ts-ignore
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, { replace: true });
    } catch {
      setError("username or password incorrect");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
            <Button
              className="w-100 my-3"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to={"/forget-password"}>Forget Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Do not have an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
