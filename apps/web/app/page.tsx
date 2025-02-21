import ItemCard from '@/components/ItemCard';
import Image from 'next/image';
import ProductSlider from '@/components/ProductSlider';
export default async function Home() {
	return (
		<>
			<section className='flex justify-center items-center bg-primary h-full z-0 p-4'>
				<Image
					src={'/Group-33704.webp'}
					alt='banner for latest sales'
					width={1280}
					height={1080}
				/>
			</section>
			<section>
				<div className='flex flex-wrap justify-center'>
					<ProductSlider />
				</div>
			</section>
		</>
	);
}
