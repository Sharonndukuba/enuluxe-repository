import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios.jsx";

const CLIENT_ID =
    "746210027077-qj0dikikmqi7cru23fv9v7h42fn5u9k4.apps.googleusercontent.com";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); // 👈 loader state
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const scriptId = "google-client-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.id = scriptId;
            script.onload = () => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: CLIENT_ID,
                        callback: (response) => {
                            localStorage.setItem("token", response.credential);
                            navigate("/");
                        },
                        ux_mode: "popup",
                    });

                    window.google.accounts.id.renderButton(
                        document.getElementById("g_id_signin"),
                        {
                            theme: "outline",
                            size: "large",
                            text: "signin_with",
                            shape: "pill",
                            width: "100%",
                        }
                    );
                }
            };
            document.body.appendChild(script);
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true); // start loader
        try {
            const res = await api.post(
                "https://realestateapis.onrender.com/user/login",
                form
            );

            if (res.data?.token) {
                localStorage.setItem("token", res.data.token); // save token
                console.log("Token saved from backend:", localStorage.getItem("token"));
            }

            // const token = res.data;
            // if (token) {
            //     localStorage.setItem("token", token);
            //     console.log("Saved Token", token)
            // }


            setSuccess("Login successful! Redirecting...");
            setError("");

            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            setSuccess("");
        } finally {
            setLoading(false); // stop loader
        }
    };

    // Styles
    const styles = {
        body: {
            margin: 0,
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            background: "url('/img.png') no-repeat center center / cover",
            height: "100vh",
        },
        overlay: {
            backgroundColor: "rgba(0,0,0,0.7)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            background: "rgba(244,241,241,0.37)",
            padding: "40px 30px",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
        },
        h2: { marginBottom: "25px", fontWeight: "normal" },
        divider: { margin: "20px 0", fontSize: "14px", color: "#666" },
        input: {
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "14px",
        },
        forgot: {
            display: "block",
            textAlign: "right",
            fontSize: "13px",
            color: "#c0392b",
            textDecoration: "none",
            marginBottom: "20px",
        },
        button: {
            width: "100%",
            padding: "12px",
            backgroundColor: "#00005c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
        },
        spinner: {
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #fff",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            animation: "spin 1s linear infinite",
        },
        signup: { marginTop: "20px", fontSize: "14px" },
        signupLink: { color: "#00005c", textDecoration: "none" },
        message: { marginTop: "10px", fontSize: "14px" },
        error: { color: "red" },
        success: { color: "green" },
    };

    return (
        <div style={styles.body}>
            <div style={styles.overlay}>
                <div style={styles.container}>
                    <h2 style={styles.h2}>Welcome back</h2>

                    {/* Google Sign-In */}
                    <div id="g_id_signin" style={{ marginBottom: "20px" }}></div>

                    <div style={styles.divider}>or</div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />

                        <a href="#" style={styles.forgot}>
                            Forgot password?
                        </a>

                        <button
                            type="submit"
                            style={styles.button}
                            disabled={loading}
                            onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#000042")
                            }
                            onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#00005c")
                            }
                        >
                            {loading ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    Loading...
                                </>
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </form>

                    {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}
                    {success && (
                        <p style={{ ...styles.message, ...styles.success }}>{success}</p>
                    )}

                    <p style={styles.signup}>
                        Don't have an account?{" "}
                        <Link to="/register" style={styles.signupLink}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

