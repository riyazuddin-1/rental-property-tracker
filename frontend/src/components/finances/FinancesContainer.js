import { getAuthCredentials } from '../../utils';
import Finance from './Finances';
import { useEffect, useState } from 'react';

import config from '../../config.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import IncomeForm from '../forms/IncomeForm';
import ExpensesForm from '../forms/ExpensesForm';

const FinancesContainer = () => {
    const [loading, setLoading] = useState(true);
    const [financialInfo, setFinancialInfo] = useState({});

    useEffect(() => {
        fetch(config.backend_server + '/finance/get-total', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"userid": getAuthCredentials().userid})
        }).then( async (response) => {
            if(response.ok) {
                setFinancialInfo(await response.json());
                console.log(financialInfo);
                setLoading(false);
            }
        })
    }, [])
    return ( 
        <div className='my-4 flex flex-col gap-2 p-2'>
            <div className='flex'>
                <h4 className='text-bold text-lg'>Finances</h4>
                <div className='flex flex-col gap-1 ml-auto'>
                <a href='/report/finance'>
                    <button className='bg-slate-200 px-2 rounded-md w-full text-left'><FontAwesomeIcon icon={faTable}/> Breakdown</button>
                </a>
                </div>
            </div>
        { loading ?
            <p>Loading..</p> :
            <div id="financial-outcomes" className='flex flex-col md:flex-row gap-2'>
                <Finance title={"Overall Income"} value={financialInfo.overall_income} form={<IncomeForm/>}/>
                <Finance title={"Overall Expenses"} value={financialInfo.overall_expenses} form={<ExpensesForm/>}/>
            </div>}
        </div>
     );
}
 
export default FinancesContainer;