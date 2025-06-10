import { Navigate, Route, Routes } from "react-router";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import Layout from "../layout/Layout";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import ConfirmEmailPage from "@/pages/SignUpPage/ConfirmEmailPage";
import CreatePasswordPage from "@/pages/SignUpPage/CreatePasswordPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import PasswordRecoveryPage from "@/pages/SignInPage/PasswordRecoveryPage";
import PasswordRecoveryCodePage from "@/pages/SignInPage/PasswordRecoveryCodePage";
import ServicesPage from "@/pages/ServicesPage/ServicesPage";
import FoodDetectorPage from "@/pages/FoodDetectorPage/FoodDetectorPage";
import DiaryPage from "@/pages/DiaryPage/DiaryPage";
import AskDoctorPage from "@/pages/AskDoctorPage/AskDoctorPage";
import WomanDiaryPage from "@/pages/WomanDiaryPage/WomanDiaryPage";
import AnalysesDetectPage from "@/pages/AnalysesDetectPage/AnalysesDetectPage";
import CheckupPage from "@/pages/Checkup/CheckupPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { RedirectAuthorized } from "./RedirectAuthorized";

export default function Router() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "/services" : "/sign-in"} replace />}
      />

      <Route path="/" element={<Layout />}>
        <Route
          path="/sign-up"
          element={
            <RedirectAuthorized>
              <SignUpPage />
            </RedirectAuthorized>
          }
        />
        <Route
          path="/confirm-email"
          element={
            <RedirectAuthorized>
              <ConfirmEmailPage />
            </RedirectAuthorized>
          }
        />
        <Route
          path="/create-password"
          element={
            <RedirectAuthorized>
              <CreatePasswordPage />
            </RedirectAuthorized>
          }
        />
        <Route
          path="/sign-in"
          element={
            <RedirectAuthorized>
              <SignInPage />
            </RedirectAuthorized>
          }
        />
        <Route
          path="/password-recovery"
          element={
            <RedirectAuthorized>
              <PasswordRecoveryPage />
            </RedirectAuthorized>
          }
        />
        <Route
          path="/password-recovery-code"
          element={
            <RedirectAuthorized>
              <PasswordRecoveryCodePage />
            </RedirectAuthorized>
          }
        />

        {/* Protected routes */}
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-detector"
          element={
            <ProtectedRoute>
              <FoodDetectorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <ProtectedRoute>
              <DiaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AskDoctorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/woman-diary"
          element={
            <ProtectedRoute>
              <WomanDiaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyses-detect"
          element={
            <ProtectedRoute>
              <AnalysesDetectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkup"
          element={
            <ProtectedRoute>
              <CheckupPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
