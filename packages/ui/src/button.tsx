'use client';

import { ReactNode } from 'react';

interface ButtonProps {
	// children: ReactNode;
	content: string;
	// onClick: () => void;
}

// Removed child prop delibratly
export const Button = ({ content }: ButtonProps) => {
	// export const Button = ({ children, content, onClick }: ButtonProps) => {
	return <button className='bg-transparent border-black'>{content}</button>;
};
