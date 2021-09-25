import React from "react"
import { ICheckProps } from "./types"
import "./Check.css"

const Check = ({ status, disabled, setStatus }: ICheckProps) => {

	return (
		<div className={`check ${(disabled) ? "disabled" : ""} ${(status === "accepted") ? "accepted" : (status === "denied") ? "denied" : "none"}`}>
			<div className="yes" onClick={() => setStatus("accepted")}>Yes</div>
			<div className="no" onClick={() => setStatus("denied")}>No</div>
		</div>
	)
}

export default Check