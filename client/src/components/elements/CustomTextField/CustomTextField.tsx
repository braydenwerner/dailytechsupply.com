import { FieldProps } from 'formik'

import * as Styled from './CustomTextField.styled'

type CustomTextFieldProps = {
  required: boolean
  placeholder?: string
  type?: string
} & FieldProps

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeholder,
  type,
  required,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <Styled.CssTextField
      label={placeholder}
      variant="outlined"
      margin="normal"
      required={required}
      type={type}
      error={!!errors[field.name]}
      helperText={errors[field.name]}
      {...field}
      {...props}
    />
  )
}
