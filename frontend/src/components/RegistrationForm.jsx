import { useState } from "react";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,

          email: email,

          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Registration Failed");
      }
    } catch (error) {
      setError("Laravel Server Not Connected");
    }
  };

  return (
    <div className="form-card">
      <div className="logo">🚀</div>

      <h2>Create Account</h2>

      <p className="subtitle">Join our deployment practice app</p>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register Now</button>

      {message && <p className="success">✅ {message}</p>}

      {error && <p className="error">❌ {error}</p>}
    </div>
  );
}

export default RegistrationForm;
