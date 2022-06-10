import React, { useState } from "react";
import { Container, Image, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { BsSpeedometer2 } from "react-icons/bs";
import img from "./img/banner1.jpeg";
import formcar from "./img/banner2.jpeg";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const navi = useNavigate();

  function goToList() {
    navi("/profilelist");
  }

  return (
    <div>
      <div className="Home-div">
        <Image className="Home-img" src={img} />
        <div className="Home-t">
          <span className="name">FIND A BEST</span>
          <br />
          <span className="name">LIFE PARTNER</span>
          <br />
          <span className="name">FOR YOU</span>
        </div>
      </div>

      <div>
        
        
        <section className="Ssection-background Ssection-quote Sbackground-overlay Stext-center">
          <div>
            <p>
              Trusted <span>Matrimony</span> &amp; <span>Matchmaking</span>{" "}
              Services
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
