import React, {useEffect, useState} from 'react';
import priorityStatus from "../utils/checkTaskPriorityStatus";
import taskStatus from "../utils/checkTaskStatus";
import checkTaskDifficultyStatus from "../utils/checkTaskDifficultyStatus";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import deleteTask from "../apiCalls/deleteTask";

function TaskCard({task, setShowEditModal, setEditableTask, roomId, callGetTasks}) {
	// console.log(task.title)
	const [title, setTitle] = useState(task.title);
	// console.log(title)
	const [duration, setDuration] = useState(task.duration);
	const [username, setUsername] = useState(task.user.username);
	const [priority, setPriority] = useState(task.priority);
	const [difficulty, setDifficulty] = useState(task.difficulty);
	const [status, setStatus] = useState(task.status);

	useEffect(() => {
		setTitle(task.title)
		setDuration(task.duration)
		setUsername(task.user.username)
		setPriority(task.priority)
		setDifficulty(task.difficulty)
		setStatus(task.status)
	}, [task]);
	const handleEditTask = (task) => {
		console.log(task)
		setEditableTask(task)
		setShowEditModal(true)
	}
	const handleDeleteTask = async () => {
		const response = await deleteTask(task.id, roomId)
		if (response.status === 202) {
			await callGetTasks()
		}
		if (response.status === 403) {
			console.log('toastify needed')
		}
	}

	return (
		<tr className={`border-l-8 border-t border-t-slate-200
				${task.difficulty === 'el' ? 'border-cyan-500' : undefined}
				${task.difficulty === 'e' ? 'border-emerald-500' : undefined}
				${task.difficulty === 'm' ? 'border-yellow-400' : undefined}
				${task.difficulty === 'h' ? 'border-red-600' : undefined}`}>
			<td className={'text-center'}>
				<h5>
					{title}
				</h5>
			</td>
			<td className={'text-center'}>
				<p>{duration}</p>
			</td>
			<td className={'text-center'}>
				<p>{username}</p>
			</td>
			<td className={'text-center'}>
				<p>{priorityStatus(priority)}</p>
			</td>
			<td className={'text-center'}>
				<p>{checkTaskDifficultyStatus(difficulty)}</p>
			</td>
			<td className={'text-center'}>
				<p>{taskStatus(status)}</p>
			</td>
			<td className={'w-6'}>
				<PencilIcon onClick={() => handleEditTask(task)}
							className={'h-8 w-8 cursor-pointer rounded-lg hover:bg-blue-500 hover:text-white py-2'}/>
			</td>
			<td className={'w-6'}>
				<TrashIcon onClick={handleDeleteTask}
						   className={'ml-1 h-8 w-8 cursor-pointer rounded-lg hover:bg-red-500 hover:text-white py-2'}/>
			</td>
		</tr>
	);
}

export default TaskCard;