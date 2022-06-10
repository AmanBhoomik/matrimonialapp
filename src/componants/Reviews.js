import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../css/Service.css";
import img1 from "../componants/img/img3.webp";
import img2 from "../componants/img/img2.jpg";
import img3 from "../componants/img/img3.jpg";
function Reviews() {
  return (
    <div>
      <h1 className="Service-title">Reviews</h1>
      <Container className="service-Container">
        <Row>
          <Col>
            <Card className="Service-card">
              <Card.Img variant="top" src={img1} />
              <Card.Body>
                <Card.Title>Singh and Vatshal</Card.Title>
                <Card.Text>
                  We connected over Bandhan chat and then
                  soon exchanged mobile numbers, and rest
                  was a roller coaster ride till we finally
                  got married after 5 months since our first meet.
                  Today I am happy and feeling life at it's best.
                  Thanks to Bandhan matchmaking.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "22rem" }}>
              <Card.Img variant="top" src={img2} />
              <Card.Body>
                <Card.Title>Rai and Jain</Card.Title>
                <Card.Text>
                We met through your app, both got the suitable
                match we were looking for. it was an wonderful
                experience. thanks for giving us this platform
                to find the right match.Today I am happy and feeling
                life at it's best. Thanks to Bandhan matchmaking.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "22rem" }}>
              <Card.Img variant="top" src={img3} />
              <Card.Body>
                <Card.Title>Sandy and Shubh</Card.Title>
                <Card.Text>
                Shubh and Me met via Bandhan in 2022. We both liked good
                conversations and connected over common interests like 
                reading and traveling. I was impressed with Shubh's clear 
                communication, the way she expressed herself and her frankness.
                Today I am happy and feeling life at it's best. 
                Thanks to Bandhan matchmaking.
                
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Reviews;
