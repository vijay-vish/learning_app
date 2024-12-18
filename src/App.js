import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';
import Videos from './components/videos';
import HomePage from './pages/home-page';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  const data = { id: 1, name: "vijay" }
  return <>
    <Link
      to="/video"
      // target='blank'
      state={data}
    >
      click
    </Link>
    <Routes>
      <Route path='/video' element={<Videos />} />
    </Routes>
    {/* <HomePage /> */}
  </>
}

export default App;
