import { SkyObject } from "@/interfaces/sky-object";

const imageMapping: Record<string, string> = {
	Sun: "/celectial-obj/sun.webp",
	Jupiter: "/celectial-obj/jupiter.webp",
	Mars: "/celectial-obj/mars.webp",
	Moon: "/celectial-obj/moon.webp",
	Saturn: "/celectial-obj/saturn.webp",
	BrightStar: "/celectial-obj/star.webp",
	Venus: "/celectial-obj/venus.webp",
};

interface StarData {
	sizes: Record<string, number>
	brightStars: string[];
	models: string[]; 
}

export const addSizesAndModels = (array: SkyObject[], starData: StarData) => {
	const { sizes, brightStars, models } = starData;

	return array.map((obj) => {
		const size = sizes[obj.name] || 50;

		const isBrightStar = brightStars.includes(obj.name);
		const hasModel = models.includes(obj.name);
		let image: string | null = null;
		if (isBrightStar) {
			image = imageMapping["BrightStar"];
		}

		if (hasModel) {
			image = imageMapping[obj.name];
		}
		if (hasModel && obj.name === "Sun") {
			return {
				...obj,
				magnitude: size * 3.5,
				image,
			};
		}

		if (!isBrightStar && hasModel) {
			return {
				...obj,
				magnitude: size * 1.2,
				image,
			};
		}
		return {
			...obj,
			magnitude: size / 1.5,
			image,
		};
	});
};
