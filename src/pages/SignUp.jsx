import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import EmailSentNotice from "../components/auth/EmailSentNotice";
import SignUpAccountStep from "../components/auth/SignUpAccountStep";
import SignUpLocationStep from "../components/auth/SignUpLocationStep";
import StepProgress from "../components/auth/StepProgress";
import useFormState from "../hooks/useFormState";
import { signUp } from "../services/authService";
import {
  hasErrors,
  validateAccountStep,
  validateLocationStep,
} from "../utils/validators";

// Sign Up dua langkah:  Step 0 = Account  ->  Step 1 = Location  ->  (opsional) cek email
export default function SignUp() {
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useFormState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = maju, -1 = mundur (arah geser animasi)
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const goToStep = (nextStep) => {
    setDirection(nextStep > step ? 1 : -1);
    setErrors({});
    setStep(nextStep);
  };

  // Step 1 -> Step 2 (hanya jika data akun valid)
  const handleNext = (event) => {
    event.preventDefault();
    const stepErrors = validateAccountStep(values);
    setErrors(stepErrors);
    if (!hasErrors(stepErrors)) goToStep(1);
  };

  // Kirim semua data ke Supabase
  const handleSubmit = async (event) => {
    event.preventDefault();
    const stepErrors = validateLocationStep(values);
    setErrors(stepErrors);
    if (hasErrors(stepErrors)) return;

    setIsLoading(true);
    setServerError("");

    try {
      const { needsEmailConfirmation } = await signUp(values);
      if (needsEmailConfirmation) {
        setDirection(1);
        setIsEmailSent(true);
      } else {
        navigate("/"); // konfirmasi email dimatikan -> user langsung login
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isEmailSent) {
      return (
        <EmailSentNotice
          key="sent"
          direction={direction}
          email={values.email}
        />
      );
    }

    if (step === 0) {
      return (
        <SignUpAccountStep
          key="account"
          direction={direction}
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleNext}
        />
      );
    }

    return (
      <SignUpLocationStep
        key="location"
        direction={direction}
        values={values}
        errors={errors}
        serverError={serverError}
        isLoading={isLoading}
        onChange={handleChange}
        onBack={() => goToStep(0)}
        onSubmit={handleSubmit}
      />
    );
  };

  return (
    <>
      {!isEmailSent && <StepProgress currentStep={step} />}

      {/* `custom` diteruskan ke komponen yang sedang keluar, supaya arah geser exit-nya benar */}
      <AnimatePresence mode="wait" custom={direction}>
        {renderContent()}
      </AnimatePresence>
    </>
  );
}
