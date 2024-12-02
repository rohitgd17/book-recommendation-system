import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () =>{
	const [name,setName]=useState('');
	const [books,setBooks]=useState([]);
	const navigate=useNavigate();
	console.log("Gerrrrrrrr")
	useEffect(()=>{
		const userName=sessionStorage.getItem('userName');
		if(!userName){
			alert("you are not logged in!!");
			navigate("/login");
		}
		else{
			setName(userName);
			console.log("asaaaaaaaaa")
			fetchBooks();
		}
	},[navigate]);
	
	const fetchBooks = async () => {
    try {
        const response = await fetch('/api/books');
        if (response.ok) {
            const data = await response.json();
            console.log("Fetched books:", data); // Log the fetched data here
            setBooks(data);
        } else {
            console.log("Failed to fetch books");
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

	
	return(
		<div>
			<h1>Welcome, {name}</h1>
			<h2>Your Book recommendation</h2>
			<ul>
    {books.map((book, index) => (
        <li key={book.id || index}> {/* Using book.id or the index as fallback */}
            <strong>{book.title}</strong> by {book.author}
        </li>
    ))}
</ul>

		</div>
	);
		
	
};

export default Dashboard;