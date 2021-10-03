import React from 'react';
import { useAuthStateHook } from '../core/Firebase';
import { Error403 } from '../core/Errors';
import { getFirestore, setDoc, collection, doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Valid from '../core/Valid';

export default function Status() {
	const [user] = useAuthStateHook();

	if (!user || !Valid(user)) return <Error403 />;
	return (
		<div className='m-2 p-3'>
			<h1 className='my-5 text-3xl p-3'> Status </h1>
			<div className='dark:bg-gray-800 bg-gray-200 m-2 p-3 rounded-lg text-2xl flex'>
				<Points uid={user!.uid} email={user!.email!} />
			</div>
		</div>
	);
}

const ref = collection(getFirestore(), 'points');

export function Points(props: { uid: string; email: string }) {
	const r = doc(ref, props.uid);
	const [value, loading, error] = useDocumentData(r);

	// default value if not set.
	if (!value && !loading) {
		setDoc(doc(ref, props.uid), {
			uid: props.uid,
			points: 0,
			email: props.email,
		});
	}
	return (
		<>
			{value ? (
				<div
					className={
						(value.points < 0 ? 'bg-red-500' : 'bg-green-500') +
						' ' +
						'rounded-lg p-3 min-w-96'
					}
				>
					{' '}
					Points: {value.points}
				</div>
			) : null}
			{loading ? <> Loading... </> : null}
			{error ? <> Uh Oh! An error occurred. </> : null}
		</>
	);
}
