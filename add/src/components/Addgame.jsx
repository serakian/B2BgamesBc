import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import "./styling/addgame.css";

const AddGame = () => {
  // State for game form
  const [gameName, setGameName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [email, setEmail] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [screenshots, setScreenshots] = useState(null);
  
  // State for product form (from original component)
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState("");
  
  // Shared state for notifications
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlatforms([...platforms, value]);
    } else {
      setPlatforms(platforms.filter(platform => platform !== value));
    }
  };

  const uploadGame = async (e) => {
    e.preventDefault();
    setLoading("Submitting your game...");

    try {
      const data = new FormData();
      data.append("game_name", gameName);
      data.append("developer", developer);
      data.append("email", email);
      data.append("game_description", gameDescription);
      data.append("game_genre", gameGenre);
      data.append("platforms", JSON.stringify(platforms));
      data.append("release_date", releaseDate);
      
      if (screenshots) {
        for (let i = 0; i < screenshots.length; i++) {
          data.append("screenshots", screenshots[i]);
        }
      }

      const response = await axios.post("/api/submit-game", data);
      
      setLoading("");
      setSuccess(response.data.message);
      // Reset form
      setGameName("");
      setDeveloper("");
      setEmail("");
      setGameUrl("");
      setGameDescription("");
      setGameGenre("");
      setPlatforms([]);
      setReleaseDate("");
      setScreenshots(null);
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.message || error.message);
    }
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    setLoading("Please wait as the product uploads...");

    try {
      const data = new FormData();
      data.append("product_name", productName);
      data.append("product_description", productDescription);
      data.append("product_cost", productCost);
      data.append("product_photo", productPhoto);

      const response = await axios.post("https://serakian.pythonanywhere.com/api/addproduct", data);
      
      setLoading("");
      setSuccess(response.data.message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div className="luxe-container">
      {/* Game Submission Form */}
      <div className="luxe-form-container">
        <h1 className="luxe-form-title">Submit Your Game</h1>
        
        <div className="luxe-status-messages">
          {loading && <div className="luxe-loading">{loading}</div>}
          {success && <div className="luxe-success">{success}</div>}
          {error && <div className="luxe-error">{error}</div>}
        </div>

        {/* <form onSubmit={uploadGame} className="luxe-game-form">
          <div className="luxe-form-group">
            <label htmlFor="gameName">Game Name:</label>
            <input
              type="text"
              id="gameName"
              name="gameName"
              required
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="luxe-form-input"
            />
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="developer">Developer Name/Studio:</label>
            <input
              type="text"
              id="developer"
              name="developer"
              required
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              className="luxe-form-input"
            />
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="email">Contact Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxe-form-input"
            />
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="gameUrl">Game URL (if available):</label>
            <input
              type="url"
              id="gameUrl"
              name="gameUrl"
              value={gameUrl}
              onChange={(e) => setGameUrl(e.target.value)}
              className="luxe-form-input"
            />
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="gameDescription">Game Description:</label>
            <textarea
              id="gameDescription"
              name="gameDescription"
              required
              value={gameDescription}
              onChange={(e) => setGameDescription(e.target.value)}
              className="luxe-form-textarea"
            ></textarea>
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="gameGenre">Genre:</label>
            <select
              id="gameGenre"
              name="gameGenre"
              required
              value={gameGenre}
              onChange={(e) => setGameGenre(e.target.value)}
              className="luxe-form-select"
            >
              <option value="">Select a genre</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="puzzle">Puzzle</option>
              <option value="rpg">RPG</option>
              <option value="simulation">Simulation</option>
              <option value="strategy">Strategy</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="luxe-form-group">
            <label>Platforms:</label>
            <div className="luxe-checkbox-group">
              {['windows', 'mac', 'linux', 'android', 'ios', 'web'].map((platform) => (
                <div key={platform} className="luxe-checkbox-item">
                  <input
                    type="checkbox"
                    id={platform}
                    name="platforms"
                    value={platform}
                    checked={platforms.includes(platform)}
                    onChange={handlePlatformChange}
                    className="luxe-checkbox-input"
                  />
                  <label htmlFor={platform} className="luxe-checkbox-label">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="releaseDate">Release Date (or expected release):</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="luxe-form-input"
            />
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="screenshots">Screenshots (max 3):</label>
            <input
              type="file"
              id="screenshots"
              name="screenshots"
              multiple
              accept="image/*"
              onChange={(e) => setScreenshots(e.target.files)}
              className="luxe-file-input"
            />
          </div>
          
          <button type="submit" className="luxe-submit-btn">
            Submit Game
          </button>
        </form> */}
      </div>

      {/* Product Form (original) */}
      <div className="luxe-addproduct-card">
        <h3 className="luxe-addproduct-title">Add New Product to Luxe Gaming</h3>

        <form onSubmit={uploadProduct} className="luxe-product-form">
          <input
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="luxe-form-input"
          />

          <textarea
            required
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            className="luxe-form-textarea"
          />

          <input
            type="number"
            required
            value={productCost}
            onChange={(e) => setProductCost(e.target.value)}
            placeholder="Product Price ($)"
            className="luxe-form-input"
          />

          <label className="luxe-file-label">Choose Product Image</label>
          <input
            type="file"
            className="luxe-file-input"
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />

          <button type="submit" className="luxe-submit-btn">
            Add Premium Product
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddGame;