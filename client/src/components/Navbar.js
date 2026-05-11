import { Link } from "react-router-dom";

export default function Navbar(){

  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return(

    <div style={s.nav}>

      <h2>Donation Platform</h2>

      <div>

        <Link to="/home" style={s.link}>
          Home
        </Link>

        {
          role === "admin" &&

          <Link to="/create" style={s.link}>
            Create Campaign
          </Link>
        }

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  )
}

const s = {

  nav:{
    background:"black",
    color:"white",
    padding:"15px",
    display:"flex",
    justifyContent:"space-between"
  },

  link:{
    color:"white",
    marginRight:"15px",
    textDecoration:"none"
  }
}