import React from 'react';

export function Error403() {
	return (
		<div>
			<h1 className='text-3xl m-2 p-3 bg-red-400 rounded-lg'>
				Valid Account needed to view.
			</h1>
		</div>
	);
}

export function NotInGame() {
	return (
		<div>
			<h1 className='text-3xl m-2 p-3 rounded-lg'>You are not in the game.</h1>
		</div>
	);
}
