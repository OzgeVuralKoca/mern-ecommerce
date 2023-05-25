import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    let model = { email: email, password: password }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        model
      )
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='head'>
      <Link to="/" className='mb-5 d-flex justify-content-center'>
        <h2 className="text-info fs-5 fw-semibold p-3 border border-secondary rounded-3 logo logo-width">
          <span className="text-white">t</span>echnology s<span className="text-white">t</span>ore
        </h2>
      </Link>
      <div className="container d-flex justify-content-center">
        <form onSubmit={login}>
          <div className="border border-secondary rounded-3 px-5 py-3">
            <h5 className='text-info mt-1 text-center'>GİRİŞ YAP</h5>
            <div className="form-group mt-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                name="email"
                id="email"
                placeholder="email"
                className="form-control bg-dark search-input border border-secondary" />
            </div>
            <div className="form-group mt-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                name="password"
                id="password"
                placeholder="şifre"
                className="form-control bg-dark search-input border border-secondary" />
            </div>
            <div>
              <button className='btn btn-outline-info w-100 mt-3' >
                Giriş yap
              </button>
            </div>
            <hr />
          </div>
          <div className="border border-secondary rounded-3 px-5 pt-3 mt-3 d-flex justify-content-between flex-wrap">
            <p className='text-white'>Dont have an account?</p>
            <Link to='/register' className="h6 text-info ms-2">Kayıt Ol</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login