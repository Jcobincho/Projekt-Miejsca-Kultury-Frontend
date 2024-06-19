import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, emailUpdate] = useState("");
  const [password, passwordUpdate] = useState("");

  const usenavigate = useNavigate();

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Proszę wpisać email");
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let logobj = { email, password };
        if (validate()) {
            try {
                const response = await fetch('http://localhost:5000/api/sign-in', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(logobj)
                });

                const data = await response.json();
                const message = JSON.stringify(data)
                const messageToDisplay = JSON.parse(message)
                if (response.ok) {
                    localStorage.setItem('token',data.accessToken);
                    localStorage.setItem('name',data.name);
                    localStorage.setItem('surname',data.surname);
                    localStorage.setItem('avatar',data.avatarUrl);
                    localStorage.setItem("role", data.roles);
                    usenavigate('/welcomepage')
                } else {
                    toast.error(`${messageToDisplay.title}`);
                    Object.entries(data.errors).forEach(([key, value]) => {
                        toast.error(value.join(', '));
                });
                }
            } catch (error) {
                console.error("Błąd:",error.message)
            }
        }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Proszę wpisać hasło");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form
          className="container"
          onSubmit={handleSubmit}
          style={{ marginTop: "50px" }}
        >
          <div className="card">
            <div
              className="card-header"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h2>Logowanie</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => emailUpdate(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Hasło</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => passwordUpdate(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <span className="forgot-password">
                  Zapomniałeś hasła?{" "}
                  <Link to={"/forgot-password"}>Kliknij tutaj</Link>
                </span>
              </div>

              <div
                className="card-footer"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                >
                  Zaloguj się
                </button>
                <Link className="btn btn-success" to={"/register"}>
                  Rejestracja
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
