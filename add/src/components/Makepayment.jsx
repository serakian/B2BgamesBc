import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import './styling/makepayment.css';

const GamePayment = () => {
  // Get the game details passed from the previous component
  const { product } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Function to handle the payment process
  const processPayment = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!phone.startsWith('254') || phone.length !== 12) {
      setError("Please enter a valid M-Pesa number in format 254XXXXXXXXX");
      return;
    }

    setLoading("Processing your payment...");
    setError("");
    setSuccess("");

    try {
      const paymentData = new FormData();
      paymentData.append("amount", product.product_cost);
      paymentData.append("phone", phone);

      const response = await axios.post(
        "https://serekian.pythonanywhere.com/api/mpesa_payment", 
        paymentData
      );

      setLoading("");
      setSuccess(response.data.message || "Payment initiated successfully! Check your phone to complete.");
      setPhone("");
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  const img_url = "https://SERAKIAN.pythonanywhere.com/static/images/";

  return (
    <div className="game-payment-container">
      <div className="game-payment-header">
        <h1>CHECKOUT</h1>
        <div className="header-decoration"></div>
      </div>

      <div className="game-payment-content">
        <div className="game-details-section">
          <div className="game-cover-container">
            <img 
              src={img_url + product.product_photo} 
              alt={product.product_name} 
              className="game-cover"
            />
            <div className="game-platform-badge">DIGITAL</div>
          </div>
          
          <div className="game-info">
            <h2 className="game-title">{product.product_name}</h2>
            <p className="game-description">{product.product_description}</p>
            <div className="game-metadata">
              <span className="game-genre">Action</span>
              <span className="game-rating">★★★★☆</span>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <div className="price-display">
            <span className="price-currency">$</span>
            <span className="price-amount">{product.product_cost}</span>
          </div>

          <form onSubmit={processPayment} className="payment-form">
            <div className="status-messages">
              {loading && <div className="loading-message">{loading}</div>}
              {success && <div className="success-message">{success}</div>}
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input 
                type="text" 
                id="amount"
                value={product.product_cost}
                readOnly
                className="amount-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">M-Pesa Number (254XXXXXXXXX)</label>
              <input 
                type="tel"
                id="phone"
                placeholder="254XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="phone-input"
                required
              />
            </div>

            <button type="submit" className="pay-now-btn">
              COMPLETE PURCHASE
            </button>

            <div className="payment-method">
              <div className="mpesa-logo"></div>
              <span>Lipa na M-Pesa</span>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GamePayment;