import { motion } from 'framer-motion'
import AuthButton from './AuthButton'
import AuthHeading from './AuthHeading'
import AuthSwitchLink from './AuthSwitchLink'
import FormAlert from './FormAlert'
import FormField from './FormField'
import { COUNTRIES } from '../../constants/countries'
import { fadeUp, formVariants } from '../../animations/variants'

// Sign Up - Step 2: Address, City, Postal Code, Country
export default function SignUpLocationStep({ direction, values, errors, serverError, isLoading, onChange, onBack, onSubmit }) {
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
      <AuthHeading title="Where Are You Traveling From?" subtitle="Tell us where your journey begins so we can plan the best routes for you." />

      <FormField
        label="Address"
        name="address"
        placeholder="Street address, ZIP code"
        autoComplete="street-address"
        value={values.address}
        onChange={onChange}
        error={errors.address}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="City"
          name="city"
          placeholder="Enter your city"
          autoComplete="address-level2"
          value={values.city}
          onChange={onChange}
          error={errors.city}
        />
        <FormField
          label="Postal Code"
          name="postalCode"
          placeholder="Enter postal code"
          autoComplete="postal-code"
          value={values.postalCode}
          onChange={onChange}
          error={errors.postalCode}
        />
      </div>

      <FormField
        label="Country"
        name="country"
        options={COUNTRIES}
        autoComplete="country-name"
        value={values.country}
        onChange={onChange}
        error={errors.country}
      />

      <FormAlert alert={serverError ? { type: 'error', message: serverError } : null} />

      <motion.div variants={fadeUp} className="mt-4 flex gap-4">
        <AuthButton type="button" variant="secondary" onClick={onBack} className="px-8">
          Back
        </AuthButton>
        <AuthButton type="submit" loading={isLoading} className="flex-1">
          Create Account
        </AuthButton>
      </motion.div>

      <AuthSwitchLink text="Already have an account?" linkText="Sign In" to="/signin" />
    </motion.form>
  )
}
