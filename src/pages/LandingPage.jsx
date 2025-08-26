// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
//
// const LandingPage = () => {
//     const [location, setLocation] = useState("");
//     const [newsletterEmail, setNewsletterEmail] = useState("");
//     const [properties, setProperties] = useState([]);
//
//     const findProperty = () => {
//         if (location.trim() === "") {
//             alert("Please enter a location to search for properties.");
//             return;
//         }
//         alert(`Searching for properties in: ${location}`);
//         console.log("Searching for properties in:", location);
//     };
//
//     const handleNewsletterSubmit = (e) => {
//         e.preventDefault();
//         if (newsletterEmail.trim() === "") {
//             alert("Please enter your email address.");
//             return;
//         }
//         alert(`Thank you for subscribing with: ${newsletterEmail}`);
//         setNewsletterEmail("");
//     };
//
//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             findProperty();
//         }
//     };
//
//     // ✅ Fetch properties from backend
//     useEffect(() => {
//         fetch("https://realestateapis.onrender.com/property/get")
//             .then((res) => res.json())
//             .then((data) => setProperties(data))
//             .catch((err) => console.error("Error fetching properties:", err));
//     }, []);
//
//     // ✅ Handle Book Inspection
//     const handleBookInspection = async (property) => {
//         try {
//             const response = await fetch(
//                 `https://realestateapis.onrender.com/payments/rent/${property._id}`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         email: "user@email.com", // replace with logged-in user's email later
//                         amount: property.price, // you can adjust if it's inspection fee only
//                     }),
//                 }
//             );
//
//             const data = await response.json();
//
//             if (data.authorization_url) {
//                 // ✅ Redirect user to Paystack checkout
//                 window.location.href = data.authorization_url;
//             } else {
//                 alert("Unable to initialize payment. Please try again.");
//             }
//         } catch (error) {
//             console.error("Payment init error:", error);
//             alert("Something went wrong while booking inspection.");
//         }
//     };
//
//     return (
//         <>
//             <Header />
//
//             {/* Hero Section */}
//             <section className="hero">
//                 <div className="overlay"></div>
//                 <div className="hero-content">
//                     <h1>Unlock the door to your perfect property!</h1>
//                     <p>
//                         We connect buyers, renters and landlords by simplifying their
//                         property search process and fostering transparent and efficient
//                         transactions, providing you the perfect property!
//                     </p>
//                     <div className="search-container">
//                         <div className="search-bar">
//                             <input
//                                 type="text"
//                                 placeholder="Enter your location..."
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                             />
//                             <button onClick={findProperty}>Find property</button>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* Stats Section */}
//             <div className="stats">
//                 <div className="stat">
//                     <span className="countup">0</span>
//                     <p> + Properties sold</p>
//                 </div>
//                 <div className="stat">
//                     <span className="countup">0</span>
//                     <p>Years of experience</p>
//                 </div>
//                 <div className="stat">
//                     <span className="countup">500</span>
//                     <p> + Clients</p>
//                 </div>
//             </div>
//
//             {/* ✅ Dynamic Property Section */}
//             <section className="properties">
//                 <div className="container">
//                     <div className="section-header">
//                         <h2>Featured Properties</h2>
//                     </div>
//                     <div className="view-all">
//                         <button className="view-all-btn">View All </button>
//                     </div>
//                 </div>
//                 <div className="property-grid">
//                     {properties.length > 0 ? (
//                         properties.slice(0, 6).map((property) => (
//                             <div className="property-card" key={property._id}>
//                                 <div className="property-image">
//                                     <img src={property.image} alt={property.title} />
//                                 </div>
//                                 <div className="property-details">
//                                     <h3>{property.title}</h3>
//                                     <div className="features">
//                                         <span>{property.beds} Beds</span>
//                                         <span>{property.baths} Baths</span>
//                                         <span>{property.sqft} sqft</span>
//                                     </div>
//                                     <p className="location">{property.location}</p>
//                                     <div className="price">
//                                         <span className="amount">₦{property.price}</span>
//                                         <div className="buttons">
//                                             {/* ✅ Styled View Details button */}
//                                             <button
//                                                 className="view-details-btn"
//                                                 style={{
//                                                     marginRight: "10px",
//                                                     padding: "8px 14px",
//                                                     borderRadius: "6px",
//                                                     backgroundColor: "#007bff",
//                                                     color: "#fff",
//                                                     border: "none",
//                                                     cursor: "pointer",
//                                                     transition: "0.3s",
//                                                 }}
//                                                 onMouseOver={(e) =>
//                                                     (e.target.style.backgroundColor = "#0056b3")
//                                                 }
//                                                 onMouseOut={(e) =>
//                                                     (e.target.style.backgroundColor = "#007bff")
//                                                 }
//                                             >
//                                                 View Details
//                                             </button>
//
//                                             {/* ✅ Book Inspection button remains intact */}
//                                             <button
//                                                 onClick={() => handleBookInspection(property)}
//                                                 className="book_now-btn"
//                                             >
//                                                 Book Inspection
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>Loading properties...</p>
//                     )}
//                 </div>
//             </section>
//
//             {/* Newsletter Section */}
//             <section className="newsletter">
//                 <div className="newsletter-container">
//                     <div className="newsletter-content">
//                         <h2>Subscribe to Our Newsletter</h2>
//                         <p>Get full details on new listings</p>
//                         <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
//                             <input
//                                 type="email"
//                                 placeholder=" your email address"
//                                 required
//                                 value={newsletterEmail}
//                                 onChange={(e) => setNewsletterEmail(e.target.value)}
//                             />
//                             <button type="submit">Subscribe</button>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//
//             <Footer />
//         </>
//     );
// };
//
// export default LandingPage;

// import React, { useState, useEffect } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
//
//
// const LandingPage = () => {
//   const [location, setLocation] = useState('');
//   const [newsletterEmail, setNewsletterEmail] = useState('');
//
//   const findProperty = () => {
//     if (location.trim() === '') {
//       alert('Please enter a location to search for properties.');
//       return;
//     }
//
//     alert(Searching for properties in: ${location});
//     console.log('Searching for properties in:', location);
//   };
//
//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     if (newsletterEmail.trim() === '') {
//       alert('Please enter your email address.');
//       return;
//     }
//     alert(Thank you for subscribing with: ${newsletterEmail});
//     setNewsletterEmail('');
//   };
//
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       findProperty();
//     }
//   };
//
//   // CountUp Animation Effect
//   useEffect(() => {
//     const els = document.querySelectorAll(".countup");
//     if (!els.length) return;
//
//     const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//
//     function formatNumber(value, separator, decimals) {
//       const opts = {
//         useGrouping: !!separator,
//         minimumFractionDigits: decimals,
//         maximumFractionDigits: decimals
//       };
//       let formatted = new Intl.NumberFormat("en-US", opts).format(value);
//       if (separator && separator !== ",") {
//         formatted = formatted.replace(/,/g, separator);
//       }
//       return formatted;
//     }
//
//     function decimalsOf(n) {
//       const s = String(n);
//       return s.includes(".") ? s.split(".")[1].length : 0;
//     }
//
//     function animateCount(el) {
//       const from = parseFloat(el.dataset.from ?? "0");
//       const to = parseFloat(el.dataset.to ?? "0");
//       const duration = parseInt(el.dataset.duration ?? "2000", 10);
//       const delay = parseInt(el.dataset.delay ?? "0", 10);
//       const dir = (el.dataset.direction  "up").toLowerCase();
//       const separator = el.dataset.separator  "";
//
//       const maxDecimals = Math.max(decimalsOf(from), decimalsOf(to));
//       const start = dir === "down" ? from : from;
//       const end = dir === "down" ? to : to;
//
//       if (prefersReduced || duration === 0) {
//         el.textContent = formatNumber(end, separator, maxDecimals);
//         return;
//       }
//
//       let startTime = null;
//       const totalChange = end - start;
//
//       function step(ts) {
//         if (!startTime) startTime = ts;
//         const elapsed = ts - startTime;
//         const t = Math.min(elapsed / duration, 1);
//         const eased = 1 - Math.pow(1 - t, 3);
//         const current = start + totalChange * eased;
//
//         el.textContent = formatNumber(current, separator, maxDecimals);
//
//         if (t < 1) {
//           requestAnimationFrame(step);
//         } else {
//           el.textContent = formatNumber(end, separator, maxDecimals);
//         }
//       }
//
//       setTimeout(() => requestAnimationFrame(step), delay);
//     }
//
//     // Trigger when elements enter the viewport
//     const io = ("IntersectionObserver" in window)
//       ? new IntersectionObserver((entries, obs) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               animateCount(entry.target);
//               obs.unobserve(entry.target);
//             }
//           });
//         }, { threshold: 0.2 })
//       : null;
//
//     els.forEach(el => {
//       el.textContent = el.dataset.from ?? "0";
//       if (io) io.observe(el);
//       else animateCount(el);
//     });
//   }, []);
//
//   return (
//     <>
//       <Header />
//
//       <section className="hero">
//         <div className="overlay"></div>
//         <div className="hero-content">
//           <h1>Unlock the door to your perfect property!</h1>
//           <p>We connect buyers, renters and landlords by simplifying their property search process and fostering transparent and efficient transactions, providing you the perfect property!</p>
//           <div className="search-container">
//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="Enter your location..."
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 onKeyPress={handleKeyPress}
//               />
//               <button onClick={findProperty}>Find property</button>
//             </div>
//           </div>
//         </div>
//       </section>
//
//       <div className="stats">
//         <div className="stat">
//           <span
//             className="countup"
//             data-from="0"
//             data-to="30000"
//             data-duration="3200"
//             data-delay="200"
//             data-separator=","
//           >
//             0
//           </span>
//           <p> + Properties sold</p>
//         </div>
//         <div className="stat">
//           <span
//             className="countup"
//             data-from="0"
//             data-to="10"
//             data-duration="3600"
//             data-delay="0"
//           >
//             0
//           </span>
//           <p>Years of experience</p>
//         </div>
//         <div className="stat">
//           <span
//             className="countup"
//             data-from="500"
//             data-to="12000"
//             data-duration="3200"
//             data-direction="down"
//           >
//             500
//           </span>
//           <p> + Clients</p>
//         </div>
//       </div>
//
//       <section className="properties">
//         <div className="container">
//           <div className="section-header">
//             <h2>Discount Offers on Properties in Enugu</h2>
//           </div>
//           <div className="view-all">
//             <button className="view-all-btn">View All </button>
//           </div>
//         </div>
//         <div className="property-grid">
//           {/* Property Card 1 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/Semi-detached.jpg" alt="Luxury Villa" />
//             </div>
//             <div className="property-details">
//               <h3>Semi-detached</h3>
//               <div className="features">
//                 <span> 4 Beds</span>
//                 <span> 4 Baths</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">Independence layout, Enugu</p>
//               <div className="price">
//                 <span className="amount"><s>₦5,000,000</s> ₦2,000,000</span>
//                 <button className="book_now-btn">Book Now</button>
//               </div>
//             </div>
//           </div>
//
//           {/* Property Card 2 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/Air-bnb.jpg" alt="Air-bnb" />
//             </div>
//             <div className="property-details">
//               <h3>Air-bnb</h3>
//               <div className="features">
//                 <span> 4 Beds</span>
//                 <span> 4 Baths</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">Independence layout, Enugu</p>
//               <div className="price">
//                 <span className="amount"><s>₦5,000,000</s> ₦1,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//
//           {/* Property Card 3 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/Twin-duplex.jpg" alt="Twin-duplex" />
//             </div>
//             <div className="property-details">
//               <h3>Twin-duplex</h3>
//               <div className="features">
//                 <span> 4 Beds</span>
//                 <span> 4 Baths</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">Independence layout, Enugu</p>
//               <div className="price">
//                 <span className="amount"><s>₦5,000,000</s> ₦1,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         <div className="container">
//           <div className="section-header">
//             <h2>New Listings In New Layout, Enugu</h2>
//           </div>
//           <div className="view-all">
//             <button className="view-all-btn">View All </button>
//           </div>
//         </div>
//         <div className="property-grid">
//           {/* Property Card 4 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/Bungalow.jpg" alt="Bungalow" />
//             </div>
//             <div className="property-details">
//               <h3>Bungalow</h3>
//               <div className="features">
//                 <span> 4 Beds</span>
//                 <span> 4 Baths</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">Independence layout, Enugu</p>
//               <div className="price">
//                 <span className="amount">₦3,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//
//           {/* Property Card 5 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/Twin-duplex2.png" alt="Twin-duplex" />
//             </div>
//             <div className="property-details">
//               <h3>Twin-duplex</h3>
//               <div className="features">
//                 <span> 4 Beds</span>
//                 <span> 4 Baths</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">Independence layout, Enugu</p>
//               <div className="price">
//                 <span className="amount">₦4,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//
//           {/* Property Card 6 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/Semi-detached2.jpg" alt="Semi-detached" />
//             </div>
//             <div className="property-details">
//               <h3>Semi-detached</h3>
//               <div className="features">
//                 <span> 4 Beds</span>
//                 <span> 4 Baths</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">Independence layout, Enugu</p>
//               <div className="price">
//                 <span className="amount">₦5,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         <div className="container">
//           <div className="section-header">
//             <h2>New Land Listings In GRA, Enugu</h2>
//           </div>
//           <div className="view-all">
//             <button className="view-all-btn">View All </button>
//           </div>
//         </div>
//         <div className="property-grid">
//           {/* Property Card 7 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/30 Hectares.jpg" alt="30 Hectares" />
//             </div>
//             <div className="property-details">
//               <h3>30 Hectares</h3>
//               <div className="features">
//                 <span> 4000mm x 5000mm</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">GRA, Enugu</p>
//               <div className="price">
//                 <span className="amount">₦20,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//
//           {/* Property Card 8 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/100 Wide Plots.jpg" alt="100 Wide Plots" />
//             </div>
//             <div className="property-details">
//               <h3>100 Wide Plots</h3>
//               <div className="features">
//                 <span> 9000mm x 9000mm</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">GRA, Enugu</p>
//               <div className="price">
//                 <span className="amount">₦10,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//
//           {/* Property Card 9 */}
//           <div className="property-card">
//             <div className="property-image">
//               <img src="/50 Hectares.jpg" alt="50 Hectares" />
//             </div>
//             <div className="property-details">
//               <h3>50 Hectares</h3>
//               <div className="features">
//                 <span> 4000mm x 4000mm</span>
//                 <span> 2,500 sqft</span>
//               </div>
//               <p className="location">GRA, Enugu</p>
//               <div className="price">
//                 <span className="amount">₦30,000,000</span>
//                 <button className="book_now-btn">Contact Now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//
//       {/* Newsletter Section */}
//       <section className="newsletter">
//         <div className="newsletter-container">
//           <div className="newsletter-content">
//             <h2>Subscribe to Our Newsletter</h2>
//             <p>Get full details on new listings</p>
//             <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
//               <input
//                 type="email"
//                 placeholder=" your email address"
//                 required
//                 value={newsletterEmail}
//                 onChange={(e) => setNewsletterEmail(e.target.value)}
//               />
//               <button type="submit">Subscribe</button>
//             </form>
//           </div>
//         </div>
//       </section>
//
//       <Footer />
//     </>
//   );
// };
//
// export default LandingPage;




import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const LandingPage = () => {
  const [location, setLocation] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const findProperty = () => {
    if (location.trim() === '') {
      alert('Please enter a location to search for properties.');
      return;
    }

    alert(`Searching for properties in: ${location}`);
    console.log('Searching for properties in:', location);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() === '') {
      alert('Please enter your email address.');
      return;
    }
    alert(`Thank you for subscribing with: ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      findProperty();
    }
  };

  // CountUp Animation Effect
  useEffect(() => {
    const els = document.querySelectorAll(".countup");
    if (!els.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function formatNumber(value, separator, decimals) {
      const opts = {
        useGrouping: !!separator,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      };
      let formatted = new Intl.NumberFormat("en-US", opts).format(value);
      if (separator && separator !== ",") {
        formatted = formatted.replace(/,/g, separator);
      }
      return formatted;
    }

    function decimalsOf(n) {
      const s = String(n);
      return s.includes(".") ? s.split(".")[1].length : 0;
    }

    function animateCount(el) {
      const from = parseFloat(el.dataset.from ?? "0");
      const to = parseFloat(el.dataset.to ?? "0");
      const duration = parseInt(el.dataset.duration ?? "2000", 10);
      const delay = parseInt(el.dataset.delay ?? "0", 10);
      const dir = (el.dataset.direction || "up").toLowerCase();
      const separator = el.dataset.separator || "";

      const maxDecimals = Math.max(decimalsOf(from), decimalsOf(to));
      const start = dir === "down" ? from : from;
      const end = dir === "down" ? to : to;

      if (prefersReduced || duration === 0) {
        el.textContent = formatNumber(end, separator, maxDecimals);
        return;
      }

      let startTime = null;
      const totalChange = end - start;

      function step(ts) {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = start + totalChange * eased;

        el.textContent = formatNumber(current, separator, maxDecimals);

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = formatNumber(end, separator, maxDecimals);
        }
      }

      setTimeout(() => requestAnimationFrame(step), delay);
    }

    // Trigger when elements enter the viewport
    const io = ("IntersectionObserver" in window)
      ? new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 })
      : null;

    els.forEach(el => {
      el.textContent = el.dataset.from ?? "0";
      if (io) io.observe(el);
      else animateCount(el);
    });
  }, []);

  return (
    <>
      <Header />

      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Unlock the door to your perfect property!</h1>
          <p>We connect buyers, renters and landlords by simplifying their property search process and fostering transparent and efficient transactions, providing you the perfect property!</p>
          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Enter your location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={findProperty}>Find property</button>
            </div>
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="stat">
          <span
            className="countup"
            data-from="0"
            data-to="30000"
            data-duration="3200"
            data-delay="200"
            data-separator=","
          >
            0
          </span>
          <p> + Properties sold</p>
        </div>
        <div className="stat">
          <span
            className="countup"
            data-from="0"
            data-to="10"
            data-duration="3600"
            data-delay="0"
          >
            0
          </span>
          <p>Years of experience</p>
        </div>
        <div className="stat">
          <span
            className="countup"
            data-from="500"
            data-to="12000"
            data-duration="3200"
            data-direction="down"
          >
            500
          </span>
          <p> + Clients</p>
        </div>
      </div>

      <section className="properties">
        <div className="container">
          <div className="section-header">
            <h2>Discount Offers on Properties in Enugu</h2>
          </div>
          <div className="view-all">
            <button className="view-all-btn">View All </button>
          </div>
        </div>
        <div className="property-grid">
          {/* Property Card 1 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/Semi-detached.jpg" alt="Luxury Villa" />
            </div>
            <div className="property-details">
              <h3>Semi-detached</h3>
              <div className="features">
                <span> 4 Beds</span>
                <span> 4 Baths</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">Independence layout, Enugu</p>
              <div className="price">
                <span className="amount"><s>₦5,000,000</s> ₦2,000,000</span>
                <button className="book_now-btn">Book Now</button>
              </div>
            </div>
          </div>

          {/* Property Card 2 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/Air-bnb.jpg" alt="Air-bnb" />
            </div>
            <div className="property-details">
              <h3>Air-bnb</h3>
              <div className="features">
                <span> 4 Beds</span>
                <span> 4 Baths</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">Independence layout, Enugu</p>
              <div className="price">
                <span className="amount"><s>₦5,000,000</s> ₦1,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>

          {/* Property Card 3 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/Twin-duplex.jpg" alt="Twin-duplex" />
            </div>
            <div className="property-details">
              <h3>Twin-duplex</h3>
              <div className="features">
                <span> 4 Beds</span>
                <span> 4 Baths</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">Independence layout, Enugu</p>
              <div className="price">
                <span className="amount"><s>₦5,000,000</s> ₦1,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section-header">
            <h2>New Listings In New Layout, Enugu</h2>
          </div>
          <div className="view-all">
            <button className="view-all-btn">View All </button>
          </div>
        </div>
        <div className="property-grid">
          {/* Property Card 4 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/Bungalow.jpg" alt="Bungalow" />
            </div>
            <div className="property-details">
              <h3>Bungalow</h3>
              <div className="features">
                <span> 4 Beds</span>
                <span> 4 Baths</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">Independence layout, Enugu</p>
              <div className="price">
                <span className="amount">₦3,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>

          {/* Property Card 5 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/Twin-duplex2.png" alt="Twin-duplex" />
            </div>
            <div className="property-details">
              <h3>Twin-duplex</h3>
              <div className="features">
                <span> 4 Beds</span>
                <span> 4 Baths</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">Independence layout, Enugu</p>
              <div className="price">
                <span className="amount">₦4,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>

          {/* Property Card 6 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/Semi-detached2.jpg" alt="Semi-detached" />
            </div>
            <div className="property-details">
              <h3>Semi-detached</h3>
              <div className="features">
                <span> 4 Beds</span>
                <span> 4 Baths</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">Independence layout, Enugu</p>
              <div className="price">
                <span className="amount">₦5,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section-header">
            <h2>New Land Listings In GRA, Enugu</h2>
          </div>
          <div className="view-all">
            <button className="view-all-btn">View All </button>
          </div>
        </div>
        <div className="property-grid">
          {/* Property Card 7 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/30 Hectares.jpg" alt="30 Hectares" />
            </div>
            <div className="property-details">
              <h3>30 Hectares</h3>
              <div className="features">
                <span> 4000mm x 5000mm</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">GRA, Enugu</p>
              <div className="price">
                <span className="amount">₦20,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>

          {/* Property Card 8 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/100 Wide Plots.jpg" alt="100 Wide Plots" />
            </div>
            <div className="property-details">
              <h3>100 Wide Plots</h3>
              <div className="features">
                <span> 9000mm x 9000mm</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">GRA, Enugu</p>
              <div className="price">
                <span className="amount">₦10,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>

          {/* Property Card 9 */}
          <div className="property-card">
            <div className="property-image">
              <img src="/50 Hectares.jpg" alt="50 Hectares" />
            </div>
            <div className="property-details">
              <h3>50 Hectares</h3>
              <div className="features">
                <span> 4000mm x 4000mm</span>
                <span> 2,500 sqft</span>
              </div>
              <p className="location">GRA, Enugu</p>
              <div className="price">
                <span className="amount">₦30,000,000</span>
                <button className="book_now-btn">Contact Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get full details on new listings</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder=" your email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;