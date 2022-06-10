import React, { useState ,useEffect} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// Include fs module
function UpdateModal(props) {
  const setDate = (separator = "-") => {
    let newDate = new Date(bDate);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}T00:00:00`;
  };
  useEffect(()=>{
    if(props.show){
      if(count===0){
        setHeight(props.data.height)
        setSubComm(props.data.subCommunity)
        setDiet(props.data.diet)
        setCity(props.data.city)
        setUserId(props.data.userId)
        setWithFamily(props.data.isLiveWithFamily)
        setGender(props.data.gender)
        setBithDate(props.data.birthDate)
        setMaritalStatus(props.data.maritalStatus)
        setProfilePic(props.data.profilePhoto)
        setCount(1)
      }
    }
  });
  
  const navi = useNavigate();
  const [height, setHeight] = useState(props.data.height?props.data.height:0);
  const [subCommunity, setSubComm] = useState(props.data.subCommunity?props.data.subCommunity:"");
  const [cityt, setCity] = useState(props.data.city?props.data.city:"");  
  const [dietType, setDiet] = useState(props.data.diet?props.data.diet:""); 
  const [errors, setErrors] = useState({});
  const [count,setCount] = useState(0)
  const [withFamily, setWithFamily] = useState(false);
  const [gender, setGender] = useState("Male");
  const [userId, setUserId] = useState(0);
  const [maritalstaus, setMaritalStatus] = useState("Unmarried");
  const [pic, setProfilePic] = useState("");
  const [bDate, setBithDate] = useState();
  const handleValidation = async () => {
    let errors = {};
    let formIsValid = true;

    if (typeof height !== "undefined") {
      if (!height) {
        formIsValid = false;
        errors["height"] = "Cannot be empty";
      } 
    }
    if (typeof subCommunity !== "undefined") {
      if (!subCommunity) {
        formIsValid = false;
        errors["subCommunity"] = "Cannot be empty";
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
  let url = 'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg'
  const toDataURL =async url => await fetch(url)
        .then(async response => await response.blob())
        .then(async blob => await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
       }))
  
    async function dataURLtoFile(dataurl, filename) {
       var arr = await dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
       bstr = await atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
       while(n--){
       u8arr[n] = bstr.charCodeAt(n);
       }
     return await new File([u8arr], filename, {type:mime});
    }
  
  async function doProfileUpdate() {
    if (handleValidation()) {
      

  var fileData  = await toDataURL(url)
  .then(dataUrl => {
     return dataURLtoFile(dataUrl, `C://Users//2107116//Downloads//MatrimonyAPI//MatrimonyAPI//MatrimonyAPI//wwwroot`+pic.replaceAll(`\\`,'//'));
     
   })
      const obj = {
      "IsLiveWithFamily": Boolean(withFamily),
      "Gender": gender,
      "height": Number(height),
      "UserId": Number(userId),
      "MaritalStatus": maritalstaus,
      "Profile":fileData,
      "SubCommunity": subCommunity,
      "City": cityt,
      "Diet": dietType,
      "BirthDate": setDate()
      }
      var formData = new FormData();
      Object.keys(obj).forEach(element => {
        formData.append(element,obj[element])
      });
        
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
          axios
        .put("http://localhost:88/api/Users/UpdateBasicDetail", formData)
        .then((result) => {         
          window.location = "/profiledetails/".concat(userId);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }
    return (
      <div className="container">
        <Modal {...props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
             Update Your Info  {props.data.name?.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            
          <Form>
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
                      value={height}
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
                      value={subCommunity}
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
                      value={cityt}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <span style={{ color: "red" }}>{errors["cityt"]}</span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm="4">
                    <Form.Label className="pt-1">Diet</Form.Label>
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
          </Modal.Body>
        </Modal>
      </div>
    );
  
}

export default UpdateModal;
