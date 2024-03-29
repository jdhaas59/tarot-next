"use client";

// Define an interface for the props
interface DrawButtonProps {
    user: string; // Define the type of the 'user' prop as string
  }

const handleClick = async (user: string) => {
    // console.log(user)
    try {
      const url = 'http://127.0.0.1:8000/api/draw/' + user
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Assuming you're sending JSON data
        },
        // You can include a request body if needed
        body: JSON.stringify({ /* your request body data */ }),
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

export function DrawButton({user}: DrawButtonProps) {
  return (
    <button onClick={() => handleClick(user)} type="submit" >
        draw
    </button>
  );
}