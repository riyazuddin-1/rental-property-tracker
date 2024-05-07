import React, { useState, useEffect } from 'react';
import config from "../config.json";
import { getAuthCredentials } from '../utils';
import Table from './Table';

const TenantTable = ({}) => {
    const [tenants, setTenants] = useState([])
    const headings = ['Tenant Name', 'Property Title', 'Rent Amount', 'Contact Number'];
    const attributes = ['tenant_name', 'property_title', 'rent_amount', 'contact_no'];
    useEffect(() => {
        fetch(config.backend_server + '/tenants/get-tenants-list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"userid": getAuthCredentials().userid})
        }).then(async (response) => {
            if(response.ok) {
                let result = await response.json();
                setTenants(result);
                // setTenants(result.map(tenant => {
                //     tenant["start_at"] = tenant.start_at.split("T")[0];
                //     tenant["end_at"] = tenant.end_at.split("T")[0];
                //     return tenant;
                // }))
            }
        })
    }, [])
  return (
    <div className='p-2'>
    <h4 className='text-bold text-lg'>Tenants</h4>
    { tenants.length && <Table headings={headings} attributes={attributes} content={tenants}/> }
    </div>
  );
};

export default TenantTable;
