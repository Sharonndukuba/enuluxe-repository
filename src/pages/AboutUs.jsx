import React from "react";
import Header from "../components/Header.jsx";

export default function AboutUs() {
    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('real-estate.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                margin: 0,
                minHeight: "100vh",
                width: "100%",
                padding: "20px",
                paddingTop: "100px", // ✅ to prevent overlap with header
            }}
        >

            <Header />

            <h1
                style={{
                    margin: "70px auto 10px 30px",
                    color: "#DEDFE9",
                    fontFamily: "sans-serif",
                }}
            >
                Who are we?
            </h1>
            <h4
                style={{
                    margin: "0px auto 10px 30px",
                    color: "#DEDFE9",
                    lineHeight: 1.5,
                }}
            >
                Welcome to Enuluxe, your trusted real estate partner based in Lagos, Nigeria.
                We specialize in property sales, rentals, and management — from affordable
                apartments to luxury estates. Whether you’re a first-time homebuyer, a
                growing family, or an investor, we are here to connect you with the right
                property.
            </h4>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "200px",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >
                {/* Mission */}
                <div
                    style={{
                        backgroundColor: "rgba(222,223,233,0.58)",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "400px",
                        maxWidth: "90%",
                        height: "400px",
                        boxSizing: "border-box",
                    }}
                >
                    <h1
                        style={{
                            marginBottom: "10px",
                            color: "#333",
                            fontFamily: "sans-serif",
                        }}
                    >
                        Mission
                    </h1>
                    <h4 style={{ color: "#333", lineHeight: 1.5 }}>
                        Our mission is simple: to make finding a home stress-free,
                        transparent, and rewarding. We believe everyone deserves a place they
                        can truly call home — a space filled with comfort, security, and
                        lasting memories. By combining expert guidance, trust, and
                        innovation, we’re here to ensure your journey to homeownership is as
                        smooth and fulfilling as possible.
                    </h4>
                </div>

                {/* Vision */}
                <div
                    style={{
                        backgroundColor: "rgba(222,223,233,0.58)",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "400px",
                        maxWidth: "90%",
                        height: "400px",
                        boxSizing: "border-box",
                    }}
                >
                    <h2
                        style={{
                            color: "#333",
                            fontFamily: "sans-serif",
                            fontWeight: "bolder",
                        }}
                    >
                        Vision
                    </h2>
                    <h4 style={{ color: "#333", lineHeight: 1.5 }}>
                        Our vision is to become the leading real estate brand in Nigeria,
                        known for integrity, innovation, and unmatched customer service —
                        helping people turn their property dreams into reality. We aspire to
                        redefine real estate by setting new standards of trust and
                        excellence, while helping people transform their property dreams into
                        lasting realities. Through continuous growth and forward-thinking
                        solutions, we aim to be the first choice for individuals, families,
                        and investors seeking a home or property they can truly value.
                    </h4>
                </div>
            </div>

            <h1
                style={{
                    margin: "50px auto 20px 30px",
                    color: "#DEDFE9",
                    fontFamily: "sans-serif",
                }}
            >
                Why choose us?
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    margin: "20px auto",
                }}
            >
                {/* Card 1 */}
                <div
                    style={{
                        textAlign: "center",
                        padding: "20px",
                        fontSize: "14px",
                        lineHeight: 1.4,
                        width: "200px",
                        height: "200px",
                        background: "rgba(222,223,233,0.58)",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Wide Range of Properties <br /> Homes for every lifestyle.
                </div>

                {/* Card 2 */}
                <div
                    style={{
                        textAlign: "center",
                        padding: "20px",
                        fontSize: "14px",
                        lineHeight: 1.4,
                        width: "200px",
                        height: "200px",
                        background: "rgba(222,223,233,0.58)",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Expert Guidance <br /> Helping you find your dream home.
                </div>

                {/* Card 3 */}
                <div
                    style={{
                        textAlign: "center",
                        padding: "20px",
                        fontSize: "14px",
                        lineHeight: 1.4,
                        width: "200px",
                        height: "200px",
                        background: "rgba(222,223,233,0.58)",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Trusted Service <br /> Integrity and transparency always.
                </div>
            </div>
        </div>
    );
}
