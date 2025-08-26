import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import "./rent.css";

const RentPage = () => {
    const [filters, setFilters] = useState({
        type: "all",
        bedrooms: "all",
        price: "all",
        location: "",
    });

    const [properties, setProperties] = useState([]);
    const [loadingPayment, setLoadingPayment] = useState(false);

    // 👤 Hardcoded email (replace later with logged-in user email)
    const userEmail = "testuser@email.com";

    // ✅ Fetch rental properties
    useEffect(() => {
        axios
            .get("https://realestateapis.onrender.com/property/get")
            .then((res) => {
                console.log("API response:", res.data);
                setProperties(res.data);
            })
            .catch((err) => {
                console.error("Error fetching properties:", err);
            });
    }, []);
    // ✅ Handle Book Inspection
    const handleBookInspection = async (property) => {
        try {
            setLoadingPayment(true);

            const payload = {
                email: userEmail,
                amount: property.property_price,
                callback_url: "https://enuluxeng.netlify.app/paymentsuccess",
            };

            const res = await axios.post(
                `https://realestateapis.onrender.com/payments/rent/${property.id}`,
                payload
            );

            console.log("Payment init response:", res.data);

            if (res.data?.authorization_url) {
                window.location.href = res.data.authorization_url; // Paystack checkout
            } else {
                alert("Failed to start payment. Please try again.");
            }
        } catch (err) {
            console.error("Error starting payment:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoadingPayment(false);
        }
    };

    // ✅ Filtering logic
    const filteredProperties = properties.filter((p) => {
        const matchType = filters.type === "all" || p.property_type === filters.type;
        const matchBeds =
            filters.bedrooms === "all" ||
            parseInt(p.no_of_rooms) >= parseInt(filters.bedrooms);

        // price ranges for rentals
        let priceCategory = "mid";
        if (p.property_price <= 500000) priceCategory = "low";
        else if (p.property_price > 500000 && p.property_price <= 2000000)
            priceCategory = "mid";
        else if (p.property_price > 2000000) priceCategory = "high";

        const matchPrice = filters.price === "all" || filters.price === priceCategory;
        const matchLocation =
            filters.location.trim() === "" ||
            (p.property_information &&
                p.property_information
                    .toLowerCase()
                    .includes(filters.location.toLowerCase()));

        return matchType && matchBeds && matchPrice && matchLocation;
    });

    return (
        <div>
            {/* ✅ Transparent Header */}
            <Header />

            {/* Hero Section */}
            <section className="hero rent-hero">
                <div className="hero-overlay">
                    <h1>Discover Rentals</h1>
                    <p>Elegant apartments and homes tailored to your lifestyle</p>

                    <div className="filter-bar">
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="all">Property Type</option>
                            <option value="house">House</option>
                            <option value="duplex">Duplex</option>
                            <option value="apartment">Apartment</option>
                            <option value="bungalow">Bungalow</option>
                        </select>

                        <select
                            value={filters.bedrooms}
                            onChange={(e) =>
                                setFilters({ ...filters, bedrooms: e.target.value })
                            }
                        >
                            <option value="all">Bedrooms</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>

                        <select
                            value={filters.price}
                            onChange={(e) =>
                                setFilters({ ...filters, price: e.target.value })
                            }
                        >
                            <option value="all">Price Range</option>
                            <option value="low">₦100k - ₦500k</option>
                            <option value="mid">₦500k - ₦2M</option>
                            <option value="high">Above ₦2M</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search by Location (e.g Owo)"
                            value={filters.location}
                            onChange={(e) =>
                                setFilters({ ...filters, location: e.target.value })
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Property Listings */}
            <section className="property-grid">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((p) => (
                        <div
                            className="property-card"
                            key={p.id}
                            data-type={p.property_type}
                            data-bedrooms={p.no_of_rooms}
                            data-price={p.property_price}
                            data-location={p.property_information}
                        >
                            <img
                                src={p.property_image}
                                alt={p.property_type}
                            />
                            <div className="property-info">
                                <h3>{p.property_type}</h3>
                                <p>
                                    {p.no_of_rooms} Beds • {p.no_of_bathrooms} Baths •{" "}
                                    {p.size_of_property}
                                </p>
                                <p>{p.property_information}</p>
                                <p className="price">₦{p.property_price?.toLocaleString()}</p>
                                <div className="btn-group">
                                    <a href="#" className="btn btn-details">View Details</a>
                                    <a href="#" className="btn btn-save">Save Rental</a>
                                    <button
                                        onClick={() => handleBookInspection(p)}
                                        className="btn btn-rent"
                                        disabled={loadingPayment}
                                    >
                                        {loadingPayment ? "Processing..." : "Book Inspection"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading rental properties...</p>
                )}
            </section>

            {/* ✅ Custom Footer */}
            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <a href="/"><h3>Enuluxe.ng</h3></a>
                        <p>
                            Enuluxe.ng is now available on iOS, Android and Chrome. Use
                            our website to explore the world.
                        </p>
                    </div>
                    <div className="footer-section">
                        <h4>Pages</h4>
                        <ul>
                            <li><a href="/buy">Buy</a></li>
                            <li><a href="/sell">Sell</a></li>
                            <li><a href="/rent">Rent</a></li>
                            <li><a href="/aboutus">About Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Rental Guide</a></li>
                            <li><a href="#">Payment Options</a></li>
                            <li><a href="#">Contact Realtors</a></li>
                            <li><a href="#">Rental App</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#">Discover Rentals</a></li>
                            <li><a href="#">New Apartments</a></li>
                            <li><a href="#">Popular Houses</a></li>
                            <li><a href="#">Applications</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>About Us</h4>
                        <ul>
                            <li><a href="/Contact">Contact Us</a></li>
                            <li><a href="/register">Register</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 PropertyLink.ng. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default RentPage;

