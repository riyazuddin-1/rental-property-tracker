const Table = ({ headings, attributes, content }) => {
  console.log({ headings, attributes, content });
    return ( 
      <div id="tenants" className="overflow-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-sm text-left font-medium">
              {
                headings.map((heading, index) => (
                    <th key={index} className="px-4 py-2">{ heading }</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            { content.length && content.map((record, index) => (
              <tr key={index} className="border-b border-gray-300">
                {
                    attributes.map((attr, index) => (
                        <td key={index} className="px-4 py-2">{ record.hasOwnProperty(attr) ? record[attr] : 'N/A' }</td>
                    ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     );
}
 
export default Table;