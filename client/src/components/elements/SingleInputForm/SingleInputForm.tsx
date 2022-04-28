import { FormEvent, MutableRefObject, useRef, useState } from 'react'

interface SingleInputFormProps {
  onSubmit?: (inputRef: MutableRefObject<HTMLInputElement | null>) => void
  inputType?: string
  inputPlaceholder?: string
  formError?: string
}

export const SingleInputForm: React.FC<SingleInputFormProps> = ({
  onSubmit,
  inputType,
  inputPlaceholder,
  formError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit) onSubmit(inputRef)
      }}
    >
      <input type={inputType} placeholder={inputPlaceholder} ref={inputRef} />
      {formError && <div>{formError}</div>}
      <button type="submit">Submit</button>
    </form>
  )
}
