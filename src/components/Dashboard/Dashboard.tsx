import React, { useEffect, useState } from "react";
import { auth, User } from "../../firebaseConfig";

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Пользователь аутентифицирован
        setUser(currentUser);
      } else {
        // Пользователь не аутентифицирован
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      {user ? (
        <div>
          <h2>Добро пожаловать, {user.displayName || user.email}!</h2>
          {/* Дополнительная информация о пользователе */}
        </div>
      ) : (
        <h2>Пожалуйста, войдите в свою учетную запись.</h2>
      )}
    </div>
  );
};

export default Dashboard;
