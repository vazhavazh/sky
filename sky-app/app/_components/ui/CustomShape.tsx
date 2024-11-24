import Image from "next/image";

interface Payload {
	name: string; // Имя небесного объекта
	azimuth: number; // Азимут
	altitude: number; // Высота
	magnitude: number; // Яркость или размер
	image: string | null; // Путь к изображению (или null для кружков)
}

type CustomShapeProps = {
	cx?: number; // Центр по оси X
	cy?: number; // Центр по оси Y
	payload?: Payload; // Данные о небесном объекте
};

export const CustomShape = ({ cx = 0, cy = 0, payload }: CustomShapeProps) => {
	if (payload) {
		const { image, magnitude, name } = payload;
		if (image) {
			// Если есть изображение, отрисовываем его
			return (
				<g>
					<foreignObject
						x={cx - magnitude / 2}
						y={cy - magnitude / 2}
						width={magnitude}
						height={magnitude}>
						<Image
							src={image}
							alt={name || "object"}
							priority="primary"
							width={magnitude}
							height={magnitude}
						/>
					</foreignObject>
				</g>
			);
		} else {
			// Если изображения нет, рисуем кружок
			return (
				<circle
					cx={cx}
					cy={cy}
					r={magnitude / 15} // Размер круга пропорционален величине объекта
					fill='#fefe87' // Цвет круга
				/>
			);
		}
	}
	

	
};
