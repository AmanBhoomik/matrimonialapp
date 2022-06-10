import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfiliList() {
  const [profilesDdta, setProfilesDdta] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:88/api/Users/All")
      .then((result) => {
        console.log(result.data);
        setProfilesDdta(result.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div>
      <Row>
        {profilesDdta.map((profile) => {
          return (
            <Col key={profile.userId} sm={12} md={4} lg={3}>
              <Card style={{ width: "22rem" }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Name :{profile.name}</Card.Title>
                  <Card.Text>Email :{profile.email}</Card.Text>
                  <Card.Text>Mob :{profile.mobileNo}</Card.Text>
                  <Card.Text>Height :{profile.height}</Card.Text>
                  <Card.Text>City :{profile.city}</Card.Text>
                  <Card.Text>Marital Status :{profile.maritalStatus}</Card.Text>
                  <Card.Text>Birth Date :{profile.birthDate?.split("T")[0]}</Card.Text>
                  <Card.Text>City :{profile.city}</Card.Text>
                  <Card.Text>Community :{profile.subCommunity}</Card.Text>

                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navi("/profiledetails/".concat(profile.userId));
                    }}
                  >
                    Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProfiliList;
