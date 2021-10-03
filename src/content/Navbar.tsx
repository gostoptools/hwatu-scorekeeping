import React from 'react';
import { useAuthStateHook, login, logout } from '../core/Firebase';
import { Link } from 'react-router-dom';

function AuthButton() {
	const [user] = useAuthStateHook();
	return user ? (
		<>
			<div className='text-2xl p-3 m-1'> Logged in as {user.email} </div>
			<button
				className='bg-blue-500 text-white text-2xl font-bold rounded-xl p-3 m-1 transform hover:-translate-y-1'
				onClick={logout}
			>
				Log out
			</button>
		</>
	) : (
		<>
			<button
				className='bg-blue-500 text-white text-2xl font-bold rounded-xl p-3 m-1 transform hover:-translate-y-1'
				onClick={login}
			>
				Log in
			</button>
		</>
	);
}

export default function Navbar() {
	return (
		<div className='m-1 p-3 bg-yellow-400 text-black flex flex-wrap justify-between rounded-xl'>
			<Link
				className='bg-blue-500 text-white text-2xl font-bold rounded-xl p-3 m-1 transform hover:-translate-y-1'
				to='/'
			>
				About
			</Link>
			<Link
				className='bg-blue-500 text-white text-2xl font-bold rounded-xl p-3 m-1 transform hover:-translate-y-1'
				to='/home'
			>
				Home
			</Link>
			<AuthButton />
		</div>
	);
}
