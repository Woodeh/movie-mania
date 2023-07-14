import React, { useState } from "react";
import { auth } from "../../firebaseConfig";

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleRegister = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user?.updateProfile({
          displayName: nickname,
        });
      })
      .then(() => {
        // Обработка успешной регистрации
        console.log("Регистрация прошла успешно");
      })
      .catch((error) => {
        // Обработка ошибок регистрации
        console.error(error);
      });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default RegistrationForm;
