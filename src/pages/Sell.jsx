import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sell() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        propertyLocation: "",
        askingPrice: "",
        propertyType: "",
        propertyDescription: "",
        propertyImage: ""
    });

    const [loading, setLoading] = useState(false);

    // handle text/number/email inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://realestateapis.onrender.com/user/properties-for-sale/sell", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                // redirect to success page instead of alert
                navigate("/sell-success");
            } else {
                alert("Failed to submit property");
            }
        } catch (error) {
            console.error(error);
            alert("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('real-estate.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                margin: 0,
                padding: "20px",
                minHeight: "100vh",
            }}
        >
            {/* HEADER SECTION */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    padding: "1rem 3rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 0.35)",
                    color: "#fff",
                    zIndex: 1000,
                    flexWrap: "wrap",
                }}
            >
                {/* Logo */}
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
                    Enuluxe<span style={{ color: "#ffd700" }}>.ng</span>
                </div>

                {/* Navigation */}
                <nav style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link to="/" style={navLink}>Home</Link>
                    <Link to="/buy" style={navLink}>Buy</Link>
                    <Link to="/sell" style={navLink}>Sell</Link>
                    <Link to="/rent" style={navLink}>Rent</Link>
                    <Link to="/aboutus" style={navLink}>About Us</Link>
                </nav>

                {/* Auth buttons */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link to="/register" style={registerBtn}>Register</Link>
                    <Link to="/login" style={loginBtn}>Log in</Link>
                </div>
            </header>

            {/* Content */}
            <div
                style={{
                    maxWidth: "900px",
                    margin: "120px auto 40px",
                    padding: "30px",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", color: "#004d66" }}>Why Sell With Us?</h2>
                <p style={{ textAlign: "center", fontSize: "16px", color: "#555" }}>
                    We make selling your house stress-free by connecting you with verified buyers,
                    offering expert pricing guidance, and handling all the paperwork with transparency.
                </p>

                {/* FORM */}
                <h3 style={{ marginTop: "30px", color: "#004d66" }}>Property Details</h3>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "grid", gap: "20px", marginTop: "20px" }}
                >
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        name="emailAddress"
                        value={form.emailAddress}
                        onChange={handleChange}
                        placeholder="Email Address"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="propertyLocation"
                        value={form.propertyLocation}
                        onChange={handleChange}
                        placeholder="Property Location"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="askingPrice"
                        value={form.askingPrice}
                        onChange={handleChange}
                        placeholder="Asking Price (₦)"
                        style={inputStyle}
                    />

                    <select
                        name="propertyType"
                        value={form.propertyType}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Property Type</option>
                        <option value="HOUSE">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial Property</option>
                    </select>

                    <textarea
                        name="propertyDescription"
                        value={form.propertyDescription}
                        onChange={handleChange}
                        placeholder="Property Description"
                        rows="4"
                        style={inputStyle}
                    ></textarea>

                    <label style={{ fontSize: "14px", color: "#333" }}>
                        Upload Property Images:
                    </label>
                    <input
                        type="text"
                        name="propertyImage"
                        value={form.propertyImage}
                        onChange={handleChange}
                        placeholder="Image URL"
                        style={inputStyle}
                    />

                    {/* Loading Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "#004d66",
                            color: "white",
                            padding: "14px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: loading ? "not-allowed" : "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner" style={{
                                    width: "18px",
                                    height: "18px",
                                    border: "3px solid #fff",
                                    borderTop: "3px solid transparent",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    animation: "spin 1s linear infinite"
                                }}></span>
                                Submitting...
                            </>
                        ) : (
                            "Submit Property"
                        )}
                    </button>
                </form>
            </div>

            {/* Spinner Animation */}
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
}

// Styles
const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
};

const navLink = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
};

const registerBtn = {
    background: "#fff",
    color: "#0b0b45",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.9rem",
};

const loginBtn = {
    background: "#0b0b45",
    color: "#fff",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    border: "1px solid #fff",
    textDecoration: "none",
    fontSize: "0.9rem",
};
