import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Notfound from './components/Notfound';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addgame from './components/Addgame';
import Getgame from './components/Getgame';
import Navbar from './components/Navbar';
import Makepayment from './components/Makepayment';
import Aboutus from './components/Aboutus';
import Home from './components/Home';
import { FaGamepad, FaChevronDown, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';


function App() {
  return (
    <Router>
      <div className="App">
      {/* <header className="App-header">
        <h1>B2B GAMES </h1>
      </header> */}
      <Navbar/>

      {/* create the different URLs to the componenets */}
      <Routes>
        <Route path='/getgame' element={<Getgame/>}/>
        <Route path='/addgame' element={<Addgame/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/*' element={<Notfound/>}/>
        <Route path='/makepayment' element={<Makepayment/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
        <Route path='/home' element={<Home/>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;

