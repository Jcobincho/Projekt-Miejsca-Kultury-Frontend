import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <Container>
      <Row className="px-4 my-5 justify-content-center">
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://dummyimage.com/400x500/000/fff"
            />
            <Card.Body className="text-center">
              <Card.Title>Instytucje kulturalne</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                className="link-danger link-underline-opacity-0"
                to={"/instytucje-kulturalne"}
              >
                <Button variant="primary">Zobacz więcej</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://dummyimage.com/400x500/000/fff"
            />
            <Card.Body className="text-center">
              <Card.Title>Centra kulturalne</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                className="link-danger link-underline-opacity-0"
                to={"/centra-kulturalne"}
              >
                <Button variant="primary">Zobacz więcej</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://dummyimage.com/400x500/000/fff"
            />
            <Card.Body className="text-center">
              <Card.Title>Biblioteki i centra naukowe</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                className="link-danger link-underline-opacity-0"
                to={"/centra-naukowe"}
              >
                <Button variant="primary">Zobacz więcej</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="px-4 my-5 justify-content-center">
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://dummyimage.com/400x500/000/fff"
            />
            <Card.Body className="text-center">
              <Card.Title>Miejsca Rekreacyjne</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                className="link-danger link-underline-opacity-0"
                to={"/miejsca-rekreacyjne"}
              >
                <Button variant="primary">Zobacz więcej</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://dummyimage.com/400x500/000/fff"
            />
            <Card.Body className="text-center">
              <Card.Title>Miejsca Religijne</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                className="link-danger link-underline-opacity-0"
                to={"/miejsca-religijne"}
              >
                <Button variant="primary">Zobacz więcej</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://dummyimage.com/400x500/000/fff"
            />
            <Card.Body className="text-center">
              <Card.Title>Miejsca Historyczne</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                className="link-danger link-underline-opacity-0"
                to={"/miejsca-historyczne"}
              >
                <Button variant="primary">Zobacz więcej</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default MainPage;
