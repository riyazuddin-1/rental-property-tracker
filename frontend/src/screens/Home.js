import { useState } from 'react';

import PropertiesContainer from '../components/properties/PropertiesContainer';
import TenantTable from '../components/Tenants';
import FinancesContainer from '../components/finances/FinancesContainer';

import { isSignedIn } from '../utils';

const Home = () => {
    if(!isSignedIn)
    window.location = '/get-access';

    return ( 
        <div className='grid gap-2'>
            <PropertiesContainer/>
            <hr/>
            <FinancesContainer/>
            <hr/>
            <TenantTable/>
        </div>
     );
}
 
export default Home;