
import { Route, Routes } from "react-router-dom";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


import Home from './routes/home/Home'
import Training from './routes/training/Training'

const theme = extendTheme({

})

export default function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </CssVarsProvider >
  )
}