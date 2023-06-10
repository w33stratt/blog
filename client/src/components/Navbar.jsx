import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/preview.png";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=toko1">
                        <h6>TOKO 1</h6>
                    </Link>
                    <Link className="link" to="/?cat=toko2">
                        <h6>TOKO 2</h6>
                    </Link>
                    <Link className="link" to="/?cat=toko3">
                        <h6>TOKO 3</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
                    <span className="write">
                        <Link className="link" to="/write">
                            Write
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
