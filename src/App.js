import React, { useState, useMemo } from 'react';
import Tasks from './components/Tasks';
import { Route, Switch } from 'react-router-dom';
import NavMain from './components/NavMain';
import Create from './components/Create';
import { TasksContext } from './TasksContext';
import Task from './components/Task';
import { example } from './data';

function App() {
	const [tasks, setTasks] = useState([example]);
	const value = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);
	return (
		<>
			<NavMain />
			<TasksContext.Provider value={value}>
				<Switch>
					<Route exact path='/' component={Tasks} />
					<Route exact path='/create' component={Create} />
					<Route exact path='/:id' component={Task} />
					<Route render={() => <h1>404: page not found</h1>} />
				</Switch>
			</TasksContext.Provider>
		</>
	);
}

export default App;
