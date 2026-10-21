import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import LandingPage from "./pages/LandingPage";

// Halaman auth dimuat saat dibutuhkan saja, jadi landing page lebih ringan
// dan tidak ikut memuat Supabase.
const AuthLayout = lazy(() => import("./components/auth/AuthLayout"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Dashboard (setelah login). Dimuat terpisah supaya landing page tidak bertambah berat.
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const PlanTrip = lazy(() => import("./pages/dashboard/PlanTrip"));
const DestinationsPage = lazy(() => import("./pages/dashboard/DestinationsPage"));
const MapPage = lazy(() => import("./pages/dashboard/MapPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="bg-backgroundIvory min-h-dvh" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Sign In & Sign Up berbagi satu layout, jadi sisi kiri tidak di-reload saat pindah halaman */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="plan" element={<PlanTrip />} />
            <Route path="map" element={<MapPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
