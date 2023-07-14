import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Успешный вход
        setError("");
        navigate("/dashboard"); // Перенаправление на страницу Dashboard
      })
      .catch((error) => {
        // Обработка ошибок входа
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p>{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default LoginForm;
