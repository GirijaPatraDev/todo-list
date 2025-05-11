import { useState } from 'react';
import '../css/Login.css';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import {toast} from 'react-toastify';
import { redirect, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
		<div className="main">  	
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" name="txt" placeholder="User name" value={name} 
          onChange={(e)=>setName(e.target.value)} required />
          <input type="email" name="email" placeholder="Email" value={email} 
          onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" name="pswd" placeholder="Password" value={password} 
          onChange={(e)=>setPassword(e.target.value)} required />
          <button>Sign up</button>
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Email" required />
          <input type="password" name="pswd" value={password} onChange={(e)=>setPassword(e.target.value)} 
          placeholder="Password" required />
          <button onClick={()=> window.location.href="/forgot-password"}>Forgot Password</button>
          <button>Login</button>
        </form>
      </div>
    </div>
	)
}
export default Login;
