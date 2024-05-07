import React from "react";

export default function Modal({ title, body, trigger }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className='bg-slate-600 text-white p-2 px-3 rounded-full ms-auto'
        type="button"
        onClick={() => setShowModal(true)}
      >
        { trigger }
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 p-2 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg p-2 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-slate-800 text-4xl outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                  <h4 className="text-3xl font-semibold">
                    {title}
                  </h4>
                </div>
                {/*body*/}
                {
                    body
                }
                {/*footer*/}
                <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-1 bg-black cursor-pointer" onClick={() => setShowModal(false)}></div>
        </>
      ) : null}
    </>
  );
}