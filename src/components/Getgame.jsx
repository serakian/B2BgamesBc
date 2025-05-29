import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Carousel from "./Carousel";
import './styling/getgame.css'

const GetGames = () => {
  // create hooks that will help manage different states
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  // Create a hook that will hold all the games fetched from the API
  const [games, setGames] = useState([]);

  // Specify the image URL
  const img_url = "https://serakian.pythonanywhere.com/static/images/"

  // Create a function that will help you fetch the different games
  const fetchGames = async () => {
    // Update the loading hook with a message
    setLoading("Loading game catalog...")

    try {
      // Access the Api using the axios library
      const response = await axios.get("https://serakian.pythonanywhere.com/api/getproducts")
      
      // Update the games hook with the different games fetched from the api
      setGames(response.data)
      // set the loading hook back to default
      setLoading("")
    }
    catch(error) {
      // set the loading hook back to default
      setLoading("")
      setError("Failed to load games. Please try again later.");
    }
  }

  // Below we shall use the use effect hook that will call the fetchGames functions every time a person accesses the component
  useEffect(() => {fetchGames()}, [])

  // create a hook that hold those games that matches whatever the user will be typing...
  const [search, setSearch] = useState("");

  const filtered_games = games.filter((item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_description.toLowerCase().includes(search.toLowerCase())
  );

  <Carousel/>



  return (
    <div className="game-listing-container">
      <div className="search-container">
        <input 
          type="search"
          placeholder="Search for a game..."
          className="game-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="game-listing-header">
        <h2>GAME CATALOG</h2>
        <div className="header-decoration"></div>
      </div>

      <div className="status-messages">
        {loading && <div className="loading-message">{loading}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="game-grid">
        {filtered_games.map((game) => (
          <div className="game-card" key={game.id}>
            <div className="game-card-inner">
              <div className="game-card-front">
                <img 
                  src={img_url + game.product_photo} 
                  alt={game.product_name} 
                  className="game-cover" 
                />
                <div className="game-platform-tag">PC</div>
              </div>
              
              <div className="game-card-back">
                <h3>{game.product_name}</h3>
                <p className="game-description">
                  {game.product_description.length > 100 
                    ? `${game.product_description.substring(0, 100)}...` 
                    : game.product_description}
                </p>
                <div className="game-price">
                  <span className="price-currency">ksh</span>
                  <span className="price-amount">{game.product_cost}</span>
                </div>
                <div className="game-rating">★★★★☆</div>
                <button 
                  className="buy-now-btn"
                  onClick={() => navigate("/makepayment", {state: {product: game}})}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  )
}

export default GetGames;