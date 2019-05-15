import React, { Component } from "react";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";


//TO DO: Add list of events of the logged user

class EventsList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			events: [],
			referrer: null,
			userId: null
		};
		this.logout = this.logout.bind(this);

	}

	componentDidMount() {
		const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			//Verify token
			console.log(obj);
			const { token } = obj;
			axios.get('api/user/verify?token=' + token).then(data => {
				const response = data.data;
				if (response.success) {
					this.setState({
						token: token,
						isLoading: false
					});
				} else {
					this.setState({
						isLoading: false
					});
				}
			})
		} else {
			this.setState({
				isLoading: false
			});

		}
		// if(this.state.userId) return 
		// this.setState({userId: this.props.location.state.userId});
		// console.log("id" + this.state.userId);

		// const userID = this.props.location.state.userId;
		// console.log("propsID", this.props.location.state.userId);
		// console.log("id", userID);

		this.loadEvents();

	}

	loadEvents = () => {
	    API.getEvents()
	    .then(res =>
	        this.setState({ events: res.data })
	    )
	    .catch(err => console.log(err));
	};

	handleSubmit = e => {
		e.preventDefault();
		this.setState({ referrer: '/admin' });
		//set state of user to admin in this step and send info to DB???
	}

	logout() {
		this.setState({
			isLoading: true,

		});
		const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			//Verify token
			console.log(obj);
			const { token } = obj;
			axios.get('/api/user/logout?token=' + token).then(data => {
				const response = data.data;
				if (response.success) {
					this.setState({
						token: '',
						isLoading: false
					});
				} else {
					this.setState({
						isLoading: false
					});
				}
			})
		} else {
			this.setState({
				isLoading: false
			});

		}
	}

	render() {
		const { token, referrer } = this.state;
		if (referrer ) return <Redirect to={{pathname: "/admin"}} />;
		// if (referrer && this.state.userId ) return <Redirect to={{pathname: "/admin", state: { userId : this.props.location.state.userId}}} />;
	const listStyle={
	MargingTop: "50%",
	backgroundColor: "black"
};

		// if (!token) return <Redirect to={{pathname: "/"}} />;
		return (
			<Container>
					<h1>Click to see the info of an event</h1>

				<List styleProp={listStyle}>
					{this.state.events.map((eve, i) => {
						return (
							<ListItem
										key={i}
										name={eve.name}
										id={eve._id}
									/>
						)
					})}
				</List>
				<FormBtn onClick={this.handleSubmit}>Add New Event</FormBtn>

				<div>
					<p>Account</p>
					<button onClick={this.logout}>Logout</button>
				</div>

			</Container>
		)
	}
}

export default EventsList;
