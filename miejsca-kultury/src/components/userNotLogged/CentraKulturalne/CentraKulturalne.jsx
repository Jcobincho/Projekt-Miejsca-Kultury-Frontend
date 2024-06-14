import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
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
            const message = JSON.stringify(res)
            const messageToDisplay = JSON.parse(message)
            
            if (response.ok) {
                setPosts(res);
                console.log(posts);
            } 
            else {
                toast.error(`${messageToDisplay.title}`);
                Object.entries(res.errors).forEach(([key, value]) => {
                    toast.error(value.join(', '));
          });
          }
        } catch (error) {
            console.error("Błąd:",error.message)
        }
    };

    const deletePost = async (postId) => {
        let logobj = { postId };
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/api/post/delete-posts", {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logobj)
            });

            const responseStatus = JSON.stringify(response.status);
            if(responseStatus === 401){
                toast.error('Nie można wykonać takiej operacji');
            }
            const res = await response.json();
            const message = JSON.stringify(res)
            const messageToDisplay = JSON.parse(message)

            if (response.ok) {
                toast.success(`${messageToDisplay.message}`);
                setPosts(posts.filter(post => post.id !== postId));
            } else {
              toast.error(`${messageToDisplay.title}`);
              Object.entries(res.errors).forEach(([key, value]) => {
                  toast.error(value.join(', '));
            });
            }
        } catch (error) {
            console.error("Błąd:",error.message)
        }
    };
    

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
      <div 
          style={{ 
              padding: '20px', 
              fontFamily: 'Arial, sans-serif', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
          }}
      >
          <h2 style={{ color: '#333' }}>Centra Kulturalne</h2>
          {Array.isArray(posts) && posts.length > 0 ? (
              posts.map(post => (
                  <div 
                      key={post.id} 
                      style={{ 
                          border: '1px solid #ddd', 
                          borderRadius: '5px', 
                          padding: '15px', 
                          margin: '15px 0', 
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
                          maxWidth: '600px', // Maksymalna szerokość kontenera posta
                          width: '100%', // Kontener posta zajmuje pełną szerokość do maxWidth
                      }}
                  >
                      <h3 style={{ margin: '0 0 10px', color: '#555' }}>Obiekt: {post.title}</h3>
                      <p style={{ margin: '0 0 10px', color: '#777' }}>Opis: {post.description}</p>
                      {post.images && (
                          <img 
                              src={post.images} 
                              alt={post.title} 
                              style={{ width: '100%', maxWidth: '400px', height: 'auto', marginBottom: '10px' }} 
                          />
                      )}
                      <p style={{ margin: '0 0 10px', color: '#777' }}>Ocena: {post.rating}</p>
                      <button 
                          onClick={() => deletePost(post.id)} 
                          style={{ 
                              padding: '10px 15px', 
                              backgroundColor: '#f44336', 
                              color: '#fff', 
                              border: 'none', 
                              borderRadius: '3px', 
                              cursor: 'pointer' 
                          }}
                      >
                          Usuń
                      </button>
                      <Link className="btn btn-success" to={`/update-posts`}>Edytuj</Link>
                      <Link className="btn btn-primary" to={`/map`}>Przeglądaj na Mapie</Link>
                  </div>
              ))
          ) : (
              <p style={{ color: '#777' }}>Brak postów do wyświetlenia.</p>
          )}
          <ToastContainer />
      </div>
  );
  
  
};

export default CentraKulturalne;
