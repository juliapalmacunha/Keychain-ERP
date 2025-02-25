import React from 'react'
import { Box , Typography} from '@mui/material'

const Rodape = ({children}) => {
  return (
    
    <Box  
    sx={{
      backgroundColor: "#f4f7fc",
      width: '100%',
      height:"70px",
      color: 'white',
      display:"flex",
      textAlign: 'center',
    }}
    >
     <Typography variant='h2' fontSize="16px" sx={{margin:"auto",fontFamily:"Gilroy light", color: "gray"}}>
        {children}
      </Typography>
    </Box>
  )
}

export default Rodape