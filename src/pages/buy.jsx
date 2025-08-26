// import React, { useState, useEffect } from "react";
// import "./buy.css";
// import Header from "../components/Header";
// import axios from "axios";
//
// const BuyPage = () => {
//     const [filters, setFilters] = useState({
//         type: "all",
//         bedrooms: "all",
//         price: "all",
//         location: "",
//     });
//
//     const [properties, setProperties] = useState([]);
//
//     // 👤 Hardcoded email for now (replace with logged-in user email later)
//     const userEmail = "testuser@email.com";
//
//     // ✅ Fetch properties from backend on mount
//     useEffect(() => {
//         axios
//             .get("https://realestateapis.onrender.com/property/get")
//             .then((res) => {
//                 console.log("API response:", res.data);
//                 setProperties(res.data); // store all properties immediately
//             })
//             .catch((err) => {
//                 console.error("Error fetching properties:", err);
//             });
//     }, []);
//
//     // ✅ Handle Book Inspection payment
//     const handleBookInspection = async (property) => {
//         try {
//             const payload = {
//                 email: userEmail,
//                 amount: property.property_price, // or use a fixed inspection fee
//                 // callback_url: "https://enuluxeng.netlify.app/paymentsuccess", // redirect after payment
//             };
//
//             const res = await axios.post(
//                 `https://realestateapis.onrender.com/payments/buy/${property.id}`,
//                 payload
//             );
//
//             console.log("Payment init response:", res.data);
//
//             if (res.data?.authorization_url) {
//                 // redirect user to Paystack checkout
//                 window.location.href = res.data.authorization_url;
//             } else {
//                 alert("Failed to initiate payment");
//             }
//         } catch (err) {
//             console.error("Payment error:", err);
//             alert("Error initiating payment. Please try again.");
//         }
//     };
//
//     // ✅ Filtering logic
//     const filteredProperties = properties.filter((p) => {
//         const matchType = filters.type === "all" || p.property_type === filters.type;
//         const matchBeds =
//             filters.bedrooms === "all" ||
//             parseInt(p.no_of_rooms) >= parseInt(filters.bedrooms);
//
//         // handle price ranges
//         let priceCategory = "mid";
//         if (p.property_price <= 1000000) priceCategory = "low";
//         else if (p.property_price > 1000000 && p.property_price <= 5000000)
//             priceCategory = "mid";
//         else if (p.property_price > 5000000 && p.property_price <= 10000000)
//             priceCategory = "high";
//         else if (p.property_price > 10000000) priceCategory = "luxury";
//
//         const matchPrice = filters.price === "all" || filters.price === priceCategory;
//         const matchLocation =
//             filters.location.trim() === "" ||
//             (p.property_information &&
//                 p.property_information
//                     .toLowerCase()
//                     .includes(filters.location.toLowerCase()));
//
//         return matchType && matchBeds && matchPrice && matchLocation;
//     });
//
//     return (
//         <>
//             {/* shared header */}
//             <Header />
//
//             {/* Hero Section */}
//             <section className="hero">
//                 <div className="hero-overlay">
//                     <h1>Find Your Dream Home</h1>
//                     <p>Browse through exclusive listings tailored to your needs</p>
//
//                     <div className="filter-bar">
//                         <select
//                             value={filters.type}
//                             onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//                         >
//                             <option value="all">Property Type</option>
//                             <option value="house">House</option>
//                             <option value="duplex">Duplex</option>
//                             <option value="apartment">Apartment</option>
//                             <option value="bungalow">Bungalow</option>
//                         </select>
//
//                         <select
//                             value={filters.bedrooms}
//                             onChange={(e) =>
//                                 setFilters({ ...filters, bedrooms: e.target.value })
//                             }
//                         >
//                             <option value="all">Bedrooms</option>
//                             <option value="1">1+</option>
//                             <option value="2">2+</option>
//                             <option value="3">3+</option>
//                             <option value="4">4+</option>
//                         </select>
//
//                         <select
//                             value={filters.price}
//                             onChange={(e) =>
//                                 setFilters({ ...filters, price: e.target.value })
//                             }
//                         >
//                             <option value="all">Price Range</option>
//                             <option value="low">₦500k - ₦1M</option>
//                             <option value="mid">₦1M - ₦5M</option>
//                             <option value="high">₦5M - ₦10M</option>
//                             <option value="luxury">Above ₦10M</option>
//                         </select>
//
//                         <input
//                             type="text"
//                             placeholder="Search by Location (e.g Owo)"
//                             value={filters.location}
//                             onChange={(e) =>
//                                 setFilters({ ...filters, location: e.target.value })
//                             }
//                         />
//
//                         <button>Find Homes</button>
//                     </div>
//                 </div>
//             </section>
//
//             {/* Property Listings */}
//             <section className="property-grid">
//                 {filteredProperties.length > 0 ? (
//                     filteredProperties.map((p) => (
//                         <div
//                             key={p.id}
//                             className="property-card"
//                             data-type={p.property_type}
//                             data-bedrooms={p.no_of_rooms}
//                             data-price={p.property_price}
//                             data-location={p.property_information}
//                         >
//                             <img src={p.property_image} alt={p.property_type} />
//                             <div className="property-info">
//                                 <h3>{p.property_type}</h3>
//                                 <p>
//                                     {p.no_of_rooms} Beds • {p.no_of_bathrooms} Baths •{" "}
//                                     {p.size_of_property}
//                                 </p>
//                                 <p>{p.property_information}</p>
//                                 <p className="price">₦{p.property_price?.toLocaleString()}</p>
//                                 <div className="btn-group">
//                                     <a href="#" className="btn btn-details">
//                                         View Details
//                                     </a>
//                                     <button
//                                         className="btn btn-buy"
//                                         onClick={() => handleBookInspection(p)}
//                                     >
//                                         Book Inspection
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="loading-text">Loading properties...</p>
//                 )}
//             </section>
//
//             {/* ✅ Custom footer only for Buy Page */}
//             <footer className="site-footer">
//                 <div className="footer-content">
//                     <div className="footer-section">
//                         <h3>Enuluxe.ng</h3>
//                         <p>
//                             Enuluxe.ng is now available on iOS, Android and Chrome. Use our
//                             website to explore the world.
//                         </p>
//                     </div>
//                     <div className="footer-section">
//                         <h4>Pages</h4>
//                         <ul>
//                             <li>
//                                 <a href="/buy">Buy</a>
//                             </li>
//                             <li>
//                                 <a href="/sell">Sell</a>
//                             </li>
//                             <li>
//                                 <a href="/rent">Rent</a>
//                             </li>
//                             <li>
//                                 <a href="/aboutus">About Us</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h4>Resources</h4>
//                         <ul>
//                             <li>
//                                 <a href="#">Home Buying Guide</a>
//                             </li>
//                             <li>
//                                 <a href="#">Foreclosure Center</a>
//                             </li>
//                             <li>
//                                 <a href="#">Contact Realtors</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h4>Follow Us</h4>
//                         <div className="social-links">
//                             <a href="https://www.instagram.com">
//                                 <i className="fab fa-instagram"></i>
//                             </a>
//                             <a href="https://www.facebook.com">
//                                 <i className="fab fa-facebook-f"></i>
//                             </a>
//                             <a href="https://www.twitter.com">
//                                 <i className="fab fa-twitter"></i>
//                             </a>
//                             <a href="https://www.linkedin.com">
//                                 <i className="fab fa-linkedin-in"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-bottom">
//                     <p>&copy; 2025 PropertyLink.ng. All rights reserved.</p>
//                 </div>
//             </footer>
//         </>
//     );
// };
//
// export default BuyPage;
// import React, { useState, useEffect } from "react";
// import "./buy.css";
// import Header from "../components/Header";
// import axios from "axios";
//
// const BuyPage = () => {
//     const [filters, setFilters] = useState({
//         type: "all",
//         bedrooms: "all",
//         price: "all",
//         location: "",
//     });
//
//     const [properties, setProperties] = useState([]);
//
//     // 👤 Hardcoded email for now (replace with logged-in user email later)
//     const userEmail = "testuser@email.com";
//
//     // ✅ Fetch properties from backend on mount
//     useEffect(() => {
//         axios
//             .get("https://realestateapis.onrender.com/property/get")
//             .then((res) => {
//                 console.log("API response:", res.data);
//                 setProperties(res.data); // store all properties immediately
//             })
//             .catch((err) => {
//                 console.error("Error fetching properties:", err);
//             });
//     }, []);
//
//     // ✅ Handle Book Inspection payment
//     const handleBookInspection = async (property) => {
//         try {
//             // check the property object
//             console.log("Booking property:", property);
//
//             const payload = {
//                 email: userEmail,
//             };
//
//             console.log("Sending payment payload:", payload);
//
//             // ✅ use property._id or fallback to property.id
//             const propertyId = property._id || property.id;
//
//             if (!propertyId) {
//                 alert("Invalid property ID");
//                 return;
//             }
//
//             const res = await axios.post(
//                 `https://realestateapis.onrender.com/payments/buy/${propertyId}`,
//                 payload,
//                 { headers: { "Content-Type": "application/json" } }
//             );
//
//             console.log("Payment init response:", res.data);
//
//             if (res.data?.authorization_url) {
//                 window.location.href = res.data.authorization_url;
//             } else {
//                 alert("Failed to initiate payment");
//             }
//         } catch (err) {
//             console.error("Payment error:", err.response?.data || err.message);
//             alert("Error initiating payment. Please try again.");
//         }
//     };
//
//     // ✅ Filtering logic
//     const filteredProperties = properties.filter((p) => {
//         const matchType = filters.type === "all" || p.property_type === filters.type;
//         const matchBeds =
//             filters.bedrooms === "all" ||
//             parseInt(p.no_of_rooms) >= parseInt(filters.bedrooms);
//
//         // handle price ranges
//         let priceCategory = "mid";
//         if (p.property_price <= 1000000) priceCategory = "low";
//         else if (p.property_price > 1000000 && p.property_price <= 5000000)
//             priceCategory = "mid";
//         else if (p.property_price > 5000000 && p.property_price <= 10000000)
//             priceCategory = "high";
//         else if (p.property_price > 10000000) priceCategory = "luxury";
//
//         const matchPrice = filters.price === "all" || filters.price === priceCategory;
//         const matchLocation =
//             filters.location.trim() === "" ||
//             (p.property_information &&
//                 p.property_information
//                     .toLowerCase()
//                     .includes(filters.location.toLowerCase()));
//
//         return matchType && matchBeds && matchPrice && matchLocation;
//     });
//
//     return (
//         <>
//             {/* shared header */}
//             <Header />
//
//             {/* Hero Section */}
//             <section className="hero">
//                 <div className="hero-overlay">
//                     <h1>Find Your Dream Home</h1>
//                     <p>Browse through exclusive listings tailored to your needs</p>
//
//                     <div className="filter-bar">
//                         <select
//                             value={filters.type}
//                             onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//                         >
//                             <option value="all">Property Type</option>
//                             <option value="house">House</option>
//                             <option value="duplex">Duplex</option>
//                             <option value="apartment">Apartment</option>
//                             <option value="bungalow">Bungalow</option>
//                         </select>
//
//                         <select
//                             value={filters.bedrooms}
//                             onChange={(e) =>
//                                 setFilters({ ...filters, bedrooms: e.target.value })
//                             }
//                         >
//                             <option value="all">Bedrooms</option>
//                             <option value="1">1+</option>
//                             <option value="2">2+</option>
//                             <option value="3">3+</option>
//                             <option value="4">4+</option>
//                         </select>
//
//                         <select
//                             value={filters.price}
//                             onChange={(e) =>
//                                 setFilters({ ...filters, price: e.target.value })
//                             }
//                         >
//                             <option value="all">Price Range</option>
//                             <option value="low">₦500k - ₦1M</option>
//                             <option value="mid">₦1M - ₦5M</option>
//                             <option value="high">₦5M - ₦10M</option>
//                             <option value="luxury">Above ₦10M</option>
//                         </select>
//
//                         <input
//                             type="text"
//                             placeholder="Search by Location (e.g Owo)"
//                             value={filters.location}
//                             onChange={(e) =>
//                                 setFilters({ ...filters, location: e.target.value })
//                             }
//                         />
//
//                         <button>Find Homes</button>
//                     </div>
//                 </div>
//             </section>
//
//             {/* Property Listings */}
//             <section className="property-grid">
//                 {filteredProperties.length > 0 ? (
//                     filteredProperties.map((p) => (
//                         <div
//                             key={p._id || p.id} // ✅ fixed key issue
//                             className="property-card"
//                             data-type={p.property_type}
//                             data-bedrooms={p.no_of_rooms}
//                             data-price={p.property_price}
//                             data-location={p.property_information}
//                         >
//                             <img src={p.property_image} alt={p.property_type} />
//                             <div className="property-info">
//                                 <h3>{p.property_type}</h3>
//                                 <p>
//                                     {p.no_of_rooms} Beds • {p.no_of_bathrooms} Baths •{" "}
//                                     {p.size_of_property}
//                                 </p>
//                                 <p>{p.property_information}</p>
//                                 <p className="price">₦{p.property_price?.toLocaleString()}</p>
//                                 <div className="btn-group">
//                                     <a href="#" className="btn btn-details">
//                                         View Details
//                                     </a>
//                                     <button
//                                         className="btn btn-buy"
//                                         onClick={() => handleBookInspection(p)}
//                                     >
//                                         Book Inspection
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="loading-text">Loading properties...</p>
//                 )}
//             </section>
//
//             {/* ✅ Custom footer only for Buy Page */}
//             <footer className="site-footer">
//                 <div className="footer-content">
//                     <div className="footer-section">
//                         <h3>Enuluxe.ng</h3>
//                         <p>
//                             Enuluxe.ng is now available on iOS, Android and Chrome. Use our
//                             website to explore the world.
//                         </p>
//                     </div>
//                     <div className="footer-section">
//                         <h4>Pages</h4>
//                         <ul>
//                             <li>
//                                 <a href="/buy">Buy</a>
//                             </li>
//                             <li>
//                                 <a href="/sell">Sell</a>
//                             </li>
//                             <li>
//                                 <a href="/rent">Rent</a>
//                             </li>
//                             <li>
//                                 <a href="/aboutus">About Us</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h4>Resources</h4>
//                         <ul>
//                             <li>
//                                 <a href="#">Home Buying Guide</a>
//                             </li>
//                             <li>
//                                 <a href="#">Foreclosure Center</a>
//                             </li>
//                             <li>
//                                 <a href="#">Contact Realtors</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h4>Follow Us</h4>
//                         <div className="social-links">
//                             <a href="https://www.instagram.com">
//                                 <i className="fab fa-instagram"></i>
//                             </a>
//                             <a href="https://www.facebook.com">
//                                 <i className="fab fa-facebook-f"></i>
//                             </a>
//                             <a href="https://www.twitter.com">
//                                 <i className="fab fa-twitter"></i>
//                             </a>
//                             <a href="https://www.linkedin.com">
//                                 <i className="fab fa-linkedin-in"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-bottom">
//                     <p>&copy; 2025 PropertyLink.ng. All rights reserved.</p>
//                 </div>
//             </footer>
//         </>
//     );
// };
//
// export default BuyPage;

import React, { useState, useEffect } from "react";
import "./buy.css";
import Header from "../components/Header";
import axios from "axios";

const BuyPage = () => {
    const [filters, setFilters] = useState({
        type: "all",
        bedrooms: "all",
        price: "all",
        location: "",
    });

    const [properties, setProperties] = useState([]);

    // ✅ Fetch properties from backend on mount
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

    // ✅ Handle Book Inspection payment (initiate payment)
    const handleBookInspection = async (property) => {
        try {
            const propertyId = property._id || property.id;

            if (!propertyId) {
                alert("Invalid property ID");
                return;
            }

            // 🚀 Get token from localStorage (after login you should save it there)
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to make payment");
                return;
            }

            console.log("Booking property with ID:", propertyId);

            // ✅ Send request with Authorization header
             const res = await axios.post(
                `https://realestateapis.onrender.com/payments/buy/${propertyId}`,
                {}, // 👈 empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res)
            console.log("Payment init response:", res.data);

            // ✅ Redirect user to Paystack checkout page
            const url = res.data?.data?.authorization_url || res.data?.authorization_url;
            if (url) {
                window.location.href = url;
            } else {
                alert("Failed to initiate payment");
            }
        } catch (err) {
            console.error("Error initiating payment:", err.response?.data || err.message);
            alert(
                `Error initiating payment: ${
                    err.response?.data?.message || err.response?.data?.error || "Please try again."
                }`
            );
        }
    };

    // ✅ Verify payment after redirect back from Paystack
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const reference = queryParams.get("reference");

        if (reference) {
            console.log("Verifying payment with reference:", reference);

            // 🚀 Use Authorization header for verify too
            const token = localStorage.getItem("token");
            if (!token) return;

            axios.post(
                `https://realestateapis.onrender.com/payments/verify/${reference}`,
                {}, // 👈 empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log("Verification response:", res.data);

                    if (res.data.status === "success") {
                        alert("Payment successful! 🎉 Your inspection is booked.");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                })
                .catch((err) => {
                    console.error("Error verifying payment:", err.response?.data || err.message);
                });
        }
    }, []);

    // ✅ Filtering logic
    const filteredProperties = properties.filter((p) => {
        const matchType = filters.type === "all" || p.property_type === filters.type;
        const matchBeds =
            filters.bedrooms === "all" ||
            parseInt(p.no_of_rooms) >= parseInt(filters.bedrooms);

        let priceCategory = "mid";
        if (p.property_price <= 1000000) priceCategory = "low";
        else if (p.property_price > 1000000 && p.property_price <= 5000000)
            priceCategory = "mid";
        else if (p.property_price > 5000000 && p.property_price <= 10000000)
            priceCategory = "high";
        else if (p.property_price > 10000000) priceCategory = "luxury";

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
        <>
            <Header />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Find Your Dream Home</h1>
                    <p>Browse through exclusive listings tailored to your needs</p>

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
                            <option value="low">₦500k - ₦1M</option>
                            <option value="mid">₦1M - ₦5M</option>
                            <option value="high">₦5M - ₦10M</option>
                            <option value="luxury">Above ₦10M</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search by Location (e.g Owo)"
                            value={filters.location}
                            onChange={(e) =>
                                setFilters({ ...filters, location: e.target.value })
                            }
                        />

                        <button>Find Homes</button>
                    </div>
                </div>
            </section>

            {/* Property Listings */}
            <section className="property-grid">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((p) => (
                        <div
                            key={p.id || p._id}
                            className="property-card"
                            data-type={p.property_type}
                            data-bedrooms={p.no_of_rooms}
                            data-price={p.property_price}
                            data-location={p.property_information}
                        >
                            <img src={p.property_image} alt={p.property_type} />
                            <div className="property-info">
                                <h3>{p.property_type}</h3>
                                <p>
                                    {p.no_of_rooms} Beds • {p.no_of_bathrooms} Baths •{" "}
                                    {p.size_of_property}
                                </p>
                                <p>{p.property_information}</p>
                                <p className="price">₦{p.property_price?.toLocaleString()}</p>
                                <div className="btn-group">
                                    <a href="#" className="btn btn-details">
                                        View Details
                                    </a>
                                    <button
                                        className="btn btn-buy"
                                        onClick={() => handleBookInspection(p)}
                                    >
                                        Book Inspection
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading properties...</p>
                )}
            </section>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Enuluxe.ng</h3>
                        <p>
                            Enuluxe.ng is now available on iOS, Android and Chrome. Use our
                            website to explore the world.
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
                            <li><a href="#">Home Buying Guide</a></li>
                            <li><a href="#">Foreclosure Center</a></li>
                            <li><a href="#">Contact Realtors</a></li>
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
        </>
    );
};

export default BuyPage;
