import React, { useEffect, useState } from "react";
import "../Custom.css";
import { Link } from "react-router-dom";

const Catagories = () => {
  let [data, setData] = useState([]);
  let [results, setResults] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const d = await res.json();
      setData(d);
    } catch (error) {
      console.log(error);
    }
  };

  const getResults = () => {
    const filterValue = data.map((ele) => {
      return ele.Catagory;
    });

    let values = [];

    filterValue.forEach((ele) => {
      if (!values.includes(ele)) {
        const newIndex = values.length;
        values[newIndex] = ele;
      }
    });
    console.log(values);
    setResults(values);
  };

  useEffect(() => {
    getData();
    getResults();
  }, [data, results]);

  return (
    <div className="extra">
      <h5>Product Catagories</h5>
      <Link to='/'><button style={{position:"absolute",left:"58.5pc",top:"53px",width:"8pc",height:"40px"}} type="button" className="btn btn-outline-danger">
          Back</button> </Link>
      <ul>
        {results.map((ele) => {
          return (
            <li>
              <Link to={{pathname: `/catagories/list/${ele}`, query: {ele}}} >
                <div
                  className="card"
                  style={{ height: "3.2pc", borderLeft: "10px solid darkblue" ,cursor:"pointer"}}
                >
                  <h4
                    className="card-body"
                    style={{ position: "absolute", top: "-8px", left: "30px" }}
                  >
                    {ele}
                  </h4>
                  <i
                    className="fa-solid fa-angles-right fa-2x"
                    style={{ position: "absolute", top: "8px", left: "680px" }}
                  ></i>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Catagories;
