import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import ConfirmEmailPage from "../../pages/SignUpPage/ConfirmEmailPage";
import CreatePasswordPage from "../../pages/SignUpPage/CreatePasswordPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import PasswordRecoveryPage from "../../pages/SignInPage/PasswordRecoveryPage";
import PasswordRecoveryCodePage from "../../pages/SignInPage/PasswordRecoveryCodePage";
import ServicesPage from "../../pages/ServicesPage/ServicesPage";
import FoodDetectorPage from "../../pages/FoodDetectorPage/FoodDetectorPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

export default function Router() {
  return (
    <BrowserRouter basename="/sugar/">
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
          <Route path="/account" element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
