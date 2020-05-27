import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
