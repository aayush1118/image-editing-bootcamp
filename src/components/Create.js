import React, { useState, useContext } from 'react';
import { TasksContext } from '../TasksContext';
import { submissions } from '../data';
import { useHistory } from 'react-router-dom';

function Create() {
	const { setTasks } = useContext(TasksContext);
	const [form, setForm] = useState({
		id: null,
		title: null,
		image: null,
		notes: '',
	});
	const [file, setFile] = useState(null);
	const history = useHistory();

	const updateField = (e) => {
		if (e.target.name === 'image') {
			const reader = new FileReader();
			let input = e.target.files[0];
			if (!input) {
				setFile(null);
			} else {
				reader.readAsDataURL(input);
				reader.onload = () => {
					setFile(reader.result);
				};
			}
		}
		setForm({
			...form,
			[e.target.name]: e.target.value,
			submissions: submissions,
		});
	};
	const submit = (e) => {
		e.preventDefault();

		if (file && form.title) {
			setTasks((prevItems) => [
				...prevItems,
				{ ...form, image: file, id: Date.now().toString() },
			]);
			history.push('/');
		}
	};

	return (
		<div className='bg-light bg-gradient p-5 container mt-5 rounded border'>
			{/* <h2>{msg}</h2> */}
			<h1 className='text-center'>Create a new task</h1>
			<form className='mx-3 create-form'>
				<div>
					<label className='form-label' htmlFor='title'>
						Title
					</label>
					<input
						className='form-control mb-3'
						type='text'
						name='title'
						value={form.title}
						onChange={updateField}
						required
					></input>

					<label className='form-label' htmlFor='image'>
						Image
					</label>
					<input
						className='form-control form-control-sm mb-3'
						type='file'
						name='image'
						accept='.png, .jpg, .jpeg'
						value={form.image}
						onChange={updateField}
						required
					></input>

					<label className='form-label' htmlFor='notes'>
						Notes
					</label>
					<textarea
						className='form-control form-control-sm mb-3'
						name='notes'
						cols='20'
						rows='5'
						onChange={updateField}
						value={form.notes}
					></textarea>

					<div className='d-grid'>
						<button
							className='btn btn-dark bg-gradient'
							onClick={submit}
						>
							Add
						</button>
					</div>
				</div>
				<div className='form-img m-4'>
					{file ? (
						<img
							className='img-fluid img-thumbnail rounded'
							src={file}
							alt='Image Preview'
						/>
					) : (
						<span>Image Preview</span>
					)}
				</div>
			</form>
		</div>
	);
}

export default Create;
