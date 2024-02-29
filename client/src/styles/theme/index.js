import { createTheme } from "@mui/material"

export const colors={
  lightBlue:'#cbf2e7',
  black:'#181a19',
  primary:'#2e80f2',
  thinBlue:'#dfebe6'
}

const theme=createTheme({
  palette:{
    lightBlue:{
      main:colors.lightBlue
    },
    black:{
      main:colors.black
    },
    primary:{
      main:colors.primary
    },
    thinBlue:{
      main:colors.thinBlue,
    }
  },
  components:{
    MuiButton: {
      defaultProps: {
        disableElevation:true
      }
    }
  }
})

export default theme