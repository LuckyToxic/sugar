import { Route, Routes } from "react-router";
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

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/create-password" element={<CreatePasswordPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
        <Route
          path="/password-recovery-code"
          element={<PasswordRecoveryCodePage />}
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/food-detector" element={<FoodDetectorPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/chat" element={<AskDoctorPage />} />
        <Route path="/woman-diary" element={<WomanDiaryPage />} />
      </Route>
    </Routes>
  );
}
