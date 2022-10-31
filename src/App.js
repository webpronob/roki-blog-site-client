import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import BlogDetails from './components/Home/BlogDetails';
import Navbar from './components/Home/Navbar';
import Signup from './components/Login/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/Login/RequireAuth';
import AddBlog from './components/Home/AddBlog';
import MyBlogs from './components/Home/MyBlogs';

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
       <Routes>
        <Route path="/" element={ <Home></Home>} />
        <Route path="/login" element={<Login />} />
        <Route path="/add_blog" element={<AddBlog />} />
        <Route path="/my_blog" element={<MyBlogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<RequireAuth><BlogDetails /></RequireAuth>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
