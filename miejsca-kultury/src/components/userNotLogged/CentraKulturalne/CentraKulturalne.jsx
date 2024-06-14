import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LocationFunction from '../ImageSystem/Location';
import TextFieldSection from '../ImageSystem/Comment';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CentraKulturalne = () => {
    const [posts, setPosts] = useState(null);
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [newTitle, setName] = useState('');
    const [newDescription, setDescription] = useState('');
    const [newCategory,setSelectedPlace] = useState();
    const [editingPostId, setEditingPostId] = useState(null);
    const [editingPost, setEditingPost] = useState({
        name: '',
        description: '',
        category: '',
        location: { lat: null, lng: null }
    });

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/post/1");
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
    
    const handleEditClick = (post) => {
      setEditingPostId(post.id);
      setEditingPost({
          name: post.title,
          description: post.description,
          category: post.category,
          location: { lat: post.LocalizationX, lng: post.LocalizationY }
      });
    };

    const handleLocationChange = (lat, lng) => {
      setLocation({ lat, lng });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value)
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        console.log(event.target.value)
    };

    const handlePlaceChange = (event) => {
        setSelectedPlace(Number(event.target.value));
    }

    const handleUpdatePost = async (postId) => {
        const data = {
          postId,
          newTitle,
          newLocalizationX: location.lat,
          newLocalizationY: location.lng,
          newDescription,
          newCategory
      };
        console.log(data);
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            //let logobj = { postId, name, newLocalizationX, newLocalizationY, Description, Category }
            console.log(data)
            const response = await fetch('http://localhost:5000/api/post/update-posts', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            });
            const responseStatus = JSON.stringify(response.status);
            if(responseStatus === 401){
                toast.error('Nie można wykonać takiej operacji');
            }
            const res = await response.json();
            const message = JSON.stringify(res);
            const messageToDisplay = JSON.parse(message);

            if (response.ok) {
                toast.success(`${messageToDisplay.message}`);
                setPosts(posts.filter(post => post.id !== postId));
            }
            else{
                toast.error(`${messageToDisplay.title}`);
                Object.entries(res.errors).forEach(([key, value]) => {
                    toast.error(value.join(', '));
                });
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ color: '#333' }}>Centra Kulturalne</h2>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px', margin: '15px 0', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', maxWidth: '600px', width: '100%' }}>
                        {editingPostId === post.id ? (
                            <div>
                                <h3>Edytuj Post</h3>
                                <select value={editingPost.category} name="category" onChange={handlePlaceChange} className="styled-select">
                                    <option value={0}>Wybierz rodzaj miejsca</option>
                                    <option value={1}>Centra kulturalne</option>
                                    <option value={2}>Centra naukowe</option>
                                    <option value={3}>Instytucje kulturalne</option>
                                    <option value={4}>Miejsca historyczne</option>
                                    <option value={5}>Miejsca rekreacyjne</option>
                                    <option value={6}>Miejsca religijne</option>
                                </select>
                                <TextFieldSection onChange={handleNameChange} placeholder={'Nowa nazwa miejsca'} />
                                <TextFieldSection onChange={handleDescriptionChange} placeholder={'Nowy opis miejsca'} />
                                <LocationFunction onLocationChange={handleLocationChange} />
                                <button type="button" className="image_sent" onClick={() => handleUpdatePost(post.id)}>Zaktualizuj</button>
                                <button type="button" onClick={() => setEditingPostId(null)}>Anuluj</button>
                            </div>
                        ) : (
                            <div>
                                <h3 style={{ margin: '0 0 10px', color: '#555' }}>Obiekt: {post.title}</h3>
                                <p style={{ margin: '0 0 10px', color: '#777' }}>Opis: {post.description}</p>
                                {post.images && (
                                    <img src={post.images} alt={post.title} style={{ width: '100%', maxWidth: '400px', height: 'auto', marginBottom: '10px' }} />
                                )}
                                <p style={{ margin: '0 0 10px', color: '#777' }}>Ocena: {post.rating}</p>
                                <button onClick={() => deletePost(post.id)} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                                    Usuń
                                </button>
                                <button onClick={() => handleEditClick(post)} style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', marginLeft: '10px' }}>
                                    Edytuj
                                </button>
                                <Link className="btn btn-primary" to={`/map`} style={{ padding: '10px 15px', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', marginLeft: '10px' }}>
                                    Przeglądaj na Mapie
                                </Link>
                            </div>
                        )}
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
