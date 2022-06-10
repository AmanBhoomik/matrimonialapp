import axios from "axios";
import React, { useEffect, useState } from "react";

function SearchResult() {
  const [serchDdta, setSearchData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:88/api/Users/All")
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error", err1);
      });
  }, []);

  return <div>{serchDdta.map((profile) => {
      
  })}</div>;
}

export default SearchResult;
