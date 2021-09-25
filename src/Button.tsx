import React from "react";
import "./Button.css";
import { IButtonProps } from "./types";

const Button = ({ disabled, type, onClick, children }: IButtonProps) => {
	return (
		<button className="Button" disabled={disabled} type={type} onClick={() => onClick()} >
			{children}
		</button>
	);
};

export default Button;
