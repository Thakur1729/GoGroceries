import React from 'react';

function Header() {
	return (
		<header className='bg-red-500'>
			<div>
				<h1>GoGroceries</h1>
			</div>
			<div>
				<span>Delivery in 8 min.</span>
			</div>
			<div>{/* <Search /> */}</div>
		</header>
	);
}

export default Header;
