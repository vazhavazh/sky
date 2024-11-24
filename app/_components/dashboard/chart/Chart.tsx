"use client";

import {
	ScatterChart,
	XAxis,
	YAxis,
	Scatter,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	LabelList,
} from "recharts";

import { CustomTooltip } from "@/components/ui/custom/CustomTooltip";
import { ChartProps } from "@/interfaces/chart";
import { useEffect, useState } from "react";
import { SkyObject } from "@/interfaces/sky-object";
import { starData } from "@/constants/initial-data";
import { addSizesAndModels } from "@/lib/size-model";
import { CustomShape } from "@/components/ui/custom/CustomShape";

const interpolate = (start: number, end: number, progress: number): number =>
	start + (end - start) * progress;

const getGradientBackground = (currentHour: number) => {
	if (currentHour >= 4 && currentHour < 6) {
		return "linear-gradient(180deg, #001878 40%, #FF7F27 90%, black 60%, black 100%)";
	} else if (currentHour >= 6 && currentHour < 9) {
		return "linear-gradient(180deg, #87CEFA 30%, #FFD700 90%, black 60%, black 100%)";
	} else if (currentHour >= 9 && currentHour < 18) {
		return "linear-gradient(180deg, #ADD8E6 0%, #87CEEB 90%, black 60%, black 100%)";
	} else if (currentHour >= 18 && currentHour < 20) {
		return "linear-gradient(180deg, #1E90FF 0%, #FFD700 90%, black 60%, black 100%)";
	} else if (currentHour >= 20 && currentHour < 22) {
		return "linear-gradient(180deg, #000E45 40%, #452702 90%, black 60%, black 100%)";
	} else {
		return "linear-gradient(180deg, #000E45 0%, #000E45 90%, black 60%, black 100%)";
	}
};

export const Chart = ({
	scrollContainerRef,
	animationDuration,
	chartWidth,
	chartData,
	isTimeLapseWorking,
	masterTime,
}: // handleScroll,
ChartProps) => {
	const [interpolatedData, setInterpolatedData] = useState<SkyObject[]>([]);
	const [chartBackground, setChartBackground] = useState("");
	useEffect(() => {
		const currentChartTime = Number(masterTime.split(":").slice(0, 1).join());
		const newColors = getGradientBackground(currentChartTime);
		setChartBackground(newColors);
	}, [masterTime]);

	useEffect(() => {
		if (!isTimeLapseWorking) {
			setInterpolatedData(chartData);
			return;
		}
		let frameId: number | null = null;
		const startTime = performance.now();

		const animate = () => {
			const now = performance.now();
			const progress = Math.min((now - startTime) / animationDuration, 1);

			const updatedData = chartData.map((point, index) => {
				const prevPoint = interpolatedData[index] || point;
				return {
					...point,
					azimuth: interpolate(prevPoint.azimuth, point.azimuth, progress),
					altitude: interpolate(prevPoint.altitude, point.altitude, progress),
				};
			});

			setInterpolatedData(updatedData);

			if (progress < 1) {
				frameId = requestAnimationFrame(animate);
			}
		};

		frameId = requestAnimationFrame(animate);

		return () => {
			if (frameId) cancelAnimationFrame(frameId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartData, isTimeLapseWorking]);

	return (
		<div className='px-8'>
			<div
				ref={scrollContainerRef}
				// onScroll={handleScroll}
				className='overflow-x-scroll whitespace-normal pt-4'>
				<div
					style={{
						background: chartBackground,
						width: chartWidth,
					}}>
					<ResponsiveContainer
						width='100%'
						height={700}>
						<ScatterChart>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis
								orientation='top'
								type='number'
								dataKey='azimuth'
								name='Azimuth'
								unit='°'
								domain={[0, 360]}
								ticks={[...Array(25).keys()].map((x) => x * 15)}
							/>
							<YAxis
								type='number'
								dataKey='altitude'
								name='Altitude'
								unit='°'
								domain={[-15, 90]}
								ticks={[-15, 0, 15, 30, 45, 60, 75, 90]}
								interval={0}
								allowDataOverflow={true}
							/>

							{!isTimeLapseWorking && <Tooltip content={<CustomTooltip />} />}
							<Scatter
								isAnimationActive={false}
								data={addSizesAndModels(interpolatedData, starData)}
								fill='yellow'
								// eslint-disable-next-line
								shape={(props: any) => {
									return <CustomShape {...props} />;
								}}>
								<LabelList
									dataKey='name'
									position='top'
								/>
							</Scatter>
						</ScatterChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};
