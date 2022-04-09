import { FieldProps } from 'formik'

import * as Styled from './CustomTextField.styled'

type CustomTextFieldProps = {
  mandatory: boolean
  placeholder?: string
  type?: string
} & FieldProps

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeholder,
  type,
  mandatory,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <>
      <div>
        {placeholder}
        {mandatory ? ' *' : ''}
      </div>
      <Styled.TextInput type={type} {...field} {...props} />
    </>
  )
}
