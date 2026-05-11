import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login(){

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const login = async() => {

    try{

      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password }
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      navigate("/home");

    }catch{

      alert("Invalid Credentials");
    }
  };

  return(

    <div style={s.box}>

      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e)=>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>
          setPassword(e.target.value)
        }
      />

      <button onClick={login}>
        Login
      </button>

      <Link to="/signup">
        Signup
      </Link>

    </div>
  )
}

const s = {

  box:{
    width:"300px",
    margin:"100px auto",
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  }
}