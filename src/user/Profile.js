import React, { Component } from 'react';
import { Redirect ,Link } from 'react-router-dom';
import {isAuthenticated} from  '../auth';
import {read} from "./apiUser";
import  DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import {listByUser} from '../post/apiPost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Profile extends Component {
    constructor() {
        super()
        this.state ={
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts:[]

        }
    }
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
          // one id has many other ids (followers) and vice versa
          return follower._id === jwt.user._id;
        });
        return match;
      };
    
      clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
    
        callApi(userId, token, this.state.user._id).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({ user: data, following: !this.state.following });
          }
        });
      };
    

    init =(userId) => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if(data.error){
                this.setState({redirectToSignin: true});
            }else{
                let following = this.checkFollow(data);
                this.setState({ user: data, following });
                this.loadPosts(data._id);
               this.setState({user: data})
            }
        });
    }

    loadPosts = userId => {
      const token = isAuthenticated().token;
      listByUser(userId, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ posts: data });
        }
      });
    };
  
    componentDidMount() {

      const userId = this.props.match.params.userId
      this.init(userId)
    }
   
    componentWillReceiveProps(props) {

        const userId = props.match.params.userId
        this.init(userId)
      }
     




    render() { 
        const {redirectToSignin,user,posts} = this.state;
        if(redirectToSignin) return <Redirect to="/signin" />;

        
        const photoUrl = user._id
        ? `${process.env.REACT_APP_API_URL}user/photo/${
            user._id
          }?${new Date().getTime()}`
        : DefaultProfile;

        return ( <div className="container mt-3">
        
            <div className="row">
            <div className="col-md-4">   
            {/* <img className="card-img-top" src={DefaultProfile} alt={user.name} style= {{width: '250px' , height: '300px'  ,borderRadius :"50%"} } /> */}
             
            <img
          style={{ height: "200px", width: "auto" , borderRadius: "50%" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={user.name}
        />
              </div>
              <div className="col-md-8">
              <div className="lead mt-2 ">
              <p>User {user.name}</p>
              <p>Email {user.email}</p>
              <p>{` Joined ${new Date(user.created).toDateString()}`}</p>
              </div>
                  {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                      <div className = "d-inline-block "> 
                      
                      <Link className =" btn btn-raised btn-info mr-3" to = {`/post/create/`}>Create Post</Link>
                      <Link className =" btn btn-raised btn-sucess mr-3 " to = {`/user/edit/${user._id}`}>Edit Profile</Link>
                       <DeleteUser userId={user._id}/>
                      </div>
                  ) : (  <FollowProfileButton
                    following={this.state.following}
                    onButtonClick={this.clickFollowButton}
                  />)
                   }
                   <hr/>
            
              </div>
            </div>
         <div className="row"> 
         <div className="col md-12 mt-5 mb-5">
             <hr/>
             <h3 className ="text-bold"> <FontAwesomeIcon icon={faUser}  /> <span style = {{ fontSize: "50px" , color: "red"}} >A</span>bout <span  style = {{ fontSize: "50px" , color: "red"}}> M</span>yself</h3>
             <p className="lead font-italic">{user.about}</p>
             <hr/>
             <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            
            />
         </div>
         </div>
        </div>  );
    }
}
 
export default Profile;