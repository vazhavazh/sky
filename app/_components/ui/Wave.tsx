import Image from "next/image";

export const Wave = () => (
	<Image
		src='/wave.svg'
		alt='Wave'
		layout='fill'
		objectFit='cover'
		className='absolute '
	/>
);
