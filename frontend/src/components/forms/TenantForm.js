import config from "../../config.json";

const FormInputs = () => {
  return (
    <>
    {/* Tenant name */}
    <div className="flex flex-col">
          <label htmlFor="tenantName" className="text-sm font-medium mb-1">
            Tenant Name:
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="tenant_name"
            required
          />
        </div>

        {/* Contact number */}
        <div className="flex flex-col">
          <label htmlFor="contactNumber" className="text-sm font-medium mb-1">
            Contact Number:
          </label>
          <input
            type="tel" // Specify type as tel for phone number input
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="contact_number"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email (Optional):
          </label>
          <input
            type="email"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="email"
          />
        </div>
    </>
  )
}

const TenantForm = ({ extendJson, type='form' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    for(let key in Object.keys(extendJson)) {
      formData.append(key, extendJson[key]);
    }
    fetch(config.backend_server + '/tenants/add-tenant', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(response.ok) {
        window.location.reload();
      }
    })
  }
    return (
      <>
      {
        type == 'form' ? 
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* <h2>Tenant Information</h2> */}

          <FormInputs/>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        :
        <FormInputs/>
      }
      </>
    );
  };
  
  export default TenantForm;
  