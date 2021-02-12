import React, { useContext } from 'react';
import { TasksContext } from '../TasksContext';
import { Link } from 'react-router-dom';

function Tasks() {
	const { tasks } = useContext(TasksContext);

	return (
		<div className='container tasks'>
			{tasks.map((task) => (
				<Link to={`/${task.id}`} className='btn p-0' key={task.id}>
					<div className='card'>
						<img src={task.image} alt='...' />
						<div className='card-body'>
							<h5 className='card-title'>{task.title}</h5>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Tasks;
