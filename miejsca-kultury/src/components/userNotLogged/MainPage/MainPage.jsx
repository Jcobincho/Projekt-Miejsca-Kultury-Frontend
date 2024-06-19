import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import IK from "../../../components/ImagesMainPage/Intytucje Kulturalne.jpg";
import CK from "../../../components/ImagesMainPage/Centra Kulturalne.jpg";
import B from "../../../components/ImagesMainPage/Biblioteki.jpg";
import MH from "../../../components/ImagesMainPage/Miejsca Historyczne.jpg";
import MR from "../../../components/ImagesMainPage/Miejsca Rekreacyjne.jpg";
import MRR from "../../../components/ImagesMainPage/Miejsca Religijne.jpg";

function MainPage() {
  const cardTextStyle = {
    minHeight: "150px", // Ustaw minimalną wysokość dla tekstu w karcie
  };

  return (
    <Container>
      <Row className="px-4 my-5 justify-content-center">
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={IK} />
            <Card.Body className="text-center">
              <Card.Title>Instytucje kulturalne</Card.Title>
              <Card.Text style={cardTextStyle}>
                Odkryj bogactwo kultury w lokalnych muzeach, galeriach i
                teatrach. Poznaj miejsca, które kształtują naszą tożsamość
                kulturową.
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
            <Card.Img variant="top" src={CK} />
            <Card.Body className="text-center">
              <Card.Title>Centra kulturalne</Card.Title>
              <Card.Text style={cardTextStyle}>
                Centra kulturalne to serce społeczności lokalnej, oferujące
                warsztaty, wydarzenia i wystawy dla każdego.
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
            <Card.Img variant="top" src={B} />
            <Card.Body className="text-center">
              <Card.Title>Biblioteki i centra naukowe</Card.Title>
              <Card.Text style={cardTextStyle}>
                Biblioteki i centra naukowe to bramy do wiedzy, oferujące zasoby
                edukacyjne i badawcze dla wszystkich grup wiekowych.
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
      {/* Drugi wiersz kart */}
      <Row className="px-4 my-5 justify-content-center">
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={MR} />
            <Card.Body className="text-center">
              <Card.Title>Miejsca Rekreacyjne</Card.Title>
              <Card.Text style={cardTextStyle}>
                Ciesz się czasem wolnym w parkach, na placach zabaw i innych
                miejskich przestrzeniach rekreacyjnych dostępnych dla każdego.
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
            <Card.Img variant="top" src={MRR} />
            <Card.Body className="text-center">
              <Card.Title>Miejsca Religijne</Card.Title>
              <Card.Text style={cardTextStyle}>
                Odwiedź miejsca kultu religijnego, które są nie tylko centrami
                duchowości, ale także często dziełami sztuki i historii.
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
            <Card.Img variant="top" src={MH} />
            <Card.Body className="text-center">
              <Card.Title>Miejsca Historyczne</Card.Title>
              <Card.Text style={cardTextStyle}>
                Odkryj historię i dziedzictwo naszego regionu, zwiedzając
                zabytki i miejsca o znaczeniu historycznym.
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
