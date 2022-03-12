import React from 'react';
import Axios from 'axios';
import Accordion from './Accordion';
import './App.css';

// const Accordion = ({ market, marketDetails, getMoreInfo, formatName}) => {
//   const [isActive, setIsActive] = React.useState(false);

//   return (
//     <div className="accordion-item">
//       <div className="accordion-title" id={market.id} onClick={() => getMoreInfo(market.id)}>
//         <div>{formatName(market.marketname)}</div>
//         <div>{isActive ? 'Hide' : 'Info'}</div>
//       </div>
//       {isActive && <div className="accordion-content">{JSON.stringify(marketDetails)}</div>}
//     </div>
//   );
// };

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

  // const formatName = (name) => {
  //   let stringName = JSON.stringify(name);
  //   let formattedName = stringName.split(' ').slice(1)
  //   let reformattedName = formattedName.join(' ').replace('"', '');
  //   // console.log(reformattedName);
  //   return reformattedName
  // }

  // const getMoreInfo = (id) => {
  //   console.log(id);
  //   let urlMarketId = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id;

  //   Axios.get(urlMarketId)
  //   .then(
  //     (response) => {
  //       console.log("Search complete!");
  //       // console.log(response); 
  //       setMarketDetails(response.data.marketdetails) 
  //       console.log(response.data.marketdetails);      
  //       }
  //   )        
  //   .then(setIsActive(!isActive)) //to open accordion
  // }
  
  return <>
  <h1>Find Local Farmers Markets</h1>
    <form onSubmit={handleSubmit}> Enter a Zip Code: 
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
    //    <div className="accordion-item">
    //    <div className="accordion-title" key={i} id={market.id} onClick={() => getMoreInfo(market.id)}>
    //      <div>{formatName(market.marketname)}</div>
    //      <div>{isActive ? 'Hide' : 'Info'}</div>
    //    </div>
    //    {isActive && <div key={market.id} id={market.id} className="accordion-content">{JSON.stringify(marketDetails)}</div>}
    //  </div>))}
  <Accordion market={ market } index= { i } />
  ))} 
  </div>   

  </>
}
export default App;
