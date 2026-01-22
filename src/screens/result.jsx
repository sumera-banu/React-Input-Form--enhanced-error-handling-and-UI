import React, { useState } from "react"
import { useLocation,useNavigate } from "react-router-dom"
function Result() {

    const navigate=useNavigate();
    const location = useLocation();

     const formData = location.state;
      
     const ageCalculator=(dob)=>{
      const today=new Date();
      const birthDate=new Date(formData.dob);

      let age=today.getFullYear()-birthDate.getFullYear();
      const month=today.getMonth()-birthDate.getMonth();
      if(month<0 || (today.getMonth()-birthDate.getMonth())<today.getMonth()){
        age=age-1;
      }
      return age;
      
    }

    let age=ageCalculator(formData.dob);

  if (!formData) {
    return <h3>No data found. Please submit the form.</h3>;
  }

return(
    <>
          <h2>Submitted Details</h2>
            <div className="page">
            <p><b>Name:</b> {formData.name}</p>
            <p><b>Gender:</b> {formData.gender}</p>
            <p><b>Mobile No:</b> {formData.mobile}</p>
            <p><b>Address:</b> {formData.address}</p>
            <p><b>City:</b> {formData.city}</p>
             <p><b>State:</b> {formData.state}</p>
            <p><b>Age:</b>{age}</p>

            <button onClick={() => navigate("/register", {state:formData})}>Back</button>
            </div>
         
        </>

)
    
}

export default Result