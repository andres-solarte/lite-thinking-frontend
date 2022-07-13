import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Container from '@mui/material/Container/Container';
import Amplify from 'aws-amplify'
import './App.css';
// import DeleteModal from './app/components/DeleteModal';
import * as config from './config'
import { Create } from './features/company/Create';
import { List } from './features/company/List';

Amplify.configure(config.Amplify)

function App() {
  return (
    <Container maxWidth="sm">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<List/>}/>
          <Route path='/create' element={<Create/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Create /> */}
      {/* <DeleteModal /> */}
    </Container>
  );
}

export default App;
