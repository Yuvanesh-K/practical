import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

export default function CreateCampaign(){

  const [data, setData] =
    useState({});

  const createCampaign = async() => {

    await axios.post(
      "http://localhost:5000/campaign",
      data
    );

    alert("Campaign Created");
  };

  return(

    <div>

      <Navbar />

      <div style={s.box}>

        <h1>Create Campaign</h1>

        <input
          placeholder="Title"
          onChange={(e)=>
            setData({
              ...data,
              title:e.target.value
            })
          }
        />

        <input
          placeholder="Description"
          onChange={(e)=>
            setData({
              ...data,
              description:e.target.value
            })
          }
        />

        <input
          placeholder="Goal"
          onChange={(e)=>
            setData({
              ...data,
              goal:e.target.value
            })
          }
        />

        <button onClick={createCampaign}>
          Create
        </button>

      </div>

    </div>
  )
}

const s = {

  box:{
    width:"300px",
    margin:"50px auto",
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  }
}