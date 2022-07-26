import { createTheme } from '@mui/material/styles';

export const nav = createTheme({
  palette: {
    primary: {
      main: '#242526'
    }
  }
})

export const darkTheme = createTheme({
  palette: {
    background: {
      default: '#242526',
      paper: '#242526'
    },
    primary: {
      main: '#fefefe',
      dark: '#d1d1d1'
    },
    text: {
      primary: '#fefefe', //white
      secondary: '#d1d1d1', //grey
    },   
  } 
})