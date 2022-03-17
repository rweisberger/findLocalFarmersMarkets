import React from 'react';
import Axios from 'axios';
import Accordion from './Accordion';
import './App.css';

function App() {
  const [zip, setZip] = React.useState('12345');
  const [localMarkets, setLocalMarkets] = React.useState([]);
  // const [marketDetails, setMarketDetails] = React.useState([]);
  // const [isActive, setIsActive] = React.useState(false); // for accordion

  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    console.log(zip);
    let urlZip= "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip;
    console.log(urlZip);


  Axios.get(urlZip)
    .then(
      (response) => {
        console.log("Search complete!");
        console.log(response.data.results); 
        setLocalMarkets(response.data.results)
      }
    );  
  };
  
  return <>
  <h1 className="header">Find Local Farmers Markets</h1>
    <form className="form" onSubmit={handleSubmit}> Enter a Zip Code: 
            <input
                type="text"
                className="input"
                value={zip}
                placeholder="zip code"
                onChange={e => setZip(e.target.value)}
            />
    </form> 
  <div className="accordion">
    {localMarkets.map((market, i) => (
  <Accordion market={ market } index= { i } />
  ))} 
  </div>   

  </>
}
export default App;
