import { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { useAppSelector } from "../store/hooks";
import { Settings } from "../pages/SettingsPage/SettingsPage";
import { MoviePage } from "../pages/MoviePage/MoviePage";
import { Trends } from "../pages/TrendsPage/TrendsPage";
import { Favorites } from "../pages/FavoritesPage/FavoritesPage";
import { Search } from "../pages/SearchPage/SearchPage";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const Router: FC = () => {
  const { confirmEmail } = useAppSelector((state) => state.confirmEmail);

  const isAuthenticated = !!confirmEmail;

  return (
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/trends" element={<Trends />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/movies/:id" element={<MoviePage match={{ params: { id: "" } }} />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/search-page" element={<Search />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/dashboard" />}
      />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
