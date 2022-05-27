import { IconButton, InputBase, Paper } from '@mui/material'
import { RiSearchLine } from 'react-icons/ri'

interface ItemSearchProps {
  placeholder?: string
}

export const ItemSearch: React.FC<ItemSearchProps> = ({ placeholder }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        border: '1px solid rgb(221,221,221)',
        borderRadius: '30px',
        paddingLeft: '15px',
        boxShadow: 'none',
        height: '42px',
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          outline: 'none',
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search for items' }}
      />
      <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
        <RiSearchLine size={23} />
      </IconButton>
    </Paper>
  )
}
