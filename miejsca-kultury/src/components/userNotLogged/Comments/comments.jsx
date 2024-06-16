import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Comments() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [uuid, setPlaceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {                                                           // tutaj potrzeba znania 'Category'
          const response = await fetch(`http://localhost:5000/api/post/1}`, {
            method: 'GET'
          });
          const data = await response.json();
          if (data.length > 0) {
            const { id, message } = data[0];
            setPlaceId(id);
            console.log(id, message);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Wystąpił błąd podczas pobierania danych.');
      }
    };

    fetchData();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    if (!comment.trim()) {
      toast.warning('Komentarz nie może być pusty.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/comment/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },                              // tutaj potrzeba znania 'uuid' dla zdjęć
        body: JSON.stringify({ placeId: 'c77ef802-6a16-44fd-ad55-afbab530eac4', message: comment })
      });

      const res = await response.json();

      if (response.ok) {
        toast.success(`${res.message}`);
        setComments((prevComments) => [...prevComments, { id: res.id, message: comment }]);
        setComment('');
      } else {
        Object.entries(res.errors).forEach(([key, value]) => {
          toast.error(value.join(', '));
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Wystąpił błąd podczas dodawania komentarza.');
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const deleteComment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/comment/delete-comment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId: '03d7df48-429f-447a-843c-8eed56cc03a9'})
      });

      if (response.ok) {
        toast.success('Komentarz został usunięty.');
        setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
      } else {
        toast.error('Wystąpił błąd podczas usuwania komentarza.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Wystąpił błąd podczas usuwania komentarza.');
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const updateComment = async (id, newMessage) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/comment/update-comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId: id, newMessage: newMessage })
      });

      if (response.ok) {
        toast.success('Komentarz został zaktualizowany.');
        setComments((prevComments) => prevComments.map(comment => comment.id === id ? { ...comment, message: newMessage } : comment));
      } else {
        const res = await response.json();
        toast.error(`Wystąpił błąd podczas aktualizacji komentarza: ${res.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Wystąpił błąd podczas aktualizacji komentarza.');
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <div className="comment-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="comment-input-container" style={{ marginTop: '10px' }}>
        <TextField
          className="comment-input"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Dodaj komentarz..."
          multiline
          rows={2}
          variant="outlined"
          style={{ backgroundColor: '#f0f0f0', width: '100%' }}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <Button
          className="submit-button"
          onClick={submitComment}
          variant="contained"
          color="primary"
        >
          Wyślij
        </Button>
      </div>

      <div className="comment-box" style={{ marginTop: '20px', width: '100%', maxWidth: '600px', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
        <h3>Komentarze:</h3>
        {comments.length === 0 ? (
          <p>Brak komentarzy</p>
        ) : (
          <ul style={{ padding: '0', margin: '0', width: '100%' }}>
            {comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: '10px', listStyleType: 'none', padding: '5px', backgroundColor: '#fff', borderRadius: '3px', wordWrap: 'break-word' }}>
                {comment.message}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteComment(comment.id)}
                    style={{ marginRight: '5px' }}
                  >
                    Usuń
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const newMessage = prompt('Edytuj komentarz:', comment.message);
                      if (newMessage) {
                        updateComment(comment.id, newMessage);
                      }
                    }}
                  >
                    Edytuj
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Comments;
