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
      main: '#1877F2',
      dark: '#d1d1d1'
    },
    text: {
      primary: '#fefefe', //white
      secondary: '#d1d1d1', //grey
    },
  },

  components: {
    // Name of the component    
    MuiInputBase: { //InputProps
      defaultProps: {
        // The props to change the default for.
        disableUnderline: true,
      },
    },

    MuiTextField: {
      styleOverrides: {
        // Name of the slot        
        root: {
          // Some CSS
          // fontSize: '1rem', 
          '& .MuiFilledInput-root': {
            borderRadius: 5,
            border: '1px solid #3E4042',
            backgroundColor: 'transparent',
            '&:hover': {
              border: '1px solid #8A8D91',
            },
            '&.Mui-focused': {
              border: '2px solid #fff',
              borderColor: '#fff',
              boxShadow: '#1877F2 0 0 0 2px'
            },
          },


        },
      },
    },
  },
})