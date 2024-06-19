import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddAnnounces() {
  const [formData, setFormData] = useState({
    date: "",
    dataDescription: "",
    localization: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      date: "",
      dataDescription: "",
      localization: "",
      description: "",
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/announcement/add-announcement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      const message = JSON.stringify(data);
      const messageToDisplay = JSON.parse(message);

      if (response.ok) {
        toast.success(`${messageToDisplay.message}`);
      } else {
        toast.error(`${messageToDisplay.title}`);
        Object.entries(data.errors).forEach(([key, value]) => {
          toast.error(value.join(", "));
        });
      }
    } catch (error) {
      console.error("Błąd: ", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Dodaj Ogłoszenie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataDescription" className="form-label">
            Opis Daty
          </label>
          <input
            type="text"
            className="form-control"
            id="dataDescription"
            name="dataDescription"
            value={formData.dataDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="localization" className="form-label">
            Opis Miejsca
          </label>
          <input
            type="text"
            className="form-control"
            id="localization"
            name="localization"
            value={formData.localization}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Opis Wydarzenia
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Dodaj Ogłoszenie
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
