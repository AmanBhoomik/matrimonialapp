import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Table,Row,Form,Button} from 'react-bootstrap'
function ShowUserDataU() {
  const { id,userId } = useParams();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:88/api/Users/".concat(userId))
      .then((result) => {
        console.log(result.data);
        setProfileData(result.data);
      })
      .catch((err) => {
        console.log("Errpr", err);
      });
  }, []);
  const back = () =>{window.location = "/profiledetails/"+id} 
  return <div style={{ backgroundColor: "lightblue",height:"100vh",paddingTop:"5%"}}>
  
<Table style={{width:"30%",margin:"auto"}}>    
    <thead>
        <tr>
        <th colSpan="2" className="text-center">Data of User</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>{profileData?.name}</td>
        </tr>
        <tr>
            <td>Birth Date</td>
            <td>{profileData?.birthDate?.split("T")[0]}</td>
        </tr>
        <tr>
            <td>City</td>
            <td>{profileData?.city}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>{profileData?.height}</td>
        </tr>
        <tr>
            <td>Marital Status</td>
            <td>{profileData?.maritalStatus}</td>
        </tr>
        <tr>
            <td>Community</td>
            <td>{profileData?.subCommunity}</td>
        </tr>
        <tr>
            <td>Diet</td>
            <td>{profileData?.diet}</td>
        </tr>
        <tr>
            <td>Work Company</td>
            <td>{profileData?.workCompany}</td>
        </tr>
        <tr>
            <td>Mobile No</td>
            <td>{profileData?.mobileNo}</td>
        </tr>

<tr><td colSpan={2}><Form style={{ width: "100%", marginTop: "2%" }}>
        <Row>
            <Button className="col-12" onClick={back}>
              Back
            </Button>
          </Row>
          </Form></td></tr>
    </tbody>

</Table>

  </div>;
}

export default ShowUserDataU;
