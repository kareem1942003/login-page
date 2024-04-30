import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import auth from "../firebase";

const Dashboard = () => {
  const { currentUser, removeUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handelLogout = async () => {
    setError("");
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setError(`Faild to signout or ${err.code}`);
      });
    // try {
    //   await logout();
    //   navigate("/login");
    // } catch {
    //   setError("Faild to log out");
    // }
  };
  const handelRemoveUser = async () => {
    try {
      await removeUser();
      navigate("/login");
    } catch {
      setError("Faild to remove profile");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {auth.currentUser.emailVerified ? null : (
            <Alert variant="danger">
              Please check your inbox to vreify email
            </Alert>
          )}
          <p>
            <strong>Email:</strong> {currentUser && currentUser.email}
          </p>
          <div className="w-100 d-flex gap-2 align-items-center justify-content-center">
            <Link className="w-50 text-center" to={"/update-profile"}>
              <Button className=" w-100 btn btn-primary">Update Profile</Button>
            </Link>
            <Button className="w-50 text-center" onClick={handelRemoveUser}>
              Delete Profile
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button onClick={handelLogout} className="btn btn-primary">
          Log out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
