import { useEffect, useState } from "react";

import config from '../../config.json';
import { getAuthCredentials, isSignedIn } from "../../utils";
import Table from "../../components/Table";

const Finances = () => {
    const [tableData, setTableData] = useState(null);

    if(!isSignedIn)
    window.location = '/get-access';

    const headings = ['Property', 'vacant', 'income', 'expenses', 'rent amount']
    const attributes = ['property_title', 'vacant', 'income', 'expenses', 'rent_amount']

    useEffect(() => {
        let content;
        fetch(config.backend_server + '/finance/get-income-and-expense-statements', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                userid: getAuthCredentials().userid
            })
        }).then(async (response) => {
            if(response.ok) {
                content = await response.json();
                console.log(content);
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
 
export default Finances;
