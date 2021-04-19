import React from 'react';
import {Link , withRouter} from 'react-router-dom'
import {signout ,isAuthenticated} from '../auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome ,faUser ,faSignInAlt,faSignOutAlt, faArchway, faSearch, faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '	#000000' };
    else return { color: '#ffffff' };
};





const Menu = ({ history }) => {

    return (

        <div >
       
            
        <ul className="nav nav-tabs   bg-info">
             {/* <li className="nav-item"> 
              <a class="navbar-brand" href="#">
             <img src="https://cdn.pixabay.com/photo/2016/12/19/08/39/mobile-phone-1917737_1280.jpg" width="60" height="60"   alt="" />
             <span style= {{ fontSize: "30px" , color:"black", fontWeight :"20px" , fontFamily: "cursive" }}> MegaByte</span>
            </a></li> */}
        
      
          <li className="nav-item ">
   <Link className="nav-link text-bold" style={isActive(history, '/')} to="/" >
   <FontAwesomeIcon icon={faHome}  /> Home
                 </Link>
   </li>
      
          
           <li className="nav-item ">
   <Link className="nav-link text-bold" style={isActive(history, '/users')} to="/users" >
         <FontAwesomeIcon icon={ faUser}  />    Users
        
                 </Link>
   </li>
          
     

   
 
 
   {isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item">
                   
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link text-bold">
                        <FontAwesomeIcon icon={faSearch}  />     Find People
                        </Link>
                    </li>

                    <li className="nav-item">
                   
                        <Link to={`/post/create`} style={isActive(history, `/findpeople`)} className="nav-link text-bold">
                        <FontAwesomeIcon icon={faArrowAltCircleRight}  />     Create Post
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>
                </React.Fragment>
            )}
  
  {!isAuthenticated() && (
                 <>
                       <li className="nav-item">
   <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
   <FontAwesomeIcon icon={faSignInAlt} />     Sign In
  
                         </Link>
   </li>
   <li className="nav-item ">
   <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
   <FontAwesomeIcon icon={faArchway} />                       Sign Up
                         </Link>
   </li>
                 </>
            )}
 </ul> 
  
         </div>

    )
      

}
 
export default withRouter(Menu);

