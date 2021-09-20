import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

const MAPBOX_TOKEN = process.env.REACT_APP_TOKEN;

function App() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
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
                <div>
                  <form type="submit">
                    <label>Title</label>
                    <input
                      placeholder="Enter a title"
                      onChange={handleTitleChange}
                    ></input>
                    <label>Description</label>
                    <textarea
                      placeholder="Describe this place"
                      onChange={handleDescriptionChange}
                    ></textarea>
                    <label>Rating</label>
                    <select onChange={handleRatingChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button
                      type="submit"
                      className="submitButton"
                      onClick={handleSubmit}
                    >
                      Add Pin
                    </button>
                  </form>
                </div>
              </Popup>
            </>
          )}
          {currentUser ? (
            <button className="button logout">Logout</button>
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
}

export default App;
