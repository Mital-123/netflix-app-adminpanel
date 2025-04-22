import React, { useState } from 'react'
import { Nav, Offcanvas } from 'react-bootstrap'
import { MdDashboard } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { Link } from 'react-router-dom'
import ButtonCom from './Main/ButtonCom';
import { IoMdAdd } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';

function Sidebar() {

    const [showSidebar, setShowSidebar] = useState(false);

    const handleLinkClick = () => {
        setShowSidebar(false);
    };

    const logout = () => {
        localStorage.removeItem("login");
        window.location.href = "/";
    };

    return (
        <>
            <div className="sidebar bg-dark fixed-sidebar d-flex flex-column p-4 d-none d-md-block">
                <div className="sidebar-header mt-4">
                    <h3 className='text-white'>Admin Panel</h3>
                </div>
                <Nav className="flex-column p-2 pt-0">
                    <Nav.Item className="mt-3">
                        <Link
                            to="/"
                            className="text-decoration-none nav-item text-white"
                            onClick={handleLinkClick}
                        >
                            <MdDashboard className="me-2" />
                            <span className="sidebar_menu">Dashboard</span>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="mt-3">
                        <Link
                            to="/user"
                            className="text-decoration-none nav-item text-white"
                            onClick={handleLinkClick}
                        >
                            <FaUser className="me-2" />
                            <span className="sidebar_menu">Users</span>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="mt-3">
                        <Link
                            to="/series"
                            className="text-decoration-none nav-item text-white"
                            onClick={handleLinkClick}
                        >
                            <IoMdAdd className="me-2" />
                            <span className="sidebar_menu">Series List</span>
                        </Link>
                    </Nav.Item>
                </Nav>
                <div className="logout-btn">
                    <ButtonCom onClick={logout} btn="Log Out" />
                </div>
            </div>

            <Offcanvas
                show={showSidebar}
                onHide={() => setShowSidebar(false)}
                className="sidebar bg-dark"
            >
                <Offcanvas.Header closeButton className="mt-3 mx-2"></Offcanvas.Header>
                <Offcanvas.Body className="mx-2">
                    <div className="sidebar-header">
                        <h2 className='text-white'>Admin Panel</h2>
                    </div>
                    <Nav className="flex-column p-2">
                        <Nav.Item className="mt-3">
                            <Link
                                to="/"
                                className="text-decoration-none nav-item text-white"
                                onClick={handleLinkClick}
                            >
                                <MdDashboard className="me-2" />
                                <span className="sidebar_menu">Dashboard</span>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="mt-3">
                            <Link
                                to="/user"
                                className="text-decoration-none nav-item text-white"
                                onClick={handleLinkClick}
                            >
                                <FaUser className="me-2" />
                                <span className="sidebar_menu">Users</span>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="mt-3">
                            <Link
                                to="/series"
                                className="text-decoration-none nav-item text-white"
                                onClick={handleLinkClick}
                            >
                                <IoMdAdd className="me-2" />
                                <span className="sidebar_menu">Series List</span>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="d-md-none mb-3 position-fixed top-0 start-50 translate-middle-x p-3 z-index-999 w-100 bg-dark d-flex justify-content-between align-items-center">
                <TiThMenu
                    className="text-dark bg-secondary fs-1 p-1 rounded-2"
                    style={{ width: "35px", height: "35px" }}
                    onClick={() => setShowSidebar(true)}
                />
                <div className='logout-btn'>
                    <ButtonCom onClick={logout} btn="Log Out" />
                </div>
            </div>
        </>
    )
}

export default Sidebar