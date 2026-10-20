import { motion } from "framer-motion";
import AuthHeading from "./AuthHeading";
import AuthSwitchLink from "./AuthSwitchLink";
import { fadeUp, formVariants } from "../../animations/variants";

// Tampil setelah Sign Up berhasil, kalau Supabase meminta konfirmasi email.
export default function EmailSentNotice({ direction, email }) {
  return (
    <motion.div
      variants={formVariants}
      custom={direction}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center gap-5 py-10 text-center">
      <motion.div
        variants={fadeUp}
        className="place-items-center grid bg-secondarySage/40 rounded-full size-16 text-primaryForest text-3xl">
        <i className="fi fi-rr-envelope" />
      </motion.div>

      <AuthHeading
        title="Check Your Inbox"
        subtitle={`We sent a confirmation link to ${email}. Click it to activate your account.`}
      />

      <AuthSwitchLink
        text="Already confirmed?"
        linkText="Sign In"
        to="/signin"
      />
    </motion.div>
  );
}
