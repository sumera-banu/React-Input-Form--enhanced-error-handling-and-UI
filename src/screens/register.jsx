import React from "react";
import { useState} from "react"
import { useNavigate,useLocation } from "react-router-dom";
import InputBox from "../components/inputBox";

function Register(){

    const navigate = useNavigate();
    const location=useLocation();
    
    const[formData, setFormData]=useState(location.state || {
         name:"", gender:"",address:"",mobile:"",city:"",state:"",dob:"",agree:false,
    
      });

    const[errors, setErrors]=useState([]);

    const capitalizeName=(text)=>{
      return text.toLowerCase().split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}

     const getError=(field)=>{
      return errors.find((error)=>error.field===field)?.message;
     }
     
     const addressClass = getError("address")
    ? "text-input error-input"
    : "text-input";
       
    const handleChange =(e) => {

      const{name, value, type, checked}=e.target;

      let newValue=value;

      if(name==="name"){
        newValue=capitalizeName(value);
      }

      setErrors(prev=>prev.filter((err)=>err.field!==name));
      setFormData({...formData, [name]: type === "checkbox" ? checked : newValue,})
      }

    
    
      const handleSubmit = (e)=>{
        e.preventDefault();
        
        let newErrors=[];

        const regName = /^[A-Za-z -.]{3,25}$/;
         if(!regName.test(formData.name)){
          newErrors.push({
      field: "name",
      message: "Name must be 3–25 letters only"
    });
        }

         const regMobile=/^[6-9]\d{9}$/;
          if(!regMobile.test(formData.mobile)){
          newErrors.push({
      field: "mobile",
      message: "Enter valid 10-digit mobile number"
    });
        }
        
        const regAddress = /^[A-Za-z0-9 ,.-]{15,100}$/;
         if (!regAddress.test(formData.address)) {
          newErrors.push({
      field: "address",
      message: "Address must be 15–100 characters"
    });
        }
    
         if(!formData.agree){
          alert("please confirm that entered data is correct");
          return;
        }
     
        if(newErrors.length>0){
          setErrors(newErrors);
          return;
        }
          navigate("/result", { state: formData });
       
      }
                
      
    return(
    <>
<h2>Registration Page</h2>

    <form className="page" onSubmit={handleSubmit}>
     <InputBox label="Name" name="name" value={formData.name} onChange={handleChange} error={getError("name")}/>


       <div className="field">
        <label>Gender:</label><br/>
      <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
      <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
      <input type="radio" name="gender" value="Others" checked={formData.gender === "Others"} onChange={handleChange} /> Others
       </div>

      <div className="field" >
        <label>Address:</label><br/>
      <textarea  className={`text-input ${getError("address") ? "error-input" : ""}`} name="address" value={formData.address} onChange={handleChange} />
            {getError("address") && <p className="error">{getError("address")}</p>}

      </div>

      <InputBox label="Phone Number" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={getError("mobile")}/>

      <div className="field">
        <label>City:</label><br/>
      <select  className="text-input" name="city" value={formData.city} onChange={handleChange} >
        <option value="">Select city</option>
        <option value="Banglore">Banglore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
      </div>

      <div className="field">
        <label>State:</label><br/>
      <select  className="text-input" name="state" value={formData.state} onChange={handleChange} >
        <option value="">Select state</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
      </select>
      </div><br/>

      <div className="field">
        <label>Date of Birth:</label><br/>
        <input type="date"  name="dob" value={formData.dob} onChange={handleChange} />
      </div>
      
      <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange}  />
      <label>I confirm that entered data is correct</label>
      <br/>
       <button type="submit">Submit</button>
    </form>

    
    </>
)}

export default Register
