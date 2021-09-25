export interface ICheck {
	id: string,
	priority: number,
	description: string,
	status: "accepted" | "denied" | "none",
	disabled: boolean,
}

export interface IButtonProps {
	children: string,
	disabled: boolean,
	type: "button" | "submit" | "reset",
	onClick: Function
}

export interface ICheckItemProps {
	check: ICheck,
	step: number,
	setStep: Function,
	setChecks: Function,
	active: number,
	setActive: Function
}

export interface ICheckProps {
	status: "accepted" | "denied" | "none",
	disabled: boolean,
	setStatus: Function
}

export interface IResults {
	checkId: string,
	result: "yes" | "no"
}