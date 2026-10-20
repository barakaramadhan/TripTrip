// Validasi form sederhana. Setiap fungsi mengembalikan object { namaField: 'pesan error' }.
// Object kosong = semua valid.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (email) =>
  EMAIL_REGEX.test(email.trim()) ? undefined : 'Please enter a valid email address.'

const validatePassword = (password) =>
  password.length >= 8 ? undefined : 'Password must be at least 8 characters.'

const required = (value, message) => (value.trim() ? undefined : message)

// Buang field yang tidak error supaya `hasErrors` cukup cek jumlah key
const clean = (errors) => Object.fromEntries(Object.entries(errors).filter(([, message]) => message))

export const validateSignIn = ({ email, password }) =>
  clean({
    email: validateEmail(email),
    password: required(password, 'Please enter your password.'),
  })

export const validateAccountStep = ({ fullName, email, password }) =>
  clean({
    fullName: required(fullName, 'Please enter your name.'),
    email: validateEmail(email),
    password: validatePassword(password),
  })

export const validateLocationStep = ({ address, city, postalCode, country }) =>
  clean({
    address: required(address, 'Please enter your address.'),
    city: required(city, 'Please enter your city.'),
    postalCode: required(postalCode, 'Please enter your postal code.'),
    country: required(country, 'Please select your country.'),
  })

export const hasErrors = (errors) => Object.keys(errors).length > 0
