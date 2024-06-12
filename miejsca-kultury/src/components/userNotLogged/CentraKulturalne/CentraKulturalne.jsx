import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CentraKulturalne = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/post/1");
            // centra kulturalne = 1
            // centra nauki = 2
            // instytucje kultury = 3
            // miejsca historyczne = 4
            // miejsca rekreacyjne = 5
            // miejsce religijne = 6

            const res = await response.json();
            console.log(res)
            if (response.ok) {
                setPosts(res.posts);

            } else {
                toast.error("Wystąpił błąd podczas pobierania postów.");
            }
        } catch (error) {
            toast.error('Wystąpił błąd podczas pobierania postów.');
        }
    };




    const deletePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Post został pomyślnie usunięty.');
                setPosts(posts.filter(post => post.id !== postId));
            } else {
                const data = await response.json();
                toast.error(`Wystąpił błąd: ${data.message}`);
            }
        } catch (error) {
            toast.error('Wystąpił błąd podczas usuwania posta.');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Centra Kulturalne</h2>
            {posts.map(post => (
                <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    {post.photoUrl && <img src={post.photoUrl} alt={post.title} style={{ width: '200px', height: 'auto' }} />}
                    <p>Ocena: {post.rating}</p>
                    <button onClick={() => deletePost(post.id)}>Usuń</button>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default CentraKulturalne;
