import { motion } from "framer-motion";
import { Link } from "react-router";
import { fadeUp } from "../../animations/variants";

// Teks kecil di bawah form: "Don't have an account yet? Sign Up"
export default function AuthSwitchLink({ text, linkText, to }) {
  return (
    <motion.p variants={fadeUp} className="text-base">
      {text}{" "}
      <Link to={to} className="font-bold hover:underline">
        {linkText}
      </Link>
    </motion.p>
  );
}
