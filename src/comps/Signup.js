import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import { Button, Card } from "@mui/material";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("");
    const handleClick = () => {
        navigate("/login");
    }
    const handleRegister = async (e)=>{
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name
        })
      }
      toast.success("User Registered Successfully",{
        position: "top-center"
      });
      setName("");
      setEmail("");
      setPassword("");
      console.log("User Registered Successfully");
      
    } catch (error) {
      console.log(error.message);
  const cleanMsg = error.message
  .replace(/^Firebase:\s*/, '');
  //.replace(/\s*\(.*?\)\.?$/, '');

      toast.error(cleanMsg,{
        position: "bottom-center"
      });
    }
  }
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <Card variant="outlined" sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width: {xs:"90%", sm:"70%", md:"400px"}, margin:"auto", height:"auto", padding: 3, mt: 5}}>
        <form onSubmit={handleRegister} style={{display:"flex", flexDirection: "column", padding:"15px", gap:"20px"}} >
          <input type="text" name="txt" placeholder="User name" value={name} 
          onChange={(e)=>setName(e.target.value)} style={{padding:"10px", fontSize:"1rem"}} required  />
          <input type="email" name="email" placeholder="Email" value={email} 
          onChange={(e)=>setEmail(e.target.value)} style={{padding:"10px", fontSize:"1rem"}} required />
          <input type="password" name="pswd" placeholder="Password" value={password} 
          onChange={(e)=>setPassword(e.target.value)} style={{padding:"10px", fontSize:"1rem"}} required />
          <Button variant="contained">Sign up</Button>
        </form>
      Already have an account?
      <Button variant="contained" onClick={handleClick}>login</Button>
      </Card>
    </div>
    )
}
export default Signup;