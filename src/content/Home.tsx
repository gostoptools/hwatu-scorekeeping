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
			<p className='text-center m-2 p-3 text-xl'>
				More information about this system is available at{' '}
				<a href='https://gostoptools.github.io' className='underline'>
					this website
				</a>
				.
			</p>

			<p className='text-center m-2 p-3 text-xl'>
				Note that the unit of currency is a <strong>MOK</strong>
			</p>
		</div>
	);
}
