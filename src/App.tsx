import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container/Container';
import Amplify from 'aws-amplify'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './App.css';
// import DeleteModal from './app/components/DeleteModal';
import * as config from './config'
import { Create } from './features/company/Create';
import { List } from './features/company/List';

Amplify.configure(config.Amplify)

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
          <Toolbar disableGutters />
      </AppBar>
      <Container maxWidth="lg">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<List/>}/>
            <Route path='/create' element={<Create/>}/>
          </Routes>
        </BrowserRouter>
        {/* <Create /> */}
        {/* <DeleteModal /> */}
      </Container>
    </>
  );
}

export default App;
