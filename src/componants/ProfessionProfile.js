import React, { useState } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProfessionProfile() {
  const navi = useNavigate();

  const { userId } = useParams();

  const [highQualification, setHighQuali] = useState("");
  const [highQualificationCollege, setHighCollege] = useState("");

  const [workType, setWrkType] = useState("Employee");
  const [workCompany, setWrkCompany] = useState(0);
  const [workDesignation, setWrkDesignation] = useState(0);

  const [incomeType, setInType] = useState("Monthly");
  const [incomeRange, setIncomeRange] = useState("20000-50000");

  const [uId, setUid] = useState(0);
  const [errors, setErrors] = useState({});

  const handleValidation = async () => {
        
    let errors = {};
    let formIsValid = true;

    if (typeof highQualification !== "undefined") {
        if (!highQualification) {
            formIsValid = false;
            errors["highQualification"] = "Cannot be empty";
          }    
    }
    if (typeof highQualificationCollege !== "undefined") {
        if (!highQualificationCollege) {
            formIsValid = false;
            errors["highQualificationCollege"] = "Cannot be empty";
          }    
    }
    if (typeof workCompany !== "undefined") {
        if (!workCompany) {
            formIsValid = false;
            errors["workCompany"] = "Cannot be empty";
          }    
    }
    if (typeof workDesignation !== "undefined") {
        if (!workDesignation) {
            formIsValid = false;
            errors["workDesignation"] = "Cannot be empty";
          }    
    }
    setErrors(errors);
    return await formIsValid;
  }

  function doProfileUpdate() {
    if(handleValidation())
    {
    const userData = {
      userId: 2,
      highestQualification: highQualification,
      highestQualificationCollege: highQualificationCollege,
      workType: workType,
      workDesignation: workDesignation,
      workCompany: workCompany,
      incomeType: incomeType,
      incomeRange: incomeRange,
      userId: userId,
    };

    axios
      .put("http://localhost:88/api/Users/UpdateProfessionalDetail", userData)
      .then((result) => {
        console.log(result.data);
        navi("/");
      })

      .catch((err) => {
        console.log("Error", err);
      });
    }
  }

  return (
    <div  style={{ backgroundColor: "lightblue",height:"100vh" }}>
      <Container style={{ width: "35%", paddingTop: "5%" }}>
        <div className="Sign-Model">
        <h3 className="mb-3 pb-3 text-center text-dark">Add Your Professional Details</h3>
          <Form>
          <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Qualification</Form.Label>
                  </Col>
                  <Col sm="8">
            <Form.Control
              className="Scontrol"
              type="Text"
              placeholder="Enter Qualification"
              onChange={(e) => setHighQuali(e.target.value)}
            />
            <span style={{ color: "red" }}>{errors["highQualification"]}</span>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">College</Form.Label>
                  </Col>
                  <Col sm="8">
            <Form.Control
              className="Scontrol"
              type="Text"
              placeholder="Enter College"
              onChange={(e) => setHighCollege(e.target.value)}
            />
            <span style={{ color: "red" }}>{errors["highQualificationCollege"]}</span>

            </Col>
            </Row>
        </Form.Group>
        <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Work Type</Form.Label>
                  </Col>
                  <Col sm="8">
            <Form.Select
              className="Scontrol"
              value={workType}
              onChange={(e) => setWrkType(e.target.value)}
            >
              <option value="Employee">Employee</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Business">Business</option>
            </Form.Select>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Company</Form.Label>
                  </Col>
                  <Col sm="8">
            <Form.Control
              className="Scontrol"
              type="Text"
              placeholder="Enter Work Company"
              onChange={(e) => setWrkCompany(e.target.value)}
            />
                        <span style={{ color: "red" }}>{errors["workCompany"]}</span>

</Col>
</Row>
</Form.Group>
<Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Designation</Form.Label>
                  </Col>
                  <Col sm="8">

            <Form.Control
              className="Scontrol"
              type="Text"
              placeholder="Enter Work Designation"
              onChange={(e) => setWrkDesignation(e.target.value)}
            />
                        <span style={{ color: "red" }}>{errors["workDesignation"]}</span>

            </Col>
            </Row>
            </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Income Type</Form.Label>
                  </Col>
                  <Col sm="8">

            <Form.Select
              className="Scontrol"
              value={incomeType}
              onChange={(e) => setInType(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </Form.Select>
</Col>
</Row>
</Form.Group>
<Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Income</Form.Label>
                  </Col>
                  <Col sm="8">
            <Form.Select
              className="Scontrol"
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value)}
            >
              <option value="20000-50000">20000-50000</option>
              <option value="50000-70000">50000-70000</option>
              <option value="70000-90000">70000-90000</option>
              <option value="100000-500000">100000-500000</option>
              <option value="500000-1000000">500000-1000000</option>
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
  );
}

export default ProfessionProfile;
