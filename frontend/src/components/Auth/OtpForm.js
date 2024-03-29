import React, { useState, useRef,useEffect } from 'react';
import "../../assets/CSS/OtpForm.css"
import axios from "axios"
const baseurl="http://localhost:3001"
const OtpForm = ({loginDetails,setLoginDetails}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '').slice(0, 1); // Allow only numeric input and limit to 1 character
    setOtp(newOtp);
    
    // Move focus to the next input field
    if (value && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Submitted OTP:', enteredOtp); 
    const response=await axios.post("http://localhost:3001/api/verify-otp",{...loginDetails,otp:parseInt(enteredOtp)})
    console.log(response.data)
    if (response.data.acknowledged===true){
        console.log("otp verification success")
        setLoginDetails(prevState => ({ ...prevState, verified: true }));
        
    }else{
        alert(response.data.des)
    }
    // Add your submit logic here, e.g., sending OTP to server for verification
  };
useEffect(()=>{
  if(loginDetails.verified===true){
    alert("verification success",loginDetails)
    console.log("verificication success by otp form")
    
  }
},[loginDetails])

  return (
    <div className="outer-container">
      <h2>Enter OTP</h2>
      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength={1}
            style={{ width: '40px', margin: '0 5px', textAlign: 'center' }}
            ref={refs[index]}
            className="otp-digit"
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default OtpForm;
