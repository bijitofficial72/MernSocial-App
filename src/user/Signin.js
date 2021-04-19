import  React , {Component} from 'react';
import {Redirect}  from 'react-router-dom'
import SocialLogin from "./SocialLogin";
import  {signin , authenticate} from '../auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen,faPassport} from '@fortawesome/free-solid-svg-icons'




class Signin extends Component {
   constructor() {
       super()
       this.state = {
        
           email: "",
           password: "",
           error:"",
           redirectToReferer: false,
          loading : false
        

       
       };

   }

   handleChange = (name) => (event) => {
       this.setState({error: ""})
       this.setState({[name]: event.target.value});
    
   };


  
   
   clickSubmit = (event) => {
       event.preventDefault()
       this.setState({loading:true})
       const {email,password} = this.state
       const user ={
           
           email: email,
           password: password
       }
      signin(user)
      .then(data => {
          if(data.error) {this.setState({error: data.error ,  loading : false
          });
        }

          else{
             
             //authenticate 
             authenticate(data , () => {
                 this.setState({redirectToReferer: true })
             })
           
          }

          });
      
   };
  
 

    render() 
    { 
        const { email , password , error , redirectToReferer ,loading} = this.state;

        if(redirectToReferer){
            return <Redirect to = "/" />
        }

        return ( 
        
        <div className="container">
       

             <h2 className="mt-5  mb-3 text-blod ">SignIn</h2>
            <hr />
     
           
            <div className="alert alert-danger" style={{ display: error ? " " : "none"}}>
         
      {error}
            </div>
            { loading ? <div className=" jumbotron text-center">
                 
                 <h2>Loading....</h2>
                 
                 </div> : ""
                 }
            {/* <div className="alert alert-info" style={{ display: open ? " " : "none"}}>
      Your Account is created Sucessfully. Please Sign In!!
            </div> */}

            <div className="row">
            <div className="col-sm-3  col-md-6 col-lg-12 align-center">
            <form  style={{ margin_left: "auto",

  margin_right: "auto",
  padding: "62px 48px",
            border: "3px solid #c2c2c2",
            border_radius: "15px",
            display: "block",
            font_family: "'Noto Sans', sans-serif !important",
            font_size: "14px !important"}} >

            {/* <div className="mb-3">
    <label  className="form-label text-blod ">Name</label>
    <input type="text"  onChange={ this.handleChange("name")}  value={name} className="form-control" id="Name" aria-describedby="name"/>
    <div id="name" className="form-text text-muted">We'll never share your email with anyone else.</div>
  </div> */}
  <div className="mb-3">
    <label  className="form-label text-blod">    <FontAwesomeIcon icon={faEnvelopeOpen}  />   Email address</label>
    <input type="email" onChange={ this.handleChange("email")} value={email}  className="form-control" id="Email1" aria-describedby="email"/>
    <div id="email" className="form-text text-muted">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label  className="form-label text-blod">  <FontAwesomeIcon icon={faPassport}  />   Password</label>
    <input type="password" onChange={ this.handleChange("password")}  value={password}  className="form-control" id="Password1"/>
    <input type="checkbox" onClick={this.clickShow}   className =" mt-3"/>  Show Password

     

  </div>
  
  <button  onClick={this.clickSubmit} className="btn btn-raised btn-info text-blod"> Submit</button> 
      

         
    
      
           
</form>
   <div className="col-md-12 text-center"> <SocialLogin   /></div> 

            </div>

         
            


                </div>
        </div>  );
    }
}

 
export default Signin;