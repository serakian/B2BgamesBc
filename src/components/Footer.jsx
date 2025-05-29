import './styling/Footer.css';

const Footer = () => {
    return (
        <div className="luxe-footer-container">
            <section className="luxe-footer-content">
                <div className="luxe-footer-section">
                    <h5 className="luxe-footer-heading">About Luxe Gaming</h5>
                    <p className="luxe-footer-text">
                        Luxe Gaming delivers premium, immersive gaming experiences with cutting-edge technology, 
                        exclusive content, and a passionate community, elevating play to the next level.
                    </p>
                    <p className="luxe-footer-text">
                        We offer elite gameplay, innovative tech, and exclusive content, creating unforgettable 
                        experiences for passionate gamers worldwide.
                    </p>
                </div>
                
                <div className="luxe-footer-section">
                    <h5 className="luxe-footer-heading">Contact Us</h5>
                    <input 
                        className="luxe-footer-input" 
                        type="email" 
                        placeholder="Enter your email"
                    />
                    <textarea 
                        className="luxe-footer-textarea" 
                        rows="5" 
                        placeholder="Your message"
                    ></textarea>
                    <button className="luxe-footer-button">
                        Send Message
                    </button>
                </div>
                
                <div className="luxe-footer-section">
                    <h5 className="luxe-footer-heading">Connect With Us</h5>
                    <div className="luxe-social-icons">
                        <a href="https://facebook.com" className="luxe-social-link">
                            <img 
                                src="images/facebook.png" 
                                alt="Facebook" 
                                className="luxe-social-icon"
                            />
                        </a>
                        <a href="https://instagram.com" className="luxe-social-link">
                            <img 
                                src="images/instagrm.png" 
                                alt="Instagram" 
                                className="luxe-social-icon"
                            />
                        </a>
                    </div>
                    <p className="luxe-footer-text">
                        Gaming brings endless enjoyment by immersing players in exciting worlds, sparking creativity, 
                        and fostering connections. It offers thrilling challenges, relaxation, and a sense of achievement, 
                        making every moment fun and unforgettable.
                    </p>
                </div>
            </section>
            
            <footer className="luxe-footer-bottom">
                <h5 className="luxe-footer-copyright">
                    Developed by SERA TUSIGA &copy; 2025. All rights reserved
                </h5>
            </footer>
        </div>
    );
};

export default Footer;