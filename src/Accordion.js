import React from 'react';
import Axios from 'axios';


const Accordion = ({ market, index }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [marketDetails, setMarketDetails] = React.useState([]);

  const formatName = (name) => {
    let stringName = JSON.stringify(name);
    let formattedName = stringName.split(' ').slice(1)
    let reformattedName = formattedName.join(' ').replace('"', '');
    // console.log(reformattedName);
    return reformattedName
  }

  const getMoreInfo = (id) => {
    console.log(id);
    let urlMarketId = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id;

    Axios.get(urlMarketId)
    .then(
      (response) => {
        console.log("Search complete!");
        // console.log(response); 
        setMarketDetails(response.data.marketdetails) 
        console.log(response.data.marketdetails);      
        }
    )        
    .then(setIsActive(!isActive)) //to open accordion
  }
//   return (
//     <div className="accordion-item">
//       <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
//         <div>{title}</div>
//         <div>{isActive ? 'Hide' : 'Info'}</div>
//       </div>
//       {isActive && <div className="accordion-content">{content}</div>}
//     </div>
//   );
// };
return (
 <div className="accordion-item">
       <div className="accordion-title" key={index} id={market.id} onClick={() => getMoreInfo(market.id)}>
         <div>{formatName(market.marketname)}</div>
         <div>{isActive ? 'Hide' : 'Info'}</div>
       </div>
       {isActive && <div key={market.id} id={market.id} className="accordion-content">{JSON.stringify(marketDetails)}</div>}
     </div>)}


export default Accordion;
