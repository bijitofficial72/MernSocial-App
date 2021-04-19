
import React from "react";
import Posts from "../post/Posts";
import c2 from "../images/c2.jpg"
import fb from "../images/fb.png"
import gt from "../images/gt.png"
import lk from "../images/lk.png"
const Home = () => (
  <div>
    {/* <div classNameName="jumbotron">
      <h2>Home</h2>
      <p className="lead">Welcome to React Frontend</p>
    </div> */}

    {/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
    <img className="d-block w-100 img-fluid"  src={c2} alt="first-slide"   style={{ width: "600px", height: "450px", margin: "auto", padding: "50px" }}  />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100 img-fluid" src="c2.jpg" alt="Second slide"  style={{ width: "600px", margin: "auto", padding: "50px" }}/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100 img-fluid" src="c3.jpg" alt="Third slide"  style={{ width: "600px", margin: "auto", padding: "50px" }}/>
    </div>
  </div>
</div> */}
<div className="container">
<div className="row mt-5">
<div className="col-md-6">
<h2>Multi  User <span style ={{ color : " burlywood" , fontStyle: "italic" }}> Blogging</span>  <span style={{color:"blanchedalmond"}}> </span>Platform </h2>
{/* <a class="navbar-brand " href="#"><span style="color: burlywood; font-family: 'MuseoModerno', cursive;">Mega</span ><span style="color: blanchedalmond;">Byte</span></a> */}
<h4>A small demo Website, where user can create/delete/update posts in addition to features <span style ={{ color : " blue" , fontStyle: "italic" }} className="font-bold"> Commenting/Liking.....</span></h4>
<div className="about-content">
    MEET Megabyte
    Web platform with Purpose
    We make sure our website is fast, secure & always up -
    so your visitors & search engines trust you. Guaranteed.
</div>
<div className="social mt-3">
    <span className="mr-2 "><img src={fb}></img> </span>
    <span className="mr-2 "><img src={gt}></img> </span>
    <span className="mr-2 "><img src={lk}></img> </span>
   
  </div>
<button type="button" className="btn btn-info">Contact Us </button>
</div>
<div className="col-md-6 skills-bar">
    <img src={c2} alt=""  className="img-fluid"/>
    
</div>
</div>
</div>  
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;


<section id="about">
 
</section>