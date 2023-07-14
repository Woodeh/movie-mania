import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { SignInPage } from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { RegistrationConfirmPage } from "../pages/RegistrationConfirmPage/RegistrationConfirmPage";
import { ActivatePage } from "../pages/ActivatePage/ActivatePage";
import { useAppSelector } from "../store/hooks";
import { ProtectedRoute } from "./ProtectedRoute";
import { Settings } from "../pages/SettingsPage/SettingsPage";
import { MoviePage } from "../pages/MoviePage/MoviePage";
import { Trends } from "../pages/TrendsPage/TrendsPage";
import { Favorites } from "../pages/FavoritesPage/FavoritesPage";
import { Search } from "../pages/SearchPage/SearchPage";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const Router: FC = () => {
  const { confirmEmail } = useAppSelector((state) => state.confirmEmail);

  return (
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/trends" element={<Trends />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/movies/:id" element={<MoviePage match={{ params: { id: "" } }} />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/search-page" element={<Search />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/activate/:uid/:token" element={<ActivatePage />} />
      <Route element={<ProtectedRoute access={!!confirmEmail} />}>
        <Route path="/confirm-registration" element={<RegistrationConfirmPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Route>
      <Route path="*" element={<MainPage />} /> 
    </Routes>
  );
};
