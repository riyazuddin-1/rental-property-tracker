import React, { useState, useEffect } from 'react';

import config from '../../config.json';

const IncomeForm = () => {
    const [properties, setProperties] = useState(null);
    const [typeOther, setType] = useState(false);
    const [today, setToday] = useState(null);
    const [rentIndex, setRentIndex] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(e.currentTarget);
        form.append("rent_amount", properties[rentIndex].rent_amount);
        console.log(Object.fromEntries(form.entries()));
        fetch(config.backend_server + '/finance/add-income', {
        method: "POST",
        body: form
        }).then(response => {
        if(response.ok)
        window.location.reload();
        })
    }
    
    useEffect(() => {
      const temp = localStorage.getItem("properties-data");
      setProperties(JSON.parse(temp));

      const d = new Date();
      setToday(d.toISOString().split('T')[0].slice(0, 7));
    }, [])

    return ( 
        <form onSubmit={handleSubmit}>
      <h2>Income Entry Form</h2>
      <div className="flex flex-col space-y-4">
        {/* property */}
      <div className="flex flex-col">
          <label htmlFor="property" className="text-sm font-medium mb-1">
            Property:
          </label>
          <select
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="property"
            name='propertyid'
            onChange={(e) => {
              setRentIndex(e.target.selectedOptions[0].dataset.index)
            }}
            required
          >
            { properties && properties.map((property, index) => (
              <option key={property.propertyid} value={property.propertyid} data-index={index}>
                {property.property_title}
              </option>
            ))}
          </select>
        </div>

        {/* income type */}
        <div className="flex flex-col">
          <label htmlFor="incomeType" className="text-sm font-medium mb-1">
            Income Type:
          </label>
          <select
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="incomeType"
            name="income_type"
            onChange={(e) => setType(e.currentTarget.value=='other')}
            required
          >
            <option value="rent">Rent</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Amount */}
        { typeOther && <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm font-medium mb-1">
            Amount:
          </label>
          <input
            type="number"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="amount"
            name='amount'
            required
          />
        </div>}

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Description:
          </label>
          <textarea
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="description"
            name='description'
            rows="3"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium mb-1">
            Date:
          </label>
          <input
            type="month"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="date"
            name='date'
            defaultValue={today}
            required
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
     );
}
 
export default IncomeForm;