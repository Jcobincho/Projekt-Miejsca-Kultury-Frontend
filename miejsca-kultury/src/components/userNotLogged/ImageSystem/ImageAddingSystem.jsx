import React, { useState } from 'react';
import DragAndDrop from './AddImage';
import LocationFunction from './Location';
import TextFieldSection from './Comment'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ImageSystem() {
    const [Photos, setImage] = useState(null);
    const [location, setLocation] = useState({ lat: null, lng: null });
    
    const [name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Category,setSelectedPlace] = useState();

    const handleImageChange = (newImage) => {
        setImage(newImage ? newImage.file : null);
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

    const handleSubmit = async () => {
        let ValidationError = false;

        if (!Photos) {
            toast.warning("Należy dodać zdjęcie.");
            ValidationError = true;
        }

        if (!name) {
            toast.warning("Należy wpisać nazwę miejsca.");
            ValidationError = true;
        }

        if (!location.lat || !location.lng) {
            toast.warning("Należy wybrać lokalizację na mapie.");
            ValidationError = true;
        }

        if (!Description) {
            toast.warning("Należy wpisać opis miejsca.");
            ValidationError = true;
        }

        if (!Category) {
            toast.warning("Należy wybrać kategorię miejsca.");
            ValidationError = true;
        }

        if (ValidationError) {
            return;
        }

        const data = {
            Photos,
            name,
            LocalizationX: location.lat,
            LocalizationY: location.lng,
            Description,
            Category
        };

        console.log(data);
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const formData = new FormData();
            formData.append('Photos', Photos);
            formData.append('LocalizationX', location.lat);
            formData.append('LocalizationY', location.lng);
            formData.append('title', name);
            formData.append('description', Description);
            formData.append('Category', Category);

            const response = await fetch('http://localhost:5000/api/post/add-posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
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
            }
            else{
                Object.entries(res.errors).forEach(([key, value]) => {
                    toast.error(value.join(', '));
                });
            }
        } catch (error) {

        }
    };

    return (
        <div>
            <select 
                value={Category} 
                onChange={handlePlaceChange} 
                className="styled-select"
            >   
                <option value={0}>Wybierz rodzaj miejsca</option>
                <option value={1}>Centra kulturalne</option>
                <option value={2}>Centra naukowe</option>
                <option value={3}>Instytucje kulturalne</option>
                <option value={4}>Miejsca historyczne</option>
                <option value={5}>Miejsca rekreacyjne</option>
                <option value={6}>Miejsca religijne</option>
            </select>
            <TextFieldSection onChange={handleNameChange} placeholder={'Nazwa miejsca'}/>
            <TextFieldSection onChange={handleDescriptionChange} placeholder={'Opis miejsca'}/>
            <LocationFunction onLocationChange={handleLocationChange} />
            <DragAndDrop onImageChange={handleImageChange} />
            <button type="button" className="image_sent" onClick={handleSubmit}>Wyślij</button>
            <ToastContainer />
            <div style={{ marginBottom: '20px' }}></div>
        </div>
    );
}