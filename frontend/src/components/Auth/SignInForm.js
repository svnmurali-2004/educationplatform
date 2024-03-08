import React, { useState } from 'react';
import "../../assets/CSS/Signin.css";
import { GoogleOAuthProvider, GoogleLogin ,useGoogleLogin} from "@react-oauth/google";
import {GoogleButton} from "react-google-button"
import { jwtDecode } from "jwt-decode";
import axios from "axios"
const SignInForm = () => {
    // State variables for email and password fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Event handler for changes in the email input field
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Event handler for changes in the password input field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Your details were:\nEmail: ${email}\nPassword: ${password}`);

        // Add your form submission logic here
    };

    // Google sign-in handler
    const googleSignInHandler = (accessToken) => {
        console.log("google sign in executed")
        // const data = jwtDecode(credentialResponse.access_token);
        // setEmail(data.email);
        // alert("Google sign-in success");
        axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      alert(error);
    });
    };
    const glogin = useGoogleLogin({
        onSuccess: tokenResponse => {console.log(tokenResponse);googleSignInHandler(tokenResponse.access_token)},
      });
    return (
        <div className="container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <a href="svnm.com" className="forgot-password">
                    Forgot Password?
                </a>
                <input type="submit" value="Sign In" />
            </form>
            {/* <div style={{'width':'100%'}}>
                <GoogleOAuthProvider clientId="217758845790-257slng4gnj41e2doloqgehirho1n12t.apps.googleusercontent.com">
                    <GoogleLogin
                    
                        onSuccess={googleSignInHandler}
                        
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div> */}
            <GoogleButton 
            style={{width:"100%"}}
            label="Sign in with Google"
           
            onClick={() => glogin()}/>
            
            
        </div>
    );
};

export default SignInForm;
