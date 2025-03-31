import ItemCard from '@/components/ItemCard';
import Image from 'next/image';
import ProductSlider from '@/components/ProductSlider';
import ProductCategoriesBanner from '@/components/banners/ProductCategoriesBanner';
import GroceryCategories from '@/components/banners/GroceryCategories';
import Footer from '@/components/Footer/footer';
export default async function Home() {
	return (
		<div>
			<section className='flex justify-center items-center bg-primary h-full z-0 p-4'>
				<Image
					src={'/Group-33704.webp'}
					alt='banner for latest sales'
					width={1280}
					height={1080}
				/>
			</section>
			<section>
				<ProductCategoriesBanner />
				<GroceryCategories />
			</section>
			<section>
				<div className='flex flex-wrap justify-center'>
					<div className='container flex justify-start items-center w-full p-4'>
						<h2 className='font-bold text-3xl'>Dairy Bread and Eggs</h2>
					</div>
					{/* <ProductSlider /> */}
				</div>
			</section>

			<Footer />
		</div>
	);
}
