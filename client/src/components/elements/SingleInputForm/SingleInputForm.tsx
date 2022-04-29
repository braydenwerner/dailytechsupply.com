import { FormEvent, MutableRefObject, useRef } from 'react'

import * as Styled from './SingleInputForm.styled'

interface SingleInputFormProps {
  onSubmit?: (inputRef: MutableRefObject<HTMLInputElement | null>) => void
  inputType?: string
  inputTitle?: string
  formError?: string
  submitTitle?: string
}

export const SingleInputForm: React.FC<SingleInputFormProps> = ({
  onSubmit,
  inputType,
  inputTitle,
  formError,
  submitTitle,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Styled.Form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit) onSubmit(inputRef)
      }}
    >
      <Styled.Title>{inputTitle}</Styled.Title>
      <Styled.Input type={inputType} ref={inputRef} />
      {formError && <Styled.Error>{formError}</Styled.Error>}
      <Styled.Submit type="submit">
        <Styled.SubmitText>
          {submitTitle ? submitTitle : 'Submit'}
        </Styled.SubmitText>
      </Styled.Submit>
    </Styled.Form>
  )
}
