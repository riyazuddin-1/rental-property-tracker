import { useEffect, useState } from "react";

import config from '../../config.json';
import { getAuthCredentials, isSignedIn } from "../../utils";
import Table from "../../components/Table";

const Properties = () => {
    const [tableData, setTableData] = useState(null);

    if(!isSignedIn)
    window.location = '/get-access';
    const headings = ['Property', 'address', 'city', 'land size', 'rent amount', 'vacant', 'tenant', 'contact number']
    const attributes = ['property_title', 'address', 'city', 'land_size', 'rent_amount', 'vacant', 'tenant_name', 'contact_no']


    useEffect(() => {
        let content;
        fetch(config.backend_server + '/property/get-properties', {
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
        { tableData && <Table headings={headings} attributes={attributes} content={tableData}/>}
        </>
     );
}
 
export default Properties;
