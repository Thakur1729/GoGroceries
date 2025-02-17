import Image from 'next/image';

export default async function Home() {
	return (
		<section className='bg-primary h-full z-0 p-4'>
			<Image
				src={'/Group-33704.webp'}
				alt='banner for latest sales'
				width={1920}
				height={1080}
			/>
		</section>
	);
}
