import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup(){

  const navigate = useNavigate();

  const [data, setData] = useState({});

  const signup = async() => {

    await axios.post(
      "http://localhost:5000/signup",
      data
    );

    navigate("/");
  };

  return(

    <div style={s.box}>

      <h1>Signup</h1>

      <input
        placeholder="Name"
        onChange={(e)=>
          setData({
            ...data,
            name:e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e)=>
          setData({
            ...data,
            email:e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>
          setData({
            ...data,
            password:e.target.value
          })
        }
      />

      <button onClick={signup}>
        Signup
      </button>

      <Link to="/">
        Login
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