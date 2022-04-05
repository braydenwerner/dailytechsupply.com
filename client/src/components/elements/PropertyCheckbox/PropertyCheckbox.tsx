import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'

interface CheckboxProps {
  defaultValue: boolean
  handleCheckboxSubmit: (value: boolean) => void
}

export const PropertyCheckbox: React.FC<CheckboxProps> = ({
  defaultValue,
  handleCheckboxSubmit,
}) => {
  const [checked, setChecked] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    setChecked(value)
    handleCheckboxSubmit(value)
  }

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  )
}
