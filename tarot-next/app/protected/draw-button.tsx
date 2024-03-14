"use client";
const handleClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/draw', {
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

export function DrawButton() {
  return (
    <button onClick={handleClick} type="submit" >
        draw
    </button>
  );
}