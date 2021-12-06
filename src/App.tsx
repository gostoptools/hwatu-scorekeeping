import React from 'react';
import Status from './content/Status';
import Payment from './content/Payment';
import Transactions from './content/Transactions';
import { useAuthStateHook } from './core/Firebase';
import { Error403 } from './core/Errors';

function App() {
	const [user] = useAuthStateHook();
	if (!user) return <Error403 />;
	return (
		<div>
			<Status />
			<Payment />
			<Transactions />
		</div>
	);
}

export default App;
