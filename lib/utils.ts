import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getGradientBackground = (currentHour: number) => {
	if (currentHour >= 4 && currentHour < 6) {
		return "linear-gradient(180deg, #001878 40%, #FF7F27 60%, black 60%, black 100%)";
	} else if (currentHour >= 6 && currentHour < 9) {
		return "linear-gradient(180deg, #87CEFA 30%, #FFD700 60%, black 60%, black 100%)";
	} else if (currentHour >= 9 && currentHour < 18) {
		return "linear-gradient(180deg, #ADD8E6 0%, #87CEEB 60%, black 60%, black 100%)";
	} else if (currentHour >= 18 && currentHour < 20) {
		return "linear-gradient(180deg, #1E60FF 0%, #FFD700 60%, black 60%, black 100%)";
	} else if (currentHour >= 20 && currentHour < 22) {
		return "linear-gradient(180deg, #000E45 40%, #452702 60%, black 60%, black 100%)";
	} else {
		return "linear-gradient(180deg, #000E45 0%, #000E45 60%, black 60%, black 100%)";
	}
};
