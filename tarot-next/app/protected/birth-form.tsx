"use client";

import { SubmitButton } from "../login/submit-button";

  const onSubmit = async (formData: FormData) => {
    const month = formData.get("Month")
    const day = formData.get("Day")
    const year = formData.get("year")
    const user = formData.get("user_id")

    // Concatenate the values with slashes
    const dateString = `${month}/${day}/${year}`
    const birthDate = new Date(dateString); // Assuming you have the birth date as a string
    const isoFormattedBirthDate = birthDate.toISOString().split('T')[0];

    const body = JSON.stringify({ 
      "user_id":user,
      "birth_date":isoFormattedBirthDate
  })
    console.log(body)

    try {
      const url = 'http://127.0.0.1:8000/api/birth/'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Assuming you're sending JSON data
        },
        // You can include a request body if needed
        body: JSON.stringify({ 
          "user_id":user,
          "birth_date":isoFormattedBirthDate
      }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }



  };

// Define an interface for the props
interface BirthFormProps {
  user: string; // Define the type of the 'user' prop as string
}

export function BirthForm({user}: BirthFormProps) {
  return (
    <form className="max-w-md mx-auto">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label htmlFor="month" className="block">Month</label>
        <select
          id="Month"
          name="Month"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="" // You might want to set a default day or leave it empty for the user to select
        >
          <option value="" disabled>Month</option>
          {
            Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))
          }
        </select>
      </div>
      <div>
        <label htmlFor="day" className="block">Day</label>
        <select
          id="Day"
          name="Day"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="" // You might want to set a default day or leave it empty for the user to select
        >
          <option value="" disabled>Day</option>
          {
            Array.from({ length: 31 }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))
          }
        </select>
      </div>
      <div>
        <label htmlFor="year" className="block">Year</label>
        <select
          id="year"
          name="year"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="" // Optionally set a default year or leave it empty
        >
          <option value="" disabled>Year</option>
          {
            Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 1900 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))
          }
        </select>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      
    </div>
      {/* Hidden field */}
    <input type="hidden" id="user_id" name="user_id" value={user} />
    <SubmitButton
          formAction={onSubmit}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Find my Birth Chart
        </SubmitButton>
  </form>
  );
}