import React from 'react';

import {
	collection,
	query,
	getFirestore,
	orderBy,
	limit,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const transactref = collection(getFirestore(), 'transactions');
const transactlimit = 20;

export default function Transactions() {
	const q = query(transactref, orderBy('date', 'desc'), limit(transactlimit));
	const [values, loading, errors] = useCollectionData(q);
	return (
		<div className='m-2 p-3'>
			<h1 className='my-5 text-3xl p-3'> Last {transactlimit} Transactions </h1>
			<div className='dark:bg-gray-800 bg-gray-200 m-2 p-3 rounded-lg text-2xl'>
				{loading ? <> Loading ... </> : null}
				{errors ? <> Error Fetching Data (probably need to log in) </> : null}
				{values
					? values.map((v, index) => (
							<div
								className='dark:bg-gray-700 bg-gray-300 m-2 p-3 text-xl rounded-xl flex flex-row flex-wrap'
								key={index}
							>
								<div className='mx-2 p-1'>{v.from} paid </div>
								<div className='bg-green-500 m-2 p-1 rounded-lg'>
									{v.amount} point{v.amount === 1 ? null : 's'}
								</div>
								<div className='mx-2 p-1'>to {v.to} on </div>
								<div className='bg-blue-500 m-2 p-1 rounded-lg'>
									{v.date.toDate().toLocaleDateString('en-us') +
										' ' +
										v.date.toDate().toLocaleTimeString('en-us')}
								</div>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}
