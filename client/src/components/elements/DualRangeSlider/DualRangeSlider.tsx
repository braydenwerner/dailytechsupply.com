import { useState } from 'react'
import { SliderThumb } from '@mui/material/Slider'
import Box from '@mui/material/Box'

import { AirbnbSlider } from './DualRangeSlider.styled'
import { Wrapper } from '../../../styles/shared.styled'

const valuetext = (value: number) => `${value}`

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}

interface DualRangeSliderProps {
  minValue: number
  maxValue: number
  minDistance: number
  defaultValue: number[]
  formatValueLabel?: (value: number) => string
  handleRangeSubmit: (values: number[]) => void
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  minValue,
  maxValue,
  minDistance,
  defaultValue,
  formatValueLabel,
  handleRangeSubmit,
}) => {
  const [value, setValue] = useState<number[]>(defaultValue)

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxValue - minDistance)
        setValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue([clamped - minDistance, clamped])
      }
    } else {
      setValue(newValue as number[])
    }
  }

  //  upon mouse leaving range slider area, mouseup will not trigger
  //  so we have to bind it to the DOM. However, doing so would
  //  also bind an old version of value to the function, so we have to
  //  get the most recent version of value as well
  const handleMouseDown = () => {
    const getUpdatedValue = () => {
      let value = [minValue, maxValue]
      setValue((oldValue) => {
        value = oldValue
        return oldValue
      })

      return value
    }

    document.addEventListener(
      'mouseup',
      () => handleRangeSubmit(getUpdatedValue()),
      { once: true }
    )
  }

  return (
    <Box sx={{ width: 250 }}>
      <Wrapper>
        <AirbnbSlider
          value={value}
          min={minValue}
          max={maxValue}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          components={{ Thumb: AirbnbThumbComponent }}
          getAriaLabel={() => 'Minimum distance shift'}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => {
            if (!formatValueLabel) return value
            return formatValueLabel(value)
          }}
          getAriaValueText={valuetext}
          disableSwap
        />
      </Wrapper>
    </Box>
  )
}
