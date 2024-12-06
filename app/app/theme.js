import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Hot Pink
      light: '#FFC0CB', // Pink
      dark: '#C71585', // Medium Violet Red
    },
    secondary: {
      main: '#FFB6C1', // Light Pink
    },
    background: {
      default: '#FFF0F5', // Lavender Blush
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

export default theme
