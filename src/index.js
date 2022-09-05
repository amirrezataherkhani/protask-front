import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import {UserContextProvider} from "./userContext";
import JoinRoom from "./pages/JoinRoom";
import CreateRoom from "./pages/CreateRoom";
import MyRooms from "./pages/MyRooms";
import RoomDetail from "./pages/RoomDetail";
import MyRequests from "./pages/MyRequests";
import InviteMember from "./pages/InviteMember";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<Routes>
				<Route path={'login'} element={<Login/>}/>
				<Route path={'register'} element={<Register/>}/>
				<Route path={'dashboard'} element={<Dashboard/>}/>
				<Route path={'create-room'} element={<CreateRoom/>}/>
				<Route path={'join-room'} element={<JoinRoom/>}/>
				<Route path={'my-rooms'} element={<MyRooms/>}/>
				<Route path={'my-requests'} element={<MyRequests/>}/>
				<Route path={'invite'} element={<InviteMember/>}/>
				<Route path={'/room/:id'} element={<RoomDetail/>}/>
				<Route index element={<App/>}/>
			</Routes>
		</UserContextProvider>
	</BrowserRouter>,
);
