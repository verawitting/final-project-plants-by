import React from 'react'
import { GrSend } from "react-icons/gr";

export const EmailLink = ({ email }) => {
    const handleEmailClick = () => {
        window.location.href = `mailto:${email}`
    };
  return (
    <span onClick={handleEmailClick}>
        <GrSend className="icon" />
    </span>
  )
}
