import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert, Button, Card, Form, FormGroup } from "react-bootstrap";
import { useRef, useState } from "react";
// import auth from "../firebase";

const UpdateProfile = () => {
  const { currentUser, updateUserPassword } = useAuth();
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
      await updateUserPassword(passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Faild to chenge password pleas recent login");
    }
    setLoading(false);

    // const auth = getAuth();
    // const user = auth.currentUser;
    // // @ts-ignore
    // const newPassword = passwordRef.current.value;
    // // @ts-ignore
    // const newEmail = emailRef.current.value;
    // await updatePassword(user, newPassword)
    //   .then(() => {
    //     setLoading(false);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     setError(error.code);
    //   });

    // const promises = [];
    // setLoading(true);
    // setError("");
    // // @ts-ignore
    // if (emailRef.current.value !== currentUser.email) {
    //   // @ts-ignore
    //   promises.push(updateUserEmail(emailRef.current.value));
    // }
    // // @ts-ignore
    // if (passwordRef.current.value) {
    //   // @ts-ignore
    //   promises.push(updateUserPassword(passwordRef.current.value));
    // }
    // Promise.all(promises)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     // console.log(auth.currentUser.emailVerified);
    //     setError(`Faild to update account or ${err.code}`);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handeSubmit}>
            <FormGroup>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                id="email"
                required
                defaultValue={currentUser?.email}
                disabled
              />
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
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to={"/"}>Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
