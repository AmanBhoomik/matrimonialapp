import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [uemail, setEmail] = useState("");
  const [upassword, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navi = useNavigate();
  const handleValidations = () => {
    let errors = {};
    let formIsValid = true;

    if (typeof uemail !== "undefined") {
      if (!uemail) {
        formIsValid = false;
        errors["email"] = "**Cannot be empty**";
      }
    }
    if (typeof upassword !== "undefined") {
      if (!upassword) {
        formIsValid = false;
        errors["pass"] = "**Cannot be empty**";
      }
    }
    setErrors(errors);
    return formIsValid;
  };
  function doSignIn() {
    if (handleValidations()) {
      const userData = {
        email: uemail,
        password: upassword,
      };

      console.log(userData);

      axios
        .post("http://localhost:88/api/Users/Authenticate", userData)
        .then((result) => {
          console.log(result.data);
          if(result.data==null || result.data=="")
          { setErrors({});
          setErrors({"pass": "**Enter Valid Credentials**"})
        }
      else
      {if(result.data.userId==1)
          window.location ="/Admindashboard"
        else
          goToHome(result.data.userId);}
        })
        .catch((err) => {
          setErrors({});
          setErrors({"pass": "**Enter Valid Credentionals**"})
          console.log("Error", err);
        });
    }
  }

  function goToHome(id) {
    navi(`/profiledetails/${id}`);
  }

  function goToSignUp() {
    navi("/register");
  }

  return (
    <div style={{ backgroundColor: "lightblue",height:"100vh" }}>
      <Container style={{ width: "30%", paddingTop: "5%" }}>
        <div className="Login-Model">
          <h1 className="text-center mb-3 pb-3 text-dark">Login Here </h1>
          <Form>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Enter Username
              </Form.Label>
              <Form.Control
                className="Fcontrol"
                type="Email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["email"]}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label className="Flable">Password</Form.Label>
              <Form.Control
                className="Fcontrol"
                type="Password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["pass"]}</span>
            </Form.Group>
            <Row>
            <span className="mt-3">
                  <a className="text-decoration-none">Forgot password?</a>
                </span>

            </Row>
            <Row>
              <Col sm="6">
                <Button className="mt-3 col-12 mb-3 btn-success" onClick={doSignIn}>
                  Login
                </Button>
              </Col>
              <Col sm="6">
              <Button className="col-12 mt-3 mb-3 btn-danger" onClick={()=>{window.location="/"}}>Cancel</Button>

              </Col>
            </Row>
          </Form>

          <div>
            <Row>
              <Button className="col-12 btn-dark" onClick={goToSignUp}>
                  Sign Up
                </Button>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
