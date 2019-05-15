import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import "../../src/components/FormLogin/formLogin.css";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
// import FormLogin from "../components/FormLogin";
import EventBodyInfo from"../components/EventBodyInfo";

import { setInStorage, getFromStorage } from "../utils/storage";
import axios from 'axios';

class Event extends Component {
	constructor(props) {
		super(props);

		this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInPassword: '',
			signInEmail: '',
			events: []
		};
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
				
	}
	onChangeEmail(e) {
		this.setState({signInEmail:e.target.value});
	}
	onChangePassword(e) {
		this.setState({signInPassword:e.target.value});
	}
	handleSubmit(e) {
		e.preventDefault();
		//Grab State
        const {
            signInEmail,
            signInPassword
        } = this.state;

        this.setState({
            isLoading: true
        })

        // post requires to backend
        API.signin({
            email: signInEmail,
            password: signInPassword
        }).then(data => {
            console.log(data);
            const response = data.data;
            if(response.success) {
                setInStorage('the_main_app', { token: response.token });
                this.setState({
                    signInError: response.message,
                    isLoading: false,
                    signInEmail:'',
                    signInPassword: '',
                    token: response.token
                });
            }else{
                this.setState({
                    signInError: response.message,
                    isLoading: false
                });
            }            
        })
	}

	// state = {
	// 	events: []
	// }

	componentDidMount() {
		// const obj = getFromStorage('the_main_app');
        // if (obj  && obj.token) {
        //     //Verify token
        //     // console.log(obj);
        //     const { token } = obj;
        //     axios.get('api/user/verify?token=' + token).then(data => {

		// 		const response = data.data;
		// 		console.log(response);
		// 		console.log(token);
        //         if (response.success) {
		// 			console.log("this state "+this.state.token);
					
        //             this.setState({
        //                 token: token,
        //                 isLoading: false
		// 			});
		// 			console.log("this state 2 "+this.state);
        //         } else {
        //             this.setState({
        //                 isLoading: false
        //             });
        //         }
        //     })
        // } else {
        //     this.setState({
        //         isLoading: false
        //     });

        // }
		this.loadEvents();
	}

	

	loadEvents = () => {
		API.getEvents()
			.then(res => {
				this.setState({ events: res.data });
			}
			)
			.catch(err => console.log(err));
	};

	render() {
		const {
            isLoading,
            token,
            signInError,
            signInEmail,
            signInPassword
		} = this.state;
		
		if (!token) {
			return (

				<Container>
					{/* <article className="container"> */}
						<Jumbotron>
							<blockquote>
								<strong>Conference</strong>  <em>information</em>
							</blockquote>
							<br></br>
							<List>
								{this.state.events.slice(0,4).map((eve, i) => {
									return (
										<ListItem
											key={i}
											name={eve.name}
											id={eve._id}
										/>
									)
								})}

							</List>
						</Jumbotron>

					{/* </article> */}


					<form id="form1">
						{
							(signInError) ? (
								<p>{signInError}</p>
							) : (null)
						}
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Login</label>
							<input type="email" className="form-control" aria-describedby="emailHelp" name="email" placeholder="Enter email" value={signInEmail} onChange={this.onChangeEmail} />

						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={signInPassword} onChange={this.onChangePassword} />
						</div>

						<button type="submit" id="buttom" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
					</form>
		
					{/* <FormLogin /> */}
					<EventBodyInfo /> 
					


				</Container>
			);
		} 


		// redirect to /events
		return <Redirect to={{pathname: "/events", state: { userId : this.state.userId}}} />;
		
	}
}

export default Event;
