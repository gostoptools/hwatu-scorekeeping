import React from 'react';

export default function Home() {
	return (
		<div className='m-2 p-3'>
			<h1 className='text-center m-2 p-3 text-4xl'>
				{' '}
				Hwatu Point Management System{' '}
			</h1>
			<p className='text-center m-2 p-3 text-xl'>
				This app uses firebase firestore to maintain transactions in a game of
				go-stop.
			</p>
		</div>
	);
}
