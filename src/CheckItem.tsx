import React from "react"
import "./CheckItem.css";
import { ICheckItemProps, ICheck } from "./types"
import Check from "./Check";

const CheckItem = ({ check, setChecks, step, setStep, active, setActive }: ICheckItemProps) => {
	const setStatus = (status: "accepted" | "denied") => {
		if (!check.disabled) {
			if (status === "accepted") {
				setChecks((old: ICheck[]) => {
					let hasOneDenied = false;
					const newChecks: ICheck[] = old.map((check: ICheck, index: number) => {
						const checkCopy: ICheck = check;
						if (index === step) {
							checkCopy.status = "accepted";
							return checkCopy;
						} else
							if (index === step + 1) {
								checkCopy.disabled = false;
								if (checkCopy.status === "denied") {
									hasOneDenied = true;
								}
								return checkCopy;
							} else
								if (index > step + 1) {
									if (checkCopy.status !== "none" && !hasOneDenied) {
										checkCopy.disabled = false;
									}
									if (checkCopy.status === "denied") {
										hasOneDenied = true;
									}
									return checkCopy;
								} else {
									return checkCopy;
								}
					})
					return newChecks
				})
			} else
				if (status === "denied") {
					setChecks((old: ICheck[]) => {
						const newChecks: ICheck[] = old.map((check: ICheck, index: number) => {
							if (index === step) {
								const checkCopy: ICheck = check;
								checkCopy.status = "denied";
								return checkCopy;
							} else
								if (index > step) {
									const checkCopy: ICheck = check;
									checkCopy.disabled = true;
									return checkCopy;
								} else {
									return check;
								}
						})
						return newChecks
					})

				}

			if (check.status === "none") {
				setStep(step);
			}

			setActive(step);
		}
	}

	return (
		<div key={check.id} className={`checkItem ${(check.disabled) ? "disabled" : ""} ${(step === active) ? "active" : ""}`}>
			<p className="p">{check.description}</p>
			<Check status={check.status} disabled={check.disabled} setStatus={setStatus} />
		</div>
	)
}

export default CheckItem