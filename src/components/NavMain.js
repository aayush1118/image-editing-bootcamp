import React from 'react';
import { Link } from 'react-router-dom';

function NavMain() {
	return (
		<nav className='p-3 bg-dark '>
			<div className='container'>
				<Link to='/' className='btn btn-light mx-1'>
					Tasks
				</Link>
				<Link to='/create' className='btn btn-light mx-1'>
					Create
				</Link>
			</div>
		</nav>
	);
}

export default NavMain;
