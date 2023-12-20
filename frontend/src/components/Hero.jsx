import React from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

import "./Hero.css"


export const Hero = () => {
    const text = {
        heading: "Ready to add to your urban jungle?",
        text: "Give our plants a new home, take a look at what we've got!",
        btnText: "SHOP ALL PLANTS"
    }
    const navigate = useNavigate()

  return (
    <section className="hero-wrapper">
      <div className="hero-content-wrapper">
        <h2>{text.heading}</h2>
        <p>{text.text}</p>
        <Button
              className="all-plants"
              btnText={text.btnText}
              ariaLabel="login button"
        />
      </div>
      <img src="public/hero-img.png" alt="" />
    </section>
  )
}
