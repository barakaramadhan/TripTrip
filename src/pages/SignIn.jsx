import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import AuthButton from "../components/auth/AuthButton";
import AuthHeading from "../components/auth/AuthHeading";
import AuthSwitchLink from "../components/auth/AuthSwitchLink";
import FormAlert from "../components/auth/FormAlert";
import FormField from "../components/auth/FormField";
import useFormState from "../hooks/useFormState";
import { sendPasswordReset, signIn } from "../services/authService";
import { fadeUp, formVariants } from "../animations/variants";
import { hasErrors, validateEmail, validateSignIn } from "../utils/validators";

export default function SignIn() {
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useFormState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'error' | 'success', message }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateSignIn(values);
    setErrors(formErrors);
    if (hasErrors(formErrors)) return;

    setIsLoading(true);
    setAlert(null);

    try {
      await signIn(values);
      navigate("/"); // berhasil -> ke halaman utama
    } catch (error) {
      setAlert({ type: "error", message: error.message });
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const emailError = validateEmail(values.email);
    if (emailError) {
      setErrors({
        email: 'Enter your email first, then press "Forgot Password?".',
      });
      return;
    }

    try {
      await sendPasswordReset(values.email);
      setAlert({
        type: "success",
        message: "Password reset link sent. Please check your email.",
      });
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5">
      <AuthHeading
        title="Welcome Back!"
        subtitle="Sign in to continue planning your trip."
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="Your@gmail.com"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      <motion.div
        variants={fadeUp}
        className="flex justify-between items-center text-base">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
            className="size-5 accent-primaryForest cursor-pointer"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="font-bold hover:underline cursor-pointer">
          Forgot Password?
        </button>
      </motion.div>

      <FormAlert alert={alert} />

      <motion.div variants={fadeUp} className="mt-6">
        <AuthButton type="submit" loading={isLoading} className="w-full">
          Sign In
        </AuthButton>
      </motion.div>

      <AuthSwitchLink
        text="Don't have an account yet?"
        linkText="Sign Up"
        to="/signup"
      />
    </motion.form>
  );
}
