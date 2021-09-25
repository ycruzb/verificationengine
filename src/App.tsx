import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";
import { ICheck, IResults } from "./types";
import { fetchChecks, submitCheckResults } from "./api";
import Button from "./Button";
import CheckItem from "./CheckItem";


export default function App() {
	const [checks, setChecks] = useState<ICheck[]>([]);

	const [step, setStep] = useState<number>(0);

	const [active, setActive] = useState<number>(0);

	const verifySubmitDisability = () => {
		if (checks.length === 0) return true
		if (checks.find((check: ICheck) => check.status === "denied")) return false
		return (step + 1 !== checks.length)
	}

	const fetchData = async () => {
		let data = await fetchChecks();
		data.sort((firstCheck: ICheck, secondCheck: ICheck) => firstCheck.priority - secondCheck.priority)
		data = data.map((check: ICheck, index: number) => {
			return (index === 0) ? { ...check, status: "none", disabled: false } : { ...check, status: "none", disabled: true }
		})
		setChecks(data);
	}

	useEffect(() => {
		fetchData();
	}, [])

	const submitHandle = async () => {
		const results: IResults[] = checks.filter((check: ICheck) => !check.disabled).map((check: ICheck) => {
			return {
				checkId: check.id,
				result: (check.status === "accepted") ? "yes" : "no"
			}
		})
		try {
			const response: IResults[] = await submitCheckResults(results);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}



	const listenKeyboard = useCallback((event) => {
		const setStatusByKeyboard = (status: "accepted" | "denied") => {
			if (status === "accepted") {
				setChecks((old: ICheck[]) => {
					let hasOneDenied = false;
					const newChecks: ICheck[] = old.map((check: ICheck, index: number) => {
						const checkCopy: ICheck = check;
						if (index === active) {
							checkCopy.status = "accepted";
							return checkCopy;
						} else
							if (index === active + 1) {
								checkCopy.disabled = false;
								if (checkCopy.status === "denied") {
									hasOneDenied = true;
								}
								return checkCopy;
							} else
								if (index > active + 1) {
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
							if (index === active) {
								const checkCopy: ICheck = check;
								checkCopy.status = "denied";
								return checkCopy;
							} else
								if (index > active) {
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

			if (checks[active].status === "none") {
				setStep(step);
			}

			if (step < active) {
				setStep(active);
			}
		}

		if (event.keyCode === 38) {
			if (active > 0) {
				setActive(active - 1)
			}
		} else if (event.keyCode === 40) {
			if (active < checks.length - 1) {
				if (!checks[active + 1].disabled) {
					setActive(active + 1);
				}
			}
		} else if (event.keyCode === 49) {
			setStatusByKeyboard("accepted")
		} else if (event.keyCode === 50) {
			setStatusByKeyboard("denied")
		}
	}, [active, checks, step]);

	useEffect(() => {
		document.addEventListener("keydown", listenKeyboard, false);

		return () => {
			document.removeEventListener("keydown", listenKeyboard, false);
		};
	});

	return <div className="App">
		<div className="container">
			{checks.map((check: ICheck, index: number) => <CheckItem key={check.id} check={check} setChecks={setChecks} step={index} setStep={setStep} active={active} setActive={setActive} />)}

			<Button type="button" disabled={verifySubmitDisability()} onClick={() => { submitHandle() }}>SUBMIT</Button>
		</div>
	</div>;
}
