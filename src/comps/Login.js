import { useState } from 'react';
import '../css/Login.css';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import {toast} from 'react-toastify';
import { redirect, useNavigate } from 'react-router-dom';
import { Button, Card } from "@mui/material";

function Login() {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    navigate("/signup");
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged in successfully");
      navigate("/todo");
      toast.success("Logged in Successfully",{
        position: "top-center"
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid Email or Password, Login Failed, Please try again",{
        position: "top-center"
      }
      );
    }
    
  }
  
	return(
		<div className="main" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

      <Card variant="outlined" sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width: {xs:"90%", sm:"70%", md:"400px"}, margin:"auto", height:"auto", padding: 3, mt: 5}}>
        <form onSubmit={handleLogin} style={{display:"flex", flexDirection: "column", padding:"15px", gap:"20px"}}>
          <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Email" style={{padding:"10px", fontSize:"1rem"}} required />
          <input type="password" name="pswd" value={password} onChange={(e)=>setPassword(e.target.value)} 
          placeholder="Password" required style={{padding:"10px", fontSize:"1rem"}}/>
          <Button variant="outlined" onClick={()=> window.location.href="/forgot-password"}>Forgot Password</Button>
          <Button variant="contained" onClick={handleLogin}>login</Button>
        </form>
      
      Don't have an account? 
      <Button variant="contained" onClick={handleClick}>signup</Button>
      </Card>
    </div>
	)
}
export default Login;
