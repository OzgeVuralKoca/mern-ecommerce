import { Link, Outlet, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import HeaderCartButton from "../UI/HeaderCartButton"


const Header = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark position-fixed w-100 py-3" data-bs-theme="dark" style={{ zIndex: "4" }}>
                <div className="container-fluid container px-4">
                    <Link onClick={() => window.scrollTo(0, 0)} to='/' className="navbar-brand text-info fs-5 bg-light-subtle fw-semibold px-3 rounded-3 logo">
                        <span className="text-white">t</span>echnology s<span className="text-white">t</span>ore
                    </Link>
                    <div className="ms-auto d-flex">
                        {
                            user
                                ? <div className="dropdown-center">
                                    <button className="btn btn-outline-warning btn-sm rounded-3 me-3 px-4 py-2 dropdown-toggle text-start" type="button" data-bs-toggle="dropdown">
                                        <span className="fs-6 me-1">Hesabım</span>
                                        <span><small>{user.name}</small></span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end me-3">
                                        <li>
                                            <Link to='/orders' className="dropdown-item text-warning">
                                                <small>Siparişlerim</small>
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={logout} className="dropdown-item text-warning">
                                                <small><FiLogOut /> Çıkış yap</small>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                : <>
                                    <div className="border border-warning outline-warning text-warning rounded-3 me-3 px-4 py-2 text-start">
                                        <Link to="/login">
                                            <span className="me-2 text-warning">
                                            <small>Üye Girişi</small>
                                            </span>
                                        </Link>
                                        /
                                        <Link to="/register">
                                            <span className="ms-2 text-warning">
                                            <small>Kayıt Ol</small>
                                            </span>
                                        </Link>
                                    </div>
                                </>
                        }
                        <HeaderCartButton user={user} />
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Header