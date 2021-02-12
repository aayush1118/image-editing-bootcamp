import React, { useContext } from 'react';
import { TasksContext } from '../TasksContext';
import { useRouteMatch } from 'react-router-dom';

function Task() {
	const { tasks, setTasks } = useContext(TasksContext);
	const match = useRouteMatch();
	const id = match.params.id;
	console.log(id);
	console.log(tasks);
	const task = tasks.find((x) => x.id === id);

	const setRating = (e) => {
		const v = parseInt(e.target.value);
		const n = parseInt(e.target.name);

		const newSubmissions = JSON.parse(JSON.stringify(task.submissions));
		newSubmissions[n].score = v;
		const newTask = { ...task, submissions: newSubmissions };

		setTasks(
			tasks.map((x) => {
				if (x === task) {
					return newTask;
				} else {
					return x;
				}
			})
		);
	};

	return (
		<div className='container'>
			<div className=' my-5 rounded border row mx-auto bg-light bg-gradient p-5'>
				<div className='col-xs-12 col-md-6 my-auto'>
					<h4>{task.title}</h4>
					<p className='my-0 mt-3 text-muted'>Description</p>
					<p>{task.notes ? task.notes : '-'}</p>
				</div>
				<div className='col'>
					<img
						className='img-fluid img-thumbnail rounded'
						src={task.image}
						alt=''
					/>
				</div>
			</div>

			<div className='submissions border p-5 rounded bg-light bg-gradient '>
				<h3>Submissions</h3>
				<div className='submissions-img'>
					{task.submissions.map((x) => (
						<div
							className='m-2 p-4 bg-white rounded-3 border'
							key={task.submissions.indexOf(x)}
						>
							<img src={x.img} alt='' className='img-thumbnail' />
							<input
								type='range'
								className='form-range'
								min='0'
								max='10'
								value={x.score !== null ? x.score : 0}
								onChange={setRating}
								name={task.submissions.indexOf(x)}
							></input>
							<p className='text-center'>
								Score: {x.score !== null ? x.score : 'NR'}/10
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Task;
