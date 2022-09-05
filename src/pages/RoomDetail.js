import React, {useContext, useEffect, useState} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import api from "../api";
import getRoomDetail from "../apiCalls/getRoomDetail";
import {userContext} from "../userContext";

function RoomDetail(props) {
	const {id} = useParams()
	const [roomDetail, setRoomDetail] = useState({});
	const {isAuthenticated} = useContext(userContext)

	useEffect(() => {
		getRoomDetail(setRoomDetail, id)
	}, []);
	if (isAuthenticated) {
		if (roomDetail.status === 404) {
			return (
				<Navigate to={'/dashboard'}/>
			)
		} else if (Object.keys(roomDetail).length !== 0) {
			return (
				<div>
					{roomDetail.data.is_owner &&
						<Link to={'/invite'}>Invite Member</Link>
					}
					<h1>
						{roomDetail.data.name}
					</h1>
					<h3>admin:</h3>
					<p>{roomDetail.data.leader.username}</p>
					<h3>members:</h3>
					{roomDetail.data.members.map(member => (
							<p key={member.id}>{member.username}</p>
						)
					)}
				</div>
			);
		}
	} else {
		return (<Navigate to={'/login'}/>)
	}
}

export default RoomDetail;