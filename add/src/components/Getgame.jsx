import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import CartPopup from "./Cart";
import './styling/getgame.css';

const GetGames = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const img_url = "https://serakian.pythonanywhere.com/static/images/";

  const fetchGames = async () => {
    setLoading("Loading game catalog...");
    try {
      const response = await axios.get("https://serakian.pythonanywhere.com/api/getproducts");
      setGames(response.data);
      setLoading("");
    } catch(error) {
      setLoading("");
      setError("Failed to load games. Please try again later.");
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => { 
    fetchGames();
  }, []);

  const [search, setSearch] = useState("");
  const filtered_games = games.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (game) => {
    setCartItems(prev => [...prev, game]);
    setCartItemCount(prev => prev + 1);
  };

  return (
    <div className="games-page">
      <div className="games-container">
        <header className="games-header">
          <div className="header-top">
            <div className="search-container">
              <input 
                type="search"
                placeholder="Search games..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
              />
              <button 
                className="cart-button"
                onClick={() => setCartOpen(true)}
              >
                <span className="cart-icon">🛒</span>
                <span className="cart-text">Cart</span>
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </button>
            </div>
          </div>

          <div className="header-content">
            <h1 className="page-title">Game Catalog</h1>
            <p className="page-subtitle">Browse our collection of premium games</p>
          </div>
        </header>

        <main className="games-main">
          {loading && <div className="loading-indicator">{loading}</div>}
          {error && <div className="error-message">{error}</div>}

          <div className="games-grid">
            {filtered_games.map((game) => (
              <div className="game-card" key={game.id}>
                <div className="card-inner">
                  <div className="card-front">
                    <div className="image-container">
                      <img 
                        src={img_url + game.product_photo} 
                        alt={game.product_name} 
                        className="game-image" 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400/333333/FF0000?text=Game+Image';
                        }}
                      />
                      <span className="platform-tag">PC</span>
                    </div>
                  </div>
                  
                  <div className="card-back">
                    <h3 className="game-title">{game.product_name}</h3>
                    <p className="game-description">
                      {game.product_description.length > 100 
                        ? `${game.product_description.substring(0, 100)}...` 
                        : game.product_description}
                    </p>
                    <div className="game-details">
                      <div className="game-price">
                        <span className="price-currency">Ksh</span>
                        <span className="price-amount">{game.product_cost}</span>
                      </div>
                      <div className="game-rating">
                        <span className="rating-stars">★★★★</span>
                        <span className="rating-value">4.0</span>
                      </div>
                    </div>
                    <div className="game-actions">
                      <button 
                        className="action-button buy-button"
                        onClick={() => navigate("/makepayment", {state: {product: game}})}
                      >
                        Buy Now
                      </button>
                      <button 
                        className="action-button cart-button-sm"
                        onClick={() => addToCart(game)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      <CartPopup 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />
      <Footer />
    </div>
  );
};

export default GetGames;