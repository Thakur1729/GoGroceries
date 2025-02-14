import { Button } from '@repo/ui/button';

export default async function Home() {
	return (
		<div className='bg-primary h-screen z-0 p-4'>
			<main>
				<Button content='Open alert' />
			</main>
		</div>
	);
}
