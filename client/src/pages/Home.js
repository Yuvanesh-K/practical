import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

export default function Home(){

  const role = localStorage.getItem(
    "role"
  );

  const [campaigns, setCampaigns] =
    useState([]);

  const [donor, setDonor] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const getCampaigns = async() => {

    const res = await axios.get(
      "http://localhost:5000/campaigns"
    );

    setCampaigns(res.data);
  };

  useEffect(() => {

    getCampaigns();

  }, []);

  const donate = async(id) => {

    await axios.put(
      `http://localhost:5000/donate/${id}`,
      {
        donorName:donor,
        amount:Number(amount)
      }
    );

    getCampaigns();
  };

  return(

    <div>

      <Navbar />

      <div style={{padding:"20px"}}>

        {
          campaigns.map((item) => (

            <div
              key={item._id}
              style={s.card}
            >

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <p>
                ₹{item.raised} / ₹{item.goal}
              </p>

              <progress
                value={item.raised}
                max={item.goal}
                style={{width:"100%"}}
              />

              <br /><br />

              {
                role === "admin"

                ?

                item.donations?.map(
                  (d, i) => (

                  <p key={i}>

                    {d.donorName}
                    {" - "}
                    ₹{d.amount}

                  </p>
                ))

                :

                <div>

                  <input
                    placeholder="Name"
                    onChange={(e)=>
                      setDonor(
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="Amount"
                    onChange={(e)=>
                      setAmount(
                        e.target.value
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      donate(item._id)
                    }
                  >
                    Donate
                  </button>

                </div>
              }

            </div>
          ))
        }

      </div>

    </div>
  )
}

const s = {

  card:{
    border:"1px solid #ccc",
    padding:"20px",
    marginBottom:"20px"
  }
}