"use client";
import React, { useState, useRef, useEffect } from "react";

import { FormValues } from "@/interfaces/form-values";
import { SkyObject } from "@/interfaces/sky-object";
import { useAstronomyData } from "@/hooks/useAstronomyData";
import { useInterval } from "@/hooks/useInterval";
import { ObservationForm } from "./observation-form/ObservationForm";
import { Chart } from "./chart/Chart";
import { incrementTimeByHour } from "@/lib/increment-time";

// const INITIAL_FORM_VALUES: FormValues = {
// 	date: "2024-10-09",
// 	time: "09:00:00",
// 	latitude: "29.28.4",
// 	longitude: "004.30.5",
// };

const CHART_WIDTH = 3000;
const INTERVAL_BETWEEN_REQUESTS = 3000;

const Dashboard = () => {
	const [isClient, setIsClient] = useState(false);
	const [chartData, setChartData] = useState<SkyObject[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const [currentFormValues, setCurrentFormValues] = useState<FormValues>();
	const [formValues, setFormValues] = useState<FormValues>({
		date: "2024-10-09",
		time: "09:00:00",
		latitude: "29.28.4",
		longitude: "004.30.5",
	});
	const [counter, setCounter] = useState(0);
	const { fetchAstronomyData } = useAstronomyData();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const callbackRef = useRef<(() => void) | null>(null);
	const [masterTime, setMasterTime] = useState("");
	const [longitude, setLongitude] = useState("");
	const { startInterval, clear } = useInterval(
		callbackRef,
		INTERVAL_BETWEEN_REQUESTS
	);
	const [isTimeLapseWorking, setIsTimeLapseWorking] = useState(false);

	const startTimelapse = () => {
		setIsTimeLapseWorking(true);
		startInterval();
	};

	const stopTimelapse = () => {
		setIsLoading(false);
		setIsTimeLapseWorking(false);
		clear();
	};

	

	const timelapseHandler = async () => {
		if (counter >= 24) {
			setCounter(0);
			clear();
			setIsLoading(false);
			return;
		}

		const updatedValues = currentFormValues
			? incrementTimeByHour(currentFormValues)
			: incrementTimeByHour(formValues);

		const currentTime = updatedValues.time;
		setMasterTime(currentTime);

		setCurrentFormValues(updatedValues);
		setIsLoading(true);
		try {
			const data = await fetchAstronomyData(updatedValues);
			if (data) {
				setCounter((prev) => prev + 1);
			}
			setChartData(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	callbackRef.current = timelapseHandler;

	const submitHandler = async (values: FormValues) => {
		setIsLoading(true);
		try {
			const data = await fetchAstronomyData(values);
			setChartData(data);
			setIsLoading(false);
		} catch (err) {
			console.error("Error loading data", err);
			setIsLoading(false);
		}
	};

	 const handleChange = (field: string, value: string) => {
			setFormValues((prevValues) => ({
				...prevValues,
				[field]: value,
			}));
		};

	// const handleScroll = () => {
	// 	const container = scrollContainerRef.current;
	// 	if (!container) return;

	// 	const maxScrollLeft = container.scrollWidth - container.clientWidth;
	// 	const tolerance = 10; // Разрешение на мелкие погрешности
	// 	if (container.scrollLeft >= maxScrollLeft - 1) {
	// 		// console.log("ДОШЁЛ ДО КОНЦА");
	// 		container.scrollLeft = 1; // Устанавливаем чуть дальше начала для плавности
	// 		return;
	// 	}
	// 	// Проверяем достижение начала и перемещаем в конец
	// 	if (container.scrollLeft <= tolerance) {
	// 		// console.log("ДОШЁЛ ДО НАЧАЛА");
	// 		container.scrollLeft = maxScrollLeft - tolerance; // Устанавливаем чуть ближе к концу для плавности
	// 		return;
	// 	}
	// };

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setIsClient(true);
			try {
				// !
				setLongitude(formValues.longitude);
				setMasterTime(formValues.time);
				const data = await fetchAstronomyData(formValues);
				// const updatedDataWithSizes = addSizeOfStars(data, starData.sizes);
				setChartData(data);

				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				console.error("Error loading data", err);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (!isClient) return null;
	return (
		<>
			<ObservationForm
				formValues={formValues}
				startTimelapseAction={startTimelapse}
				stopTimelapseAction={stopTimelapse}
				submitHandlerAction={submitHandler}
				handleChange={handleChange}
			/>
			<Chart
				// handleScroll={handleScroll}
				isTimeLapseWorking={isTimeLapseWorking}
				animationDuration={INTERVAL_BETWEEN_REQUESTS}
				scrollContainerRef={scrollContainerRef}
				chartWidth={CHART_WIDTH}
				chartData={chartData}
				masterTime={masterTime}
				longitude={longitude}
			/>
		</>
	);
};

export default Dashboard;
