import React, { useState } from 'react';
import {
	useDocumentData,
	useCollectionData,
} from 'react-firebase-hooks/firestore';
import {
	getFirestore,
	doc,
	collection,
	query,
	where,
	increment,
} from 'firebase/firestore';
import { setDoc, Timestamp, updateDoc } from '@firebase/firestore';
import { useAuthStateHook } from '../core/Firebase';
import { Error403 } from '../core/Errors';
import Valid from '../core/Valid';

const pointsref = collection(getFirestore(), 'points');
const transactref = collection(getFirestore(), 'transactions');

function Pay(props: {
	uid: string;
	email: string;
	user: { uid: string; email: string; points: number };
}) {
	const ref = doc(pointsref, props.uid);
	const userref = doc(pointsref, props.user.uid);
	const [value, loading, error] = useDocumentData(ref);
	const [amount, setAmount] = useState(value ? value!.points : undefined);
	return (
		<div className='dark:bg-gray-700 bg-gray-300 m-2 p-3 text-xl rounded-xl flex flex-row flex-wrap'>
			{loading ? <> Loading ... </> : null}
			{error ? <> Error! </> : null}
			{value ? (
				<>
					<label className='flex flex-row flex-wrap m-2 p-1'>
						<div
							className={
								(value.points >= 0 ? 'bg-green-500' : 'bg-red-500') +
								' ' +
								'rounded-lg p-1 mx-2'
							}
						>
							{value.points} Points
						</div>{' '}
						{value.email}
					</label>{' '}
					<input
						type='number'
						value={amount !== undefined ? amount : ''}
						min={0}
						className='rounded-lg m-2 dark:bg-gray-600 p-1 border-2 border-red-500 outline-none'
						onChange={(e) => {
							e.preventDefault();
							const v = parseInt(e.target.value);
							if (isNaN(v) || v < 0) setAmount(undefined);
							else setAmount(v);
						}}
					/>
					<button
						className={
							'm-2 rounded-lg p-1 transform hover:-translate-y-1' +
							' ' +
							(amount ? 'bg-green-500' : 'bg-green-400')
						}
						onClick={
							amount
								? async () => {
										await updateDoc(ref, {
											points: increment(amount),
										});
										await updateDoc(userref, {
											points: increment(-amount),
										});
										// record transaction
										await setDoc(doc(transactref), {
											from: props.user.email,
											to: props.email,
											amount: amount,
											date: Timestamp.now(),
										});
										setAmount(undefined);
								  }
								: undefined
						}
					>
						{' '}
						Pay{' '}
					</button>
				</>
			) : null}
		</div>
	);
}

export default function Payment() {
	const [user] = useAuthStateHook();
	const q = user ? query(pointsref, where('uid', '!=', user!.uid)) : null;
	const [values, loading, errors] = useCollectionData(q);
	const userref = user && Valid(user) ? doc(pointsref, user?.uid) : null;
	const [userdata, userDataLoading] = useDocumentData(userref);
	return (
		<div className='m-2 p-3'>
			<h1 className='my-5 text-3xl p-3'> Other Users </h1>
			<div className='dark:bg-gray-800 bg-gray-200 m-2 p-3 rounded-lg text-2xl'>
				{user &&
				!userDataLoading &&
				userdata?.points !== undefined &&
				Valid(user) ? (
					<>
						{loading ? <>Loading ... </> : null}
						{errors ? <>Error! </> : null}
						{values
							? values.map((x) => (
									<Pay
										uid={x.uid}
										email={x.email}
										user={{
											uid: user!.uid,
											email: user!.email!,
											points: userdata!.points,
										}}
										key={x.uid}
									/>
							  ))
							: null}
					</>
				) : (
					<Error403 />
				)}
			</div>
		</div>
	);
}
