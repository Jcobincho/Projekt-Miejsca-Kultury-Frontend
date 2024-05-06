import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapImage from "react-bootstrap/Image"; // Zmieniono nazwę importu
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AdminPanel() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setActiveModal(null);
  const handleShow = (modalId) => setActiveModal(modalId);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image(); // Używamy wbudowanego konstruktora Image
        img.src = reader.result;
        img.onload = () => {
          if (img.width === 400 && img.height === 400) {
            setSelectedImage(reader.result);
          } else {
            alert("Wybierz zdjęcie o wymiarach 400x400 pikseli.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage("https://dummyimage.com/400x400/000/fff"); // Usuwanie zdjęcia
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col sm={8}>
          {selectedImage ? (
            <BootstrapImage src={selectedImage} roundedCircle />
          ) : (
            <BootstrapImage
              src="https://dummyimage.com/400x400/000/fff"
              roundedCircle
            />
          )}
        </Col>
        <Col
          sm={4}
          className="d-flex align-items-center"
          style={{ fontSize: "50px" }}
        >
          Imie nazwisko
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={() => handleShow("changePhoto")}>
            Zmień zdjęcie
          </Button>

          <Modal
            show={activeModal === "changePhoto"}
            onHide={handleClose}
            centered
          >
            <Modal.Body>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Zamknij
              </Button>
              {selectedImage && (
                <Button variant="danger" onClick={handleRemoveImage}>
                  Usuń zdjęcie
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </Col>
        <Col sm className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={() => handleShow("resetPassword")}>
            Resetuj hasło
          </Button>

          <Modal
            show={activeModal === "resetPassword"}
            onHide={handleClose}
            centered
          >
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Stare hasło</Form.Label>
                  <Form.Control autoFocus />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Nowe hasło</Form.Label>
                  <Form.Control autoFocus />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Powtórz nowe hasło</Form.Label>
                  <Form.Control autoFocus />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Anuluj
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Zapisz
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col sm className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={() => handleShow("PrawaAdmin")}>
            Nadaj prawa administratora
          </Button>

          <Modal
            show={activeModal === "PrawaAdmin"}
            onHide={handleClose}
            centered
          >
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Podaj adres email użytkownika, by nadać mu prawa
                    administratora
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Anuluj
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Zapisz
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
