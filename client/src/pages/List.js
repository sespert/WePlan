import React, { Component } from "react";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";


//TO DO: Add list of events of the logged user

class EventsList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			events: [],
			referrer: null,
			userId: null
		};

	}

	componentDidMount() {
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

	render() {
		const { referrer } = this.state;
		if (referrer ) return <Redirect to={{pathname: "/admin"}} />;
		// if (referrer && this.state.userId ) return <Redirect to={{pathname: "/admin", state: { userId : this.props.location.state.userId}}} />;

		return (
			<Container>
					<h1>Click to see the info of an event</h1>

				<List>
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

			</Container>
		)
	}
}

export default EventsList;
