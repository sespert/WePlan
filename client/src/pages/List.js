import React, { Component } from "react";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import axios from "axios";
import { getFromStorage, setInStorage, deleteFromStorage } from "../utils/storage";
import '../components/Nav/nav.css';
import Jumbotron from "../components/JumbotronListEvents";
import Jumbotron3 from "../components/AddNextEvent";



class EventsList extends Component {

	constructor(props) {
		super(props);

		console.log(props);

		this.state = {
			isLoading: true,
			token: this.props.location.state.token,
			events: [],
			adminEvents: [],
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
				console.log("verify response ");
				console.log(response);
				if (response.success) {
					this.setState({
						token: token,
						isLoading: false
					});
					console.log("state token" + this.state.token);
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

		console.log("state token" + this.state.token);

		this.loadEvents();
		this.loadAdminEvents(this.state.token);

	}

	loadEvents = () => {
		API.getEvents()
			.then(res =>
				this.setState({ events: res.data })
			)
			.then(res => console.log(this.state.events))
			.catch(err => console.log(err));
	};

	loadAdminEvents = token => {
		axios.get('/../api/user/findsession/' + token).then(data => {
			const response = data.data;
			this.setState({userId: response.userId});
			API.getEventsByAdmin(response.userId)
				.then(res => this.setState({ adminEvents: res.data }))
		}).catch(err => console.log(err))

	}

	handleSubmit = e => {
		e.preventDefault();
		this.setState({ referrer: '/admin' });
		//set state of user to admin in this step and send info to DB???
	}

	handleClick = e => {
		e.preventDefault();
		console.log(this.state.userId);
		this.setState({ referrer: '/user/events/' + this.state.userId })
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
				console.log("logout response ");
				console.log(response);
				if (response.success) {
					this.setState({
						token: '',
						isLoading: false
					});
					deleteFromStorage('the_main_app');
					console.log("state token" + this.state.token);
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

	toSingleEvent = (id) => {
		// e.preventDefault();
		this.setState({ referrer: '/events/' + id });
	}

	render() {
		const { token, referrer } = this.state;
		if (referrer) return <Redirect to={{ pathname: referrer, state: { token: this.state.token } }} />;
		// if (referrer && this.state.userId ) return <Redirect to={{pathname: "/admin", state: { userId : this.props.location.state.userId}}} />;
		const listStyle = {
			MargingTop: "50%",
			backgroundColor: "black"
		};
		console.log(token);
		if (token === "0") {
			return (

				<Container>
					<ul className="navbar-nav flex-row ml-md-auto link-cont">
						{/* <li className="nav-item">
							<a className="nav-link guide-link mr-3" href="/events">Events Guide</a>
						</li> */}
						<li className="nav-item">
							<a className="nav-link logout-link" href="/">Log In</a>
						</li>
					</ul>

					{/* <button onClick={this.logout}>Logout</button> */}

					<h1>Click to see the event's information</h1>

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

				</Container>
			)
		}

		return (

			<Container>
				<ul className="navbar-nav flex-row ml-md-auto link-cont">
					<li className="nav-item">
						<a className="nav-link schedule-link" onClick={this.handleClick} href="/">Your Schedule</a>
					</li>

					<li className="nav-item">
						<a className="nav-link logout-link" onClick={this.logout} href="/">Log Out</a>
					</li>
				</ul>
				<Jumbotron className="currentEvent">

					<List>
						<h1 id="currentEvents">Current Events </h1>


						{this.state.events.map((eve, i) => {
							return (
								<ListItem id="items"
									key={i}
									name={eve.name}
									id={eve._id}
									toSingleEvent={this.toSingleEvent}
								/>
							)
						})}

					</List>
				</Jumbotron>

				<Jumbotron3>

					<h3>Events Added </h3>
					<List styleProp={listStyle}>
						{this.state.adminEvents.map((eve, i) => {
							return (
								<ListItem
									key={i}
									name={eve.name}
									id={eve._id}
									toSingleEvent={this.toSingleEvent}
								/>
							)
						})}
					</List>

				<FormBtn id="addNewEvent" onClick={this.handleSubmit}>Click to add your next event  <i class="far fa-calendar-plus"></i></FormBtn>
				</Jumbotron3>

			</Container>
		)
	}
}

export default EventsList;
