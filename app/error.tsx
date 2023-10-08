'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<p>Ah que pena aconteceu um erro, que tal recarregar?</p>
		</div>
	);
}
