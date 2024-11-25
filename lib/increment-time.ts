import { FormValues } from "@/interfaces/form-values";

export const incrementTimeByHour = (values: FormValues): FormValues => {
	const { date, time, latitude, longitude } = values;
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute, second] = time.split(":").map(Number);
	const currentDate = new Date(year, month - 1, day, hour, minute, second);
	currentDate.setHours(currentDate.getHours() + 1);
	const newDate = currentDate.toISOString().split("T")[0]; // Получаем дату в формате "YYYY-MM-DD"
	const newTime = currentDate.toTimeString().split(" ")[0]; // Получаем время в формате "HH:mm:ss"
	return {
		date: newDate,
		time: newTime,
		latitude,
		longitude,
	};
};
