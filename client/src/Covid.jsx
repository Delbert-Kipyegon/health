import React from 'react'
import { useRef } from 'react';

export default function Covid() {

    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name =  e.target.elements.name.value
        const phone = e.target.elements.phone.value

        const formData = {name, phone}; 
        e.target.reset();

        console.log(phone);
        
        fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
    };

  return (
    <div className='  flex flex-col justify-center items-center'>
        <div className="header flex justify-center p-4">
          <h2 className='font-bold text-2xl '> COVID TESTS 
            </h2>  
        </div>
        <div className="form w-[70%] flex justify-center bg-blue-500 rounded-xl  mx-auto p-20">
            <form onSubmit={handleSubmit}  ref={form}>
                <div>
                    <label htmlFor="" className='text-sm'> Your Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder='Your Name'
                        className='ring-1 focus:ring-2 mt-2 focus:ring-teal-300 ring-gray-300 w-full rounded-md px-4 py-2 outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="" className='text-sm'> Phone Number</label>
                    <input
                        name="phone"
                        type="text"
                        placeholder='Your Phone'
                        className='ring-1 focus:ring-2 mt-2 focus:ring-teal-300 ring-gray-300 w-full rounded-md px-4 py-2 outline-none'
                    />
                </div>
                <button 
                    type='submit'  
                    className='inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 mt-3 uppercase text-sm'>
                        Submit
              </button>
            </form>
        </div>
    </div>
  )
}
