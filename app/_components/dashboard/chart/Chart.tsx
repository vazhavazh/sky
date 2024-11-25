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

import { ChartProps } from "@/interfaces/chart";
import { useEffect, useState } from "react";
import { SkyObject } from "@/interfaces/sky-object";
import { starData } from "@/constants/initial-data";
import { addSizesAndModels } from "@/lib/size-model";
import { CustomShape } from "@/app/_components/ui/CustomShape";
import { CustomTooltip } from "@/app/_components/ui/CustomTooltip";
import { interpolate } from "@/lib/animation-utils";
import { getGradientBackground } from "@/lib/utils";


export const Chart = ({
	handleScrollAction,
	scrollContainerRef,
	animationDuration,
	chartWidth,
	chartData,
	isTimeLapseWorking,
	masterTime,
}: ChartProps) => {
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
		<>
			<div className='px-8 relative'>
				<div className='absolute bottom-0 left-0 w-full h-[240px] z-[100] wave-background'></div>
				<div
					ref={scrollContainerRef}
					onScroll={handleScrollAction}
					className='overflow-x-scroll h-[100vh] overflow-y-hidden  whitespace-normal pt-4 
					 '>
					

					<div
						className='rounded-lg'
						style={{
							background: chartBackground,
							width: chartWidth,
						}}>
						<ResponsiveContainer
							width='100%'
							height={900}>
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
									domain={[-90, 90]}
									ticks={[
										-90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90,
									]}
									interval={0}
									allowDataOverflow={true}
								/>
								<div className='h-[100vh] relative '>
									
								</div>
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
		</>
	);
};
