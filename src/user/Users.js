import React, { Component } from 'react';
import  {list} from './apiUser';
import  DefaultProfile from '../images/avatar.png'
import {Link} from 'react-router-dom'
import '../css/style.css';

class Users extends Component {
 constructor ( ) {
     
     super();
     this.state = {
         users: []
     };
 }
     componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    // renderUsers = users => (
    //     <div className="card">
    //         {users.map((user, i) => (
    //            <div key={i}> <p> {user.name}</p> </div>
    //         ))}
    //     </div>
    // );

//   renderUsers =(users) => (   
//   <div className="card">
//   {users.map((user,i) => (
//       <div key={i}>
//           <p>{user.name}</p>
//           </div>
//   ))}
// </div>
// );

    render() { 
        const {users} = this.state
        return (
          
        <div className="container">

       
               <h2 className="mt-5  mb-3 text-blod ">Users</h2>
               <div className="row" >
   {users.map((user,i) => (
      <div className="card col-md-4  mt-3  "  key={i}>
          <img
          style={{ height: "10rem", width: "15rem" }}
          className="img-thumbnail"
          src={`${process.env.REACT_APP_API_URL}user/photo/${
            user._id
          }`}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={user.name}
        />
      <div className="card-body " >
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.email}</p>
        <Link  to={`/user/${user._id}`} className="btn  btn-raised btn-info">View Profile</Link>
      </div>
    </div>
    
    
  ))}
</div>
</div> 

 );
    }
}
 
export default Users;



 {/* <div key={i}>
           <p>{user.name}</p>
          </div>
 */}

