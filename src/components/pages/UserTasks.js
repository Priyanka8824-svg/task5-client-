// UserTasks.js
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useAI2 from '../../hooks/useAI2'

function UserTasks(){
	const auth = useAuth()
	const [userData,setUserData] = useState({})
	const {id} = useParams()
	const AI2 = useAI2()

	async function getUserData(){
		try {
			const res = await AI2.get(`/user/tasks/${id}/`)
			console.log(res)
			if( res.status == 200 ){
				setUserData( res.data )
			}
		} catch(e) {
			console.log(e)
		}
	}

	useEffect( ()=>{ getUserData() } , [] )

	return(
		<div className="p-3 mt-2">
			<div className="p-2">
				<table className="table table-bordered table-striped text-center">	
					<thead>
						<tr className="table-secondary" key="row-1">
							<th colSpan="9" className="text-center fs-5"> User Data </th>
						</tr>
						<tr key='row-2'>
							<th>id</th>
							<th>Username</th>
							<th>Email</th>
							<th>is_active</th>
							<th>is_admin</th>
							<th>FirstName</th>
							<th>LastName</th>
							<th>date_joined</th>
						</tr>
					</thead>
					<tbody>
						<tr key={userData.id}>
							<td>{userData.id}</td>
							<td>{userData.username}</td>
							<td>{userData.email}</td>
							<td>{userData.is_active?"1":"0"}</td>
							<td>{userData.is_superuser?"1":"0"}</td>
							<td>{userData?.first_name ? userData.first_name : '-'}</td>
							<td>{userData?.last_name ? userData.last_name : '-'}</td>
							<td>{userData.date_joined}</td>
						</tr>
					</tbody>
				</table>
				
				{ (userData.assigner && (userData.role==='manager' || userData.role==='team_leader')) ?
				<table className="table table-bordered table-striped text-center">
					<thead>
						<tr className="table-secondary" key="row-1">
							<th colSpan="9" className="text-center fs-5">Tasks assigned by {userData.username}</th>
						</tr>
						<tr key='row-2'>
							<th>task_name</th>
							<th>task_description</th>
							<th>task_assigned_by</th>
							<th>task_assigned_to</th>
							<th>task_assigned_date</th>
							<th>task_completed_date</th>
							<th>task_deadline</th>
						</tr>
					</thead>
					<tbody>
							{
								([...userData.assigner]).map( e=>
									<tr key={e.id}>
										<td>{e.task_name}</td>
										<td>{e.task_description}</td>
										<td>{e.task_assigned_by.username}</td>
										<td>{e.task_assigned_to.username}</td>
										<td>{e.task_assigned_date}</td>
										<td>{e.task_completed_date}</td>
										<td>{e.task_deadline}</td>
									</tr>
								)
							}
					</tbody>
				</table>
				: null 
				}

				{ userData.assignee && userData.role=='developer' ?
				<table className="table table-bordered table-striped text-center">
					<thead>
						<tr className="table-secondary" key="row-1">
							<th colSpan="9" className="text-center fs-5">Tasks Assigned to {userData.username}</th>
						</tr>
						<tr key='row-2'>
							<th>task_name</th>
							<th>task_description</th>
							<th>task_assigned_by</th>
							<th>task_assigned_to</th>
							<th>task_assigned_date</th>
							<th>task_completed_date</th>
							<th>task_deadline</th>
						</tr>
					</thead>
					<tbody>
						
							{
								([...userData.assignee]).map( e=>
									<tr key={e.id}>
										<td>{e.task_name}</td>
										<td>{e.task_description}</td>
										<td>{e.task_assigned_by.username}</td>
										<td>{e.task_assigned_to.username}</td>
										<td>{e.task_assigned_date}</td>
										<td>{e.task_completed_date}</td>
										<td>{e.task_deadline}</td>
									</tr>
								)
							}
					</tbody>
				</table>
				: null 
				}
				
			</div>
		</div>
	)
}
export default UserTasks














