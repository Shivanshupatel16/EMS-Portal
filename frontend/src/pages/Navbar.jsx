import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center bg-gray-900 text-white h-14 w-full px-6 justify-between shadow-md">
      <h1 className="text-lg font-semibold">WELCOME, {user ? user.name : "Guest"}</h1>
      <Link to={"/login"}>
        <button
          onClick={handleLogout}
          className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer"
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
