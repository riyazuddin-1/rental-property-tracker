import { useEffect, useState } from 'react';
import config from '../../config.json';

import Table from '../Table';

const PropertyReport = ({ propertyid }) => {
    const [content, setContent] = useState([]);
    const [element, setElement] = useState('rent_roll');

    console.log(propertyid);

    const elements = {
        'rent_roll': {
            headings: ['Month', 'Added on', 'Description'],
            attributes: ['paid_for_month', 'last_updated', 'description'],
            route: '/get-property-rent-roll',

        },
        'other_income': {
            headings: ['Amount', 'Month', 'Added on', 'Description'],
            attributes: ['amount', 'paid_for_month', 'last_updated', 'description'],
            route: '/get-property-income',
        },
        'expenses': {
            headings: ['Amount', 'Added on', 'Description'],
            attributes: ['amount', 'last_updated', 'description'],
            route: '/get-property-expenses'
        }
    }

    const renderTab = (e, element) => {
        const current = document.getElementsByClassName('active')[0];
        current.classList.remove('active', 'border-b-2', 'border-cyan-800');
        e.currentTarget.classList.add('active', 'border-b-2', 'border-cyan-800');
        setElement(element);
    }

    const fetchData = async (propertyid, route) => {
        fetch(config.backend_server + '/finance' + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'propertyid': propertyid })
        }).then(async (response) => {
            if(response.ok) {
                let result = await response.json();
                console.log(result);
                setContent(result);
            }
        })
    }

    useEffect(() => {
        fetchData(propertyid, elements[element].route);
        console.log(element);
    }, [element]);

    return ( 
        <div className='p-2'>
            <div className='flex'>
                <span className='active border-b-2 border-cyan-800 flex-1 cursor-pointer' 
                onClick={(e) => {
                    renderTab(e, 'rent_roll');
                }}>
                    Rent roll
                </span>
                <span className='flex-1 cursor-pointer'
                onClick={(e) => {
                    renderTab(e, 'other_income');
                }}>
                    Other incomes
                </span>
                <span className='flex-1 cursor-pointer'
                onClick={(e) => renderTab(e, 'expenses')}>
                    Expenses
                </span>
            </div>
            {
                content.length ? 
                <Table headings={elements[element].headings} attributes={elements[element].attributes} content={content}/>
                :
                <p className='text-sm text-slate-600'>No data available</p>
            }
        </div>
     );
}
 
export default PropertyReport;