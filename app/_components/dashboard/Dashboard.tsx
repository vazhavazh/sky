"use client";
import React, { useState, useRef, useEffect } from "react";

import { FormValues } from "@/interfaces/form-values";
import { SkyObject } from "@/interfaces/sky-object";
import { useAstronomyData } from "@/hooks/useAstronomyData";
import { useInterval } from "@/hooks/useInterval";
import { ObservationForm } from "./observation-form/ObservationForm";
import { Chart } from "./chart/Chart";
import { incrementTimeByHour } from "@/lib/increment-time";

const CHART_WIDTH = 3000;
const INTERVAL_BETWEEN_REQUESTS = 3000;

const Dashboard = () => {
	// State to determine if the component is rendered on the client side
	const [isClient, setIsClient] = useState(false);
	// State to store chart data
	const [chartData, setChartData] = useState<SkyObject[]>([]);
	// State to manage loading state for fetching data
	const [, setIsLoading] = useState(false);
	// Current and initial form values
	const [currentFormValues, setCurrentFormValues] = useState<FormValues>();
	const [formValues, setFormValues] = useState<FormValues>({
		date: "2024-10-09",
		time: "09:00:00",
		latitude: "29.28.4",
		longitude: "004.30.5",
	});
	// Counter to track timelapse progress
	const [counter, setCounter] = useState(0);
	// Hook to fetch astronomy data
	const { fetchAstronomyData } = useAstronomyData();
	// Reference to scroll container for handling scrolling
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	// Reference to store the callback function for the interval
	const callbackRef = useRef<(() => void) | null>(null);
	// State to store master time for the observation
	const [masterTime, setMasterTime] = useState("");
	// State to store the longitude
	const [longitude, setLongitude] = useState("");
	// Interval hook to trigger repeated data fetching
	const { startInterval, clear } = useInterval(
		callbackRef,
		INTERVAL_BETWEEN_REQUESTS
	);
	// State to track whether timelapse is active
	const [isTimeLapseWorking, setIsTimeLapseWorking] = useState(false);

	// Function to start the timelapse, which will fetch data at regular intervals
	const startTimelapse = () => {
		setIsTimeLapseWorking(true);
		startInterval();
	};

	// Function to stop the timelapse and clear the interval
	const stopTimelapse = () => {
		setIsLoading(false);
		setIsTimeLapseWorking(false);
		clear();
	};

	// Function that is triggered on each interval during the timelapse
	const timelapseHandler = async () => {
		// Stop if the counter reaches 24 hours
		if (counter >= 24) {
			setCounter(0);
			clear();
			setIsLoading(false);
			return;
		}

		// Update form values (e.g., increment time by 1 hour)
		const updatedValues = currentFormValues
			? incrementTimeByHour(currentFormValues)
			: incrementTimeByHour(formValues);

		const currentTime = updatedValues.time;
		setMasterTime(currentTime);

		// Update current form values for the next request
		setCurrentFormValues(updatedValues);
		setIsLoading(true);
		try {
			// Fetch astronomy data with updated values
			const data = await fetchAstronomyData(updatedValues);
			if (data) {
				setCounter((prev) => prev + 1);
			}
			// Update the chart data
			setChartData(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	// Assign the timelapse handler to the callback ref for the interval
	callbackRef.current = timelapseHandler;

	// Function to handle form submission
	const submitHandler = async (values: FormValues) => {
		setIsLoading(true);
		try {
			// Fetch astronomy data on form submission
			const data = await fetchAstronomyData(values);
			// Update the chart with the fetched data
			setChartData(data);
			setIsLoading(false);
		} catch (err) {
			console.error("Error loading data", err);
			setIsLoading(false);
		}
	};

	// Function to handle changes in form fields
	const handleChange = (field: string, value: string) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[field]: value,
		}));
	};

	// Function to handle scrolling behavior (looping the scroll position)
	const handleScroll = () => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const maxScrollLeft = container.scrollWidth - container.clientWidth;
		const tolerance = 10;
		// When scrolled to the end, jump to the beginning
		if (container.scrollLeft >= maxScrollLeft - 1) {
			container.scrollLeft = 1;
			return;
		}
		// When scrolled to the start, jump to the end for smooth looping
		if (container.scrollLeft <= tolerance) {
			container.scrollLeft = maxScrollLeft - tolerance;
		}
	};

	// Initial effect to fetch data when the component is mounted
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setIsClient(true);
			try {
				// Set longitude and time from form values
				setLongitude(formValues.longitude);
				setMasterTime(formValues.time);
				// Fetch astronomy data
				const data = await fetchAstronomyData(formValues);
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

	// Return null if client-side rendering is not ready
	if (!isClient) return null;

	// Render the dashboard with observation form and chart components
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
				handleScrollAction={handleScroll}
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
