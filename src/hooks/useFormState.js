import { useState } from 'react'

// Hook kecil untuk mengurus nilai input + pesan error.
// Pesan error sebuah field otomatis hilang begitu user mengetik lagi di field itu.

export default function useFormState(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return { values, errors, setErrors, handleChange }
}
