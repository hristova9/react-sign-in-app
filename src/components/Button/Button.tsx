import React from "react";
import "./Button.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  title: string;
}

const Button: React.FC<ButtonProps> = ({ type, title }) => {
  return <button type={type}>{title}</button>;
};

export default Button;