import React, { useEffect, useState } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "../Signup.css"
function Signup() {
  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [umobNo, setMobNo] = useState("");
  const [upassword, setPassword] = useState("");
  const [errors, setErrors] = useState({});
 const[usernames,setUsername] = useState([])
  const [uId, setUserId] = useState(0);

  const navi = useNavigate();
  useEffect(()=>{
    axios
    .get("http://localhost:88/api/Users/Email")
    .then((result) => {setUsername(result.data)}).catch((err) => {
      console.log("Errpr", err);
    });

  },[usernames]);
  const handleValidations = () => {
    let errors = {};
    let formIsValid = true;   
    if(usernames.includes(uemail))
    {
        formIsValid = false;
        errors["email"] = "Email already present";
    }
    if (typeof uemail !== "undefined") {
      if (!uemail) {
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      }
    }
    if (typeof upassword !== "undefined") {
      if (!upassword) {
        formIsValid = false;
        errors["pass"] = "Cannot be empty";
      }
    }
    if (typeof uname !== "undefined") {
      if (!uname) {
        formIsValid = false;
        errors["uname"] = "Cannot be empty";
      } else if (!uname.match(/^[A-Za-z ]*$/)) {
        formIsValid = false;
        errors["uname"] = "Only letters";
      }
    }
    
    if (typeof umobNo !== "undefined") {
      if (!umobNo) {
        formIsValid = false;
        errors["umobNo"] = "Cannot be empty";
      } else if (!umobNo.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["umobNo"] = "Only numbers";
      } else if (umobNo.length !== 10) {
        formIsValid = false;
        errors["umobNo"] = "10 Digit number is required";
      }
    }
    setErrors(errors);
    return formIsValid;
  };
  function goToHome() {
    navi("/");
  }

  function doRegister() {
    if (handleValidations()) {
      const userData = {
        name: uname,
        email: uemail,
        mobileNo: umobNo,
        password: upassword,
      };
      console.log(userData);
      axios
        .post("http://localhost:88/api/Users/Register", userData)
        .then((result) => {
          console.log(result.data);
          navi("/basic/".concat(result.data.userId));
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }

  return (
    <div  style={{ backgroundColor: "lightblue",height:"100vh" }}>
      <Container style={{ width: "30%", paddingTop: "5%" }}>
        <div className="Sign-Model">
          <h1 className="text-center text-dark mb-3 pb-3">Sign Up </h1>
          <Form>
            <Form.Group>
              <Form.Label>
                <b>Full Name</b>
              </Form.Label>
              <Form.Control
                className="Scontrol"
                type="Text"
                placeholder="Enter Full Name"
                onChange={(e) => setName(e.target.value)}
              />

              <span style={{ color: "red" }}>{errors["uname"]}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label className="Slable">
                <b>E-mail</b>
              </Form.Label>
              <Form.Control
                className="Scontrol"
                type="Email"
                placeholder="Enter E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["email"]}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label className="Slable">
                <b>Mobile No</b>
              </Form.Label>
              <Form.Control
                className="Scontrol"
                type="Text"
                placeholder="Enter Mobile No"
                onChange={(e) => setMobNo(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["umobNo"]}</span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="Slable">
                <b>Password</b>
              </Form.Label>
              <Form.Control
                className="Scontrol"
                type="Password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["pass"]}</span>
            </Form.Group>
            <Row>
              <Col sm="6">
            <Button className="col-12 btn-success" onClick={doRegister}>
              Sign Up
            </Button>
            </Col>
            <Col>
            <Button className="col-12 btn-danger" onClick={goToHome}>
              Cancel
            </Button>
            </Col>
            </Row>
            <Row>
              <Button className="col-12 btn-dark mt-3" onClick={()=>{window.location="/login"}}>
                  Login
                </Button>
            </Row>
            
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
