import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import config from '../config.json';
import { getAuthCredentials, isSignedIn } from "../utils";
import Table from "../components/Table";

const Report = () => {
    const [tableData, setTableData] = useState(null);
    const { category } = useParams();

    if(!isSignedIn)
    window.location = '/get-access';

    const getreport = {
        "property": {
            headings: ['Property', 'address', 'city', 'land size', 'rent amount', 'vacant', 'lease start date', 'lease end date', 'tenant'],
            attributes: ['property_title', 'address', 'city', 'land_size', 'rent_amount', 'vacant', 'start_at', 'end_at', 'tenant_name'],
            getFrom: ['/property/get-properties']
        },
        "finance": {
            headings: ['Property', 'vacant', 'income', 'expenses', 'rent amount'],
            attributes: ['property_title', 'vacant', 'income', 'expenses', 'rent_amount'],
            getFrom: ['/finance/get-income-and-expense-statements']
        }
    }

    const r = getreport[category];  // r is `report`

    useEffect(() => {
        let content;
        fetch(config.backend_server + r.getFrom[0], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                userid: getAuthCredentials().userid,
                getTenants: true
            })
        }).then(async (response) => {
            if(response.ok) {
                content = await response.json();
                console.log(content);
                for(let i=0; i<content.length; i++) {
                    content[i].vacant = content[i].vacant ? 'yes' : 'no';
                }
                setTableData(content);
            }
        })
    }, [])
    return ( 
        <>
        { tableData && <Table headings={r.headings} attributes={r.attributes} content={tableData}/>}
        </>
     );
}
 
export default Report;
