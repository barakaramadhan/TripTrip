import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

const inputBase =
  'h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition placeholder:text-textMoss/30 focus:ring-4'
const inputNormal = 'border-secondarySage focus:border-primaryForest focus:ring-secondarySage/40'
const inputError = 'border-red-400 focus:border-red-500 focus:ring-red-100'

// Satu field form: label + input (atau dropdown) + pesan error yang muncul dengan animasi.
//   - type="password"  -> otomatis ada tombol mata (show / hide)
//   - options={[...]}  -> tampil sebagai dropdown
export default function FormField({ label, name, type = 'text', options, error, ...inputProps }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  const className = [
    inputBase,
    error ? inputError : inputNormal,
    isPassword || options ? 'pr-12' : '',
    options ? 'appearance-none' : '',
  ].join(' ')

  return (
    <motion.div variants={fadeUp}>
      <label htmlFor={name} className="mb-2 block text-base font-medium">
        {label}
      </label>

      <div className="relative">
        {options ? (
          <select id={name} name={name} aria-invalid={Boolean(error)} className={className} {...inputProps}>
            <option value="">Select your country</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={isPassword && showPassword ? 'text' : type}
            aria-invalid={Boolean(error)}
            className={className}
            {...inputProps}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-textMoss/50 transition hover:text-textMoss"
          >
            <i className={`fi ${showPassword ? 'fi-rr-eye-crossed' : 'fi-rr-eye'}`} />
          </button>
        )}

        {options && (
          <i className="fi fi-rr-angle-small-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg" />
        )}
      </div>

      {/* Pesan error membuka / menutup dengan animasi tinggi */}
      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p role="alert" className="pt-1.5 text-sm text-red-500">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
