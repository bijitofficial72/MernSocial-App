// import React, { Component } from "react";
// import GoogleLogin from "react-google-login";
 
// class SocialLogin extends Component {
//     responseGoogle = response => {
//         console.log(response);
//     };
 
//     render() {
//         return (
//             <div className="container">
//                 <GoogleLogin
//                     clientId=
//                     buttonText="Login with Google"
//                     onSuccess={this.responseGoogle}
//                     onFailure={this.responseGoogle}
//                 />
//             </div>
//         );
//     }
// }
 
// export default SocialLogin;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";
 
class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }
 
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl,
            
        };
        console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };
 
    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
 
        return (
            <GoogleLogin
                clientId="567332634215-7esd2fnstb9uk8ejjioihn0aj6fch7nt.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}
 
export default SocialLogin;