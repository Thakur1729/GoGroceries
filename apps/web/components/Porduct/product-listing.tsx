'use client';
import ItemCard from '@/components/ItemCard';
import CoustomSortDropdown from '@repo/ui/CoustomSortDropdown';
interface ProductListingProps {
	title: string;
	products: any[];
}

export function ProductListing({ title, products }: ProductListingProps) {
	return (
		<div className='flex-1 p-4'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<div className='flex items-center gap-2'>
					<CoustomSortDropdown />
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
				{products.map((product) => (
					<ItemCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
