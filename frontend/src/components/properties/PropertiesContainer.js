import { useEffect, useState } from "react";
import { getAuthCredentials } from "../../utils";
import config from '../../config.json';

import PropertyCard from './PropertyCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Container = () => {
    const userInfo = getAuthCredentials();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch(config.backend_server + '/property/get-properties', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: userInfo.userid,
                getTenants: false
             })
        }).then(async (response) => {
            if(response.ok) {
                const result = await response.json();
                setProperties(result);
                localStorage.setItem("properties-data", JSON.stringify(result));
            }
        })
    }, [])
    return ( 
        <div id="properties-container">
            <div id="header" className="flex p-2">
                <h4 className="text-bold text-lg">Properties</h4>
                <div className="flex flex-col gap-1 ml-auto">
                <button className="p-0 px-2 w-full bg-slate-200 rounded-sm" onClick={() => window.location = "/add-new-property"}>Add</button>
                <button className="p-0 px-2 w-full bg-slate-200 rounded-sm" onClick={() => window.location = "/report/property"}><FontAwesomeIcon icon={faTable}/> Report</button>
                </div>
            </div>
            <div id="properties-list" className="flex flex-wrap gap-2 m-auto">
                {properties.map((property) => (
                    <span key={property.propertyid} className="m-auto">
                        <PropertyCard propertyData={property}/>
                    </span>
                ))}
            </div>
        </div>
     );
}
 
export default Container;