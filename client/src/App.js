import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NewPinForm from "./components/NewPinForm";

const MAPBOX_TOKEN = process.env.REACT_APP_TOKEN;

const App = () => {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  const handleMarkerClick = (id, lat, lon) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: lon });
  };

  const handleAddClick = (e) => {
    const [lon, lat] = e.lngLat;
    setNewPlace({
      lat: lat,
      lon: lon,
    });
  };

  const handlePopupClose = () => {
    setCurrentPlaceId(null);
  };

  const handleShowRegister = () => {
    setShowRegister((prevShowRegister) => !prevShowRegister);
  };

  const handleShowLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      lon: newPlace.lon,
    };

    try {
      const res = await axios.post("pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      console.log("New pin added");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <>
      <div className="App">
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          transitionDuration="200"
          mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onDblClick={handleAddClick}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.lon}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    cursor: "pointer",
                    color: currentUser === p.username ? "tomato" : "slateblue",
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.lon)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.lon}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={handlePopupClose}
                  anchor="left"
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.description}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {newPlace && (
            <>
              <Marker
                latitude={newPlace.lat}
                longitude={newPlace.lon}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    cursor: "pointer",
                    color: "tomato",
                    zIndex: 1,
                  }}
                />
              </Marker>
              <Popup
                latitude={newPlace.lat}
                longitude={newPlace.lon}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setNewPlace(null)}
              >
                <NewPinForm
                  handleSubmit={handleSubmit}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setRating={setRating}
                />
              </Popup>
            </>
          )}
          {currentUser ? (
            <button className="button logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="buttons">
              <button className="button login" onClick={handleShowLogin}>
                Login
              </button>
              <button className="button register" onClick={handleShowRegister}>
                Register
              </button>
            </div>
          )}
          {showRegister && <Register onClose={handleShowRegister} />}
          {showLogin && (
            <Login
              onClose={handleShowLogin}
              setCurrentUser={setCurrentUser}
              localStorage={localStorage}
            />
          )}
        </ReactMapGL>
      </div>
    </>
  );
};

export default App;
