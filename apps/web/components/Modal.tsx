import React, { ReactNode, useState } from 'react';

export const Modal = ({
	isOpen,
	onClose,
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}) => {
	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 ${isOpen ? 'bg-[#00000099]' : ''} bg-opacity-50 flex items-center justify-center z-50`}
			onClick={onClose}>
			{children}
		</div>
	);
};
