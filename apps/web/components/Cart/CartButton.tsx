import React from 'react';
import { X } from '@repo/ui/lucide-react';

function CartButton({ onClose }: { onClose: () => void }) {
	return (
		<div className='absolute right-0 bg-white w-96 h-dvh'>
			<div className='absolute right-3 top-4'>
				<X onClick={onClose} />
			</div>
		</div>
	);
}

export default CartButton;
