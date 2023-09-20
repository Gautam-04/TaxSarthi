import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <section id="home">
    <div className="main">
      <div className="front">
        <hi className="front-title">TaxSarthi</hi>
        <p className="subtitle">Your One Stop Tax Solution</p>
        <button className='product' onClick={() => {navigate('/login')}}>Try Our Product</button>
      </div>
    </div>
    </section>
  )
}

export default Home