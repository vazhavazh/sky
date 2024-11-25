// import { useState } from "react";
// import { TooltipProps } from "recharts";
// import {
// 	ValueType,
// 	NameType,
// } from "recharts/types/component/DefaultTooltipContent";

// export const CustomTooltip = ({
// 	active,
// 	payload,
// }: TooltipProps<ValueType, NameType>) => {
// 	  const [hovered, setHovered] = useState(false);
// 	if (active && payload && payload.length) {
// 		const { name, azimuth, altitude, magnitude } = payload[0].payload;
// 		  const handleMouseEnter = () => setHovered(true);
// 			const handleMouseLeave = () => setHovered(false);

// 			const size = hovered ? magnitude * 1.5 : magnitude;
// 		return (
// 			<div className='tooltip'>
// 				<p>Name: {name}</p>
// 				<p>Azimuth: {azimuth}°</p>
// 				<p>Altitude: {altitude}°</p>
// 			</div>
// 		);
// 	}
// 	return null;
// };
import { useState } from "react";
import { TooltipProps } from "recharts";
import {
	ValueType,
	NameType,
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
	active,
	payload,
}: TooltipProps<ValueType, NameType>) => {
	const [, setHovered] = useState(false);

	// Check if the tooltip is active and there is payload data
	if (active && payload && payload.length) {
		const { name, azimuth, altitude, magnitude } = payload[0].payload;

		// Only display the tooltip for objects with magnitude greater than 60
		if (magnitude > 30) {
			const handleMouseEnter = () => setHovered(true);
			const handleMouseLeave = () => setHovered(false);

			

			return (
				<div
					className='tooltip'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<p>Name: {name}</p>
					<p>Azimuth: {azimuth}°</p>
					<p>Altitude: {altitude}°</p>
					<p>Magnitude: {magnitude}</p>
				</div>
			);
		}
	}

	return null; // Return null if conditions are not met (magnitude <= 60)
};
