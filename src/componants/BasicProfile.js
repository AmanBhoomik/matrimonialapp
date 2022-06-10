import React, { useState } from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function BasicProfile() {
  const { userId } = useParams();
  const setDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  };

  const navi = useNavigate();
  const [withFamily, setWithFamily] = useState(false);
  const [gender, setGender] = useState("Male");
  const [maritalstaus, setMaritalStatus] = useState("Unmarried");
  const [height, setHeight] = useState(0);
  const [pic, setProfilePic] = useState("");
  const [subCommunity, setSubComm] = useState("");
  const [cityt, setCity] = useState("");
  const [bDate, setBithDate] = useState(setDate());
  const [dietType, setDiet] = useState("Veg");
  const [errors, setErrors] = useState({});

  const handleValidation = async () => {
    let errors = {};
    let formIsValid = true;

    if (typeof bDate !== "undefined") {
      if (!bDate) {
        formIsValid = false;
        errors["bDate"] = "Cannot be empty";
      }
    }
    if (typeof height !== "undefined") {
      if (!height) {
        formIsValid = false;
        errors["height"] = "Cannot be empty";
      } else if (!height.match(/^[0-9.]*$/)) {
        formIsValid = false;
        errors["height"] = "Only numbers";
      }
    }
    if (typeof subCommunity !== "undefined") {
      if (!subCommunity) {
        formIsValid = false;
        errors["subCommunity"] = "Cannot be empty";
      }
    }
    if (typeof pic !== "undefined") {
      if (!pic) {
        formIsValid = false;
        errors["pic"] = "Cannot be empty";
      }
    }
    if (typeof cityt !== "undefined") {
      if (!cityt) {
        formIsValid = false;
        errors["cityt"] = "Cannot be empty";
      }
    }

    setErrors(errors);
    return await formIsValid;
  };
  function doProfileUpdate() {
    if (handleValidation()) {
      const formDate = new FormData();
      formDate.append("IsLiveWithFamily", withFamily);
      formDate.append("Gender", gender);
      formDate.append("height", height);
      formDate.append("UserId", userId);
      formDate.append("MaritalStatus", maritalstaus);
      formDate.append("Profile", pic);
      formDate.append("SubCommunity", subCommunity);
      formDate.append("City", cityt);
      formDate.append("Diet", dietType);
      formDate.append("BirthDate", bDate);
      for (var pair of formDate.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); 
    }
      axios
        .put("http://localhost:88/api/Users/UpdateBasicDetail", formDate)
        .then((result) => {
          console.log("Data", result.data);
          navi("/professional/".concat(userId));
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }

  function goToNext() {
    navi("/professional");
  }

  return (
    <div style={{ backgroundColor: "lightblue",height:"130vh" }}>
      <div>
        <Container style={{ width: "35%", paddingTop: "5%" }}>
          <div className="Sign-Model">
            <h3 className="mb-3 pb-3 text-center text-dark">
              Add Your Basic Details
            </h3>
            <Form>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Birth Date</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      type="Date"
                      name="dob"
                      max={setDate()}
                      required
                      value={bDate}
                      onChange={(e) => {
                        setBithDate(e.target.value);
                      }}
                    />
                    <span style={{ color: "red" }}>{errors["bDate"]}</span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4"></Col>
                  <Col>
                    <Form.Check
                      className="mb-3"
                      type="checkbox"
                      defaultChecked={withFamily}
                      label="Live with Family"
                      onChange={(e) => setWithFamily(!withFamily)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Gender</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Marital Status</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Select
                      className="mb-3"
                      value={maritalstaus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                      <option value="Unmarried">Unmarried</option>
                      <option value="Widow">Widow</option>
                      <option value="Divorced">Divorced</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Height</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      className="mb-3"
                      type="Text"
                      placeholder="Enter Height"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <span style={{ color: "red" }}>{errors["height"]}</span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Community</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      className="mb-3"
                      type="Text"
                      placeholder="Enter Community"
                      onChange={(e) => setSubComm(e.target.value)}
                    />
                    <span style={{ color: "red" }}>
                      {errors["subCommunity"]}
                    </span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">City</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      className="mb-3"
                      type="Text"
                      placeholder="Enter City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <span style={{ color: "red" }}>{errors["cityt"]}</span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Profile picture</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      className="mb-3"
                      type="file"
                      placeholder="Enter City"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                    <span style={{ color: "red" }}>{errors["pic"]}</span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Marital Status</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Select
                      className="mb-3"
                      value={dietType}
                      onChange={(e) => setDiet(e.target.value)}
                    >
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Button className="Sbutton" onClick={doProfileUpdate}>
                  NEXT
                </Button>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default BasicProfile;
