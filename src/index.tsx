import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './content/Navbar';
import Home from './content/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/home'>
					<App />
				</Route>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
