
import { Route, Routes } from "react-router-dom";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


import Home from './routes/home/Home'
import Training from './routes/training/Training'
import Training2 from './routes/training2/Training2'

const theme = extendTheme({

})

export default function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training2" element={<Training2 />} />
      </Routes>
    </CssVarsProvider >
  )
}