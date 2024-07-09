import { Navbar, NavbarBrand } from 'reactstrap';
import { MainPage } from './pages/main';
import './App.css';

function App() {
  return (
    <>
      <Navbar color='light' light>
        <NavbarBrand href='/'>Real-time document editor</NavbarBrand>
      </Navbar>
      <MainPage />
    </>
  );
}

export default App;
