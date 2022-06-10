import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Image } from "react-bootstrap";
import "../css/Contact.css";
import { FaMailBulk, FaWhatsapp, FaAddressCard } from "react-icons/fa";
import { GiIndiaGate } from "react-icons/gi";
import axios from "axios";

function Contact() {
  const [fname,setfName] = useState("") 
  const [contact,setContact] = useState("") 
  const [email,setEmail] = useState("") 
  const [msg,setMSG] = useState("") 
  const [errors,setErros] = useState("") 

  const handleValidation = () => {
        
    let errors = {};
    let formIsValid = true;

    if (typeof fname !== "undefined") {
        if (!fname) {
            formIsValid = false;
            errors["fname"] = "Fields cannot be empty";
          }   
          if (!email) {
            formIsValid = false;
            errors["fname"] = "Fields cannot be empty";
          }   
          if (!contact) {
            formIsValid = false;
            errors["fname"] = "Fields cannot be empty";
          }   
          if (!msg) {
            formIsValid = false;
            errors["fname"] = "Fields cannot be empty";
          }    
        
    }
    setErros(errors);
    return formIsValid;
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    if(handleValidation()){
      let obj={        
          "id": 0,
          "name": fname,
          "mobNo": contact,
          "email": email,
          "message": msg        
      }
      axios.post("http://localhost:88/api/Contacts",obj).then(res=>{window.location="/"})

    }
  } 
  return (
    <div className="about"  id="about">
      <h1 className="Contact-title">Contacts</h1>
      <Container className="Contact-Container">
        <Row>
          <Col>
            <h1 className="HContact">HOW TO CONTACT</h1>
            <div className="Contact-detail">
              <h6>
                <GiIndiaGate size={28} color="IndianRed" /> India :-{" "}
                <span> +91-9898745212</span>
              </h6>
              <h6>
                <FaWhatsapp size={28} color="green" /> WhatsApp :-{" "}
                <span> +91-9898745212</span>
              </h6>
              <h6>
                <FaMailBulk size={28} color="red" /> E-mail :-{" "}
                <span> Contact@bndhan.com</span>
              </h6>
              <h6>
                {" "}
                <FaAddressCard size={28} color="skyblue" /> Address :-{" "}
                <span> Pune</span>
              </h6>
            </div>
          </Col>
          <Col className="Contact-colm">
            <h1 className="Contact-Massage">WRITE A MASSAGE</h1>
            <div>
              <Form.Control
                className="Contact-form"
                type="text"
                placeholder=" Your Name"
                value={fname}
                onChange={(e)=>setfName(e.target.value)}
              />
              <Form.Control
                className="Contact-form"
                type="text"
                placeholder="Phone Number"
                value={contact}
                onChange={(e)=>setContact(e.target.value)}
              />

              <Form.Control
                className="Contact-form"
                type="email"
                placeholder=" YourEmail"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

              />
              <div className="Form-text">
                <Form.Control
                  className="Form-textarea"
                  as="textarea"
                  rows={3}
                  placeholder="Add your massage"
                  value={msg}
                  onChange={(e)=>setMSG(e.target.value)}
  
                />
              <span style={{ color: "red" }}>{errors["fname"]}</span>
              </div>
              <Button className="Contact-button" onClick={(e)=>handleSubmit(e)}>SEND MASSAGE</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
