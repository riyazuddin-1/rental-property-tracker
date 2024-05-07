import { isSignedIn, getAuthCredentials } from "../../utils";
import config from "../../config.json";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const PropertyForm = () => {
  const [vacant, setVacant] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [minDate, setMinDate] = useState(null);
  const [disableForm, setDisableForm] = useState(false);

  if(!isSignedIn)
    window.location = '/get-access';

  const userInfo = getAuthCredentials();

  const handleImageChange = (event) => {
    try {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
        setImageUrl(readerEvent.target.result);
        // console.log(readerEvent.target.result);
        };

        reader.readAsDataURL(selectedFile);
    } catch {
        console.log("File not selected");
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableForm(true);
    const tenantForm = new FormData();
    const tenantData = document.getElementsByClassName("tenant-data");
    for(var i=0; i<tenantData.length; i++) {
      console.log(tenantData[i]);
      tenantForm.append(tenantData[i].getAttribute('id'), tenantData[i].value);
    }
    console.log(Object.fromEntries(tenantForm.entries()));
    setVacant(true);
    const form = e.currentTarget;
    var propertyForm = new FormData(form);
    propertyForm.append("tenant", JSON.stringify(Object.fromEntries(tenantForm.entries())));
    propertyForm.append("userid", userInfo.userid);
    console.log(Object.fromEntries(propertyForm.entries()));
    fetch(config.backend_server + '/property/add-property', {
      method: 'POST',
      body: propertyForm
    }).then((response)=> {
        if(response.ok) {
            console.log("form data sent");
            window.location.reload();
        } else {
          setDisableForm(false);
        }
    })
  }

const style = {}
imageUrl ? 
    style["backgroundImage"] = "url("+ imageUrl +")" : 
    delete style["backgroundImage"];

    return (
      <form className="flex flex-col space-y-4 max-w-2xl m-auto" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Property Form</h2>
        <div className="flex flex-col">
          <label htmlFor="propertyTitle" className="text-sm font-medium mb-1">
            Property Title:
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="propertyTitle"
            name="property_title"
            required
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">Add an Image</p>
          <div className="flex flex-col space-x-4 my-4">
              <div className="grid place-content-center bg-cover bg-center border-dashed border-2 border-gray-400 rounded-lg aspect-video" style={style}>
                  { !imageUrl && <FontAwesomeIcon className="text-slate-500" icon={faCamera} /> }
              </div>
              <div className="grid place-content-center p-4">
                  <div>
                      <label htmlFor="avatar-file" className="cursor-pointer">
                          <p className="px-2 py-1 text-sm border border-gray-300 rounded-md w-fit">Choose Image</p>
                          <input id="avatar-file" type="file" className="hidden" onChange={ handleImageChange } name="image" accept="image/*" required/>
                      </label>
                  </div>
              </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="addressLine1" className="text-sm font-medium mb-1">
            Address:
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="address"
            name="address"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="addressLine2" className="text-sm font-medium mb-1">
            City/Town:
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="city/town"
            name="city"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="addressLandmark" className="text-sm font-medium mb-1">
            Landmark:
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="addressLandmark"
            name="address_landmark"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="propertyType" className="text-sm font-medium mb-1">
            Property Type:
          </label>
          <select
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="propertyType"
            name="property_type"
            required
          >
            <option value="">Select</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="landSize" className="text-sm font-medium mb-1">
            Land Size (sq.ft):
          </label>
          <input
            type="number"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="landSize"
            name="land_size"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rentAmount" className="text-sm font-medium mb-1">
            Rent Amount:
          </label>
          <input
            type="number"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="rentAmount"
            name="rent_amount"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="vacant" className="text-sm font-medium mb-1">Vacant:</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="vacantYes"
              name="vacant"
              value="yes"
              onClick={() => setVacant(true) }
              className="w-4 h-4 rounded-full border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            <label htmlFor="vacantYes" className="text-sm">Yes</label>
            <input
              type="radio"
              id="vacantNo"
              name="vacant"
              value="no"
              onClick={() => setVacant(false) }
              className="w-4 h-4 rounded-full border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            <label htmlFor="vacantNo" className="text-sm">No</label>
          </div>
        </div>
        { !vacant && <div className="p-2 border-dashed border-2">
          <div className="flex flex-col">
          <label htmlFor="tenantName" className="text-sm font-medium mb-1">
            Tenant Name:
          </label>
          <input
            type="text"
            className="tenant-data rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="tenant_name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contactNumber" className="text-sm font-medium mb-1">
            Contact Number:
          </label>
          <input
            type="tel" // Specify type as tel for phone number input
            className="tenant-data rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="contact_number"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email (Optional):
          </label>
          <input
            type="email"
            className="tenant-data rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="startAt" className="text-sm font-medium mb-1">
            Start Date:
          </label>
          <input
            type="month"
            className="tenant-data rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="start_at"
            onInput={(e) => {
              setMinDate(e.currentTarget.value)
            }}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endAt" className="text-sm font-medium mb-1">
            End Date:
          </label>
          <input
            type="month"
            className="tenant-data rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:text-slate-500"
            id="end_at"
            min={minDate}
            defaultValue={minDate}
            required
            disabled={!minDate}
          />
        </div>
        </div> }
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Description (Optional):
          </label>
          <textarea
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="description"
            name="description"
            rows="3"
          />
        </div>
        <button className="" disabled={disableForm}>submit</button>
      </form>
    );
  };
  
  export default PropertyForm;
  