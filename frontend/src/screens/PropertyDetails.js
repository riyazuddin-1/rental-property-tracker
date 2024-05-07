import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TenantForm from '../components/forms/TenantForm';

import { getAuthCredentials } from '../utils'

import config from '../config.json';
import PropertyReport from '../components/properties/PropertyReport';

const PropertyDetails = ({}) => {
    const [propertyData, setPropertyData] = useState({});
    const [tenant, setTenant] = useState({});
    const [loading, setLoading] = useState(true);
    const [initial, setInitial] = useState(true);
    const [additionalData, setAdditionalData] = useState({});

    const {propertyid} = useParams();
  
  useEffect(() => {
    if(propertyid)
    fetch(config.backend_server + '/property/get-property-info', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "propertyid": propertyid,
          "getTenants": true
        })
    }).then(async (response) => {
        let result;
        if(response.ok) {
            result = await response.json();
            console.log(result)
            setPropertyData(result);
            setLoading(false);
            if(result.vacant) {
              setAdditionalData({
                ownerid: propertyData.userid,
                propertyid: propertyData.propertyid,
                rent_amount: propertyData.rent_amount
              })
            } else {
              setTenant({
                tenant_name: result.tenant_name,
                contact_no: result.contact_no,
                email: result.email
              })
            }
        }
    })
  },[])

  return (
    <>
    { loading ? 
    <p>Loading...</p> :
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Property Details</h1>
      <div className="flex flex-wrap justify-between mb-8">
        <div className="w-full md:w-1/2">
          <h2>{propertyData.property_title}</h2>
          <p className="text-gray-600">Address:</p>
          <p>{propertyData.address}</p>
          <p>{propertyData.address_landmark}</p>
          <p>{propertyData.city}</p>
        </div>
        <div className="w-full md:w-1/2">
          <img src={propertyData.image_url} alt="Property Image" className="rounded-lg shadow-md" />
        </div>
      </div>
      <div>
        <h2>Tenant Information</h2>
        {Object.keys(tenant).length ? <>
          <p className='text-slate-800'>Tenant Name: <span className='text-black'>{tenant.tenant_name}</span></p>
          <p className='text-slate-800'>Contact: <span className='text-black'>{tenant.contact_no}</span></p>
          { tenant.email && <p className='text-slate-800'>Email: <span className='text-black'>{tenant.email}</span></p>}
          {/* <p className='text-slate-800'>Start At: <span className='text-black'>{tenant.start_at}</span></p>
          <p className='text-slate-800'>End At: <span className='text-black'>{tenant.end_at}</span></p> */}
        </> :
        <>
        { initial && <>
        <p className='text-slate-800'>No tenant information is available.</p>
        {propertyData.userid == getAuthCredentials().userid && <>
        <p className=' text-blue-700 cursor-pointer' onClick={() => setInitial(false)}>add tenant</p>
        </>}
        </>}
        {!initial && <>
        <TenantForm extendJson={additionalData}/>
        </>}
        </>
        }
      </div>
      
      <div>
        <h2>Property Details</h2>
        <ul className="list-disc pl-4">
          <li>Land Size: {propertyData.land_size} sq ft</li>
          { propertyData.description && <li>{propertyData.description}</li>}
        </ul>
      </div>
      
      <PropertyReport propertyid={propertyData.propertyid}/>
    </div>
    }
    </>
  );
};

export default PropertyDetails;
