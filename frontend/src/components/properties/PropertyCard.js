const PropertyCard = ({ propertyData }) => {
    const style = {
        "backgroundImage": "url("+ propertyData.image_url +")"
    }
    return ( 
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow w-72 m-auto p-2">
            <a href={`/property/${propertyData.propertyid}`}>
            <div className="grid place-content-center bg-cover bg-center rounded-lg aspect-video" style={style}>
                {/* Property image */}
              </div>
            </a>
            <div className="p-2 space-x-2 gap-0">
                <a href="#">
                <h5 className="mb-2 font-bold tracking-tight text-gray-900 ">
                    {propertyData.property_title}
                </h5>
                </a>
                <p className="mb-1 font-normal text-gray-800">
                {
                    propertyData.address
                }
                </p>
                <p className="mb-1 font-normal text-gray-800">
                {
                    propertyData.address_landmark
                }
                </p>
                <p className="mb-1 font-normal text-gray-800">
                {
                    propertyData.city
                }
                </p>
            </div>
            <hr/>
            <div>
                {
                    propertyData.vacant ? 
                    <p className="">Vacant</p> :
                    <p>Occupied</p>
                }
            </div>
        </div>
     );
}
 
export default PropertyCard;