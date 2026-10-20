import { motion } from 'framer-motion'
import AuthButton from './AuthButton'
import AuthHeading from './AuthHeading'
import AuthSwitchLink from './AuthSwitchLink'
import FormField from './FormField'
import { fadeUp, formVariants } from '../../animations/variants'

// Sign Up - Step 1: Full Name, Email, Password
export default function SignUpAccountStep({ direction, values, errors, onChange, onSubmit }) {
  return (
    <motion.form
      variants={formVariants}
      custom={direction}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <AuthHeading title="Create Your Account" subtitle="Sign up for free and start planning your first trip." />

      <FormField
        label="Full Name"
        name="fullName"
        placeholder="Your Name"
        autoComplete="name"
        value={values.fullName}
        onChange={onChange}
        error={errors.fullName}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="Your@gmail.com"
        autoComplete="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password"
        autoComplete="new-password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
      />

      <motion.div variants={fadeUp} className="mt-8">
        <AuthButton type="submit" className="w-full">
          Next
        </AuthButton>
      </motion.div>

      <AuthSwitchLink text="Already have an account?" linkText="Sign In" to="/signin" />
    </motion.form>
  )
}
