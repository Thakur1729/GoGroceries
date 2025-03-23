'use client';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/app/lib/util';

type SubCategory = {
	id: number;
	name: string;
	image: string;
	categoryId: number;
	active?: boolean;
};

interface SubcategoryNavigationProps {
	categories: SubCategory[];
	className?: string;
}

export function SubcategoryNavigation({
	categories,
	className,
}: SubcategoryNavigationProps) {
	return (
		<div className={cn('w-64 border-r bg-background', className)}>
			<nav className='flex flex-col'>
				{categories.map((category, index) => (
					<Link
						key={category.id}
						href={`/cn/${category.name.replace(/\s+/g, '-')}/sc/${categories[index]?.name.replace(/\s+/g, '-')}`}
						className={cn(
							'flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors',
							category.active && 'border-l-4 border-green-600 bg-green-50'
						)}>
						<div className='h-12 w-12 relative flex-shrink-0 overflow-hidden rounded-sm'>
							<img
								src={category.image || '/placeholder.svg'}
								alt={category.name}
								className='object-cover'
							/>
						</div>
						<span className='text-base font-medium'>{category.name}</span>
					</Link>
				))}
			</nav>
		</div>
	);
}
