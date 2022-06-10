import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
  Form,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import UpdateModal from "./UpdateModal";
function ProfileDetails() {
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState({});
  const [gender, setGender] = useState("Male");
  const [diet, setDiet] = useState("Veg");
  const [data, setData] = useState([]);
  const [t, setT] = useState(<></>);
  const [showUpdate,setShowUpdateModal] = useState(false)
  useEffect(() => {
    axios
      .get("http://localhost:88/api/Users/".concat(profileId))
      .then((result) => {
        console.log(result.data);
        setProfileData(result.data);
      })
      .catch((err) => {
        console.log("Errpr", err);
      });
      if (data.length > 0) {
        setT(
          <Table className="mt-4 text-white" variant="dark" bordered size="sm">
            <thead>
              <tr>
                <th colSpan={5} className="text-white text-center">
                  Users
                </th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Birth Date</th>
                <th>Community</th>
                <th>Check More</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record) => {
                if (record.userId !== profileData.userId && record.maritalStatus!=="Admin") {
                  return (
                    <tr key={record.userId}>
                      <td>{record.name}</td>
                      <td>{record.mobileNo}</td>
                      <td>{record.birthDate?.split("T")[0]}</td>
                      <td>{record.subCommunity}</td>
                      <td>
                        <Button onClick={()=>window.location = "userdata/"+profileId+"/"+record.userId}>Check</Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        );
      }else{
        setT(<><div className="alert alert-danger mt-3 pt-3" role="alert">
        No Data Available for selected filter
      </div></>)
      }
  },[data]);
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
  const getData = () => {
    const userData = {
      gender: gender,
      ageStart: 0,
      ageEnd: 0,
      diet: diet,
      city: "string",
    };
    console.log(userData);
    axios
      .post("http://localhost:88/api/Users/Search", userData)
      .then((result) => {
        console.log(result.data);
        setData(result.data);       
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const logoutClick = () => {
    window.location = "/"
  }
  const closeUpdateModal = () => {setShowUpdateModal(false)}

 
  return (
    <div style={{ backgroundColor: "lightblue",height:"130vh" }}>
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
      <Form style={{width:"100%",marginTop:"2%"}}>
        <Row>
          <Col sm="2">
            <Form.Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Col>
          <Col sm="2">
            <Form.Select value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </Form.Select>
          </Col>
          <Col sm="2">         
            <Button className="col-12" onClick={getData}>Search</Button>
          </Col>
          <Col sm="2">
            
            <Button className="col-12" onClick={getAll}>Get All Data</Button>
          </Col>
          <Col sm="2">            
            <Button className="col-12" onClick={() => setShowUpdateModal(true)}>Update Details</Button>
          </Col>
          <Col sm="2">            
            <Button className="col-12 btn-danger" onClick={() => logoutClick()}>Logout</Button>
          </Col>

        </Row>
      </Form>
      <UpdateModal 
      show= {showUpdate}
      data={profileData}
      onHide= {closeUpdateModal}

/>

      {t}
      
    </div>
  );
}

export default ProfileDetails;
