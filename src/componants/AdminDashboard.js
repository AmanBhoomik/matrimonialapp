import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import axios from "axios";
function AdminDashboard() {
  const [profileData, setProfileData] = useState({});
  const [userData, setData] = useState([]);
  const [contactData, setContactData] = useState([]);

  const [u, setU] = useState(<></>);
  const [c, setC] = useState(<></>);

  const deleteClick = (e, id) => {
    axios.delete("http://localhost:88/api/Users/" + id).then((result) => {
      console.log(result);
      window.location = "/Admindashboard";
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:88/api/Users/1")
      .then((result) => {
        console.log(result.data);
        setProfileData(result.data);
      })
      .catch((err) => {
        console.log("Errpr", err);
      });
    if (userData.length > 0) {
      setU(
        <Table className="mt-4 text-white" variant="dark" bordered size="sm">
          <thead>
            <tr>
              <th colSpan={6} className="text-white text-center">
                Users
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Birth Date</th>
              <th>Community</th>
              <th>Check More</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((record) => {
              if (
                record.userId !== profileData.userId &&
                record.maritalStatus !== "Admin"
              ) {
                return (
                  <tr key={record.userId}>
                    <td>{record.name}</td>
                    <td>{record.mobileNo}</td>
                    <td>{record.birthDate?.split("T")[0]}</td>
                    <td>{record.subCommunity}</td>
                    <td>
                      <Button
                        onClick={() =>
                          (window.location =
                            "profiledetails/userdata/" + record.userId)
                        }
                      >
                        Check
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn-danger"
                        onClick={(e) => deleteClick(e, record.userId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      );
    }
    if (contactData.length > 0) {
      setC(
        <Table className="mt-4 text-white" variant="dark" bordered size="sm">
          <thead>
            <tr>
              <th colSpan={5} className="text-white text-center">
                Contact Table
              </th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Massage</th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((record) => {
              return (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.mobNo}</td>
                  <td>{record.email}</td>
                  <td>{record.message}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  }, [userData, contactData]);
  const logoutClick = () => {
    window.location = "/";
  };
  const getAll = () => {
    axios
      .get("http://localhost:88/api/Users/All")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const getContactData = () => {
    axios
      .get("http://localhost:88/api/Contacts")
      .then((result) => {
        setContactData(result.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div style={{ backgroundColor: "lightblue",height:"100vh" }}>
      
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand className="text-white">
            <h2>Bandhan</h2>
          </Navbar.Brand>
          <Navbar.Text className="text-white h4 text-capitalize">
            {profileData.name}
          </Navbar.Text>
        </Container>
      </Navbar>
      <Form style={{ width: "100%", marginTop: "2%" }}>
        <Row className="justify-content-center">
          <Col sm="2">
            <Button className="col-12" onClick={getContactData}>
              Get Contact Data
            </Button>
          </Col>
          <Col sm="2">
            <Button className="col-12" onClick={getAll}>
              Get All Users
            </Button>
          </Col>
          <Col sm="2">
            <Button className="col-12 btn-danger" onClick={() => logoutClick()}>
              Logout
            </Button>
          </Col>
        </Row>
      </Form>
      {u}
      {c}
    </div>
  );
}

export default AdminDashboard;
