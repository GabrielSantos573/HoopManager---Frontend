import { useState } from "react";

export default function Editar({
  size = 128,
  color = "black",
  hoverColor = "blue"
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const svgStyles = {
    fill: isHovered ? hoverColor : color,
    background: isHovered ? color : hoverColor,
    stroke: isHovered ? hoverColor : color,
    cursor: "pointer",
    transition: '200ms ease-in-out',
    border: '#0D3080 solid 1px',
    borderRadius: '4px',
    padding: '4px',
    boxShadow: '0 4px 4px rgba(0,0,0, 0.25)'
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 50 50" 
      width={size} 
      height={size}
      style={svgStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      <polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="42.948,12.532 10.489,44.99 3,47 5.009,39.511 37.468,7.052 "/>
      <path d="M45.749,11.134c-0.005,0.004,0.824-0.825,0.824-0.825c1.901-1.901,1.901-4.983,0.002-6.883c-1.903-1.902-4.984-1.9-6.885,0c0,0-0.83,0.83-0.825,0.825L45.749,11.134z"/>
      <polygon points="5.191,39.328 10.672,44.809 3.474,46.526 "/>
    </svg>
  )
}