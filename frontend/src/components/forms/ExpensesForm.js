import React, { useState, useEffect } from 'react';

import config from '../../config.json';

const ExpensesForm = ({}) =>  {
  const [properties, setProperties] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.currentTarget);
    console.log(Object.fromEntries(form.entries()));
    fetch(config.backend_server + '/finance/add-expense', {
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
  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <h2>Account Entry Form</h2>

      <div className="flex flex-col space-y-4">

        {/* Property */}
      <div className="flex flex-col">
          <label htmlFor="property" className="text-sm font-medium mb-1">
            Property:
          </label>
          <select
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="property"
            name='propertyid'
            required
          >
            { properties && properties.map((property) => (
              <option key={property.propertyid} value={property.propertyid}>
                {property.property_title}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="flex flex-col">
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
            required
          />
        </div>

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
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  )
};

export default ExpensesForm;
