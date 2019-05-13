import React, { Component }  from "react";
import { Container } from "../components/Grid";
import QuestionAdmin from "../components/QuestionAdmin";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";


  
class Admin extends Component {

    constructor(props) {
		super(props);

		this.state = {
			referrer: null,
			userId: null
		}

    }
    
    // componentDidMount() {
    //     if(this.state.userId) return 
    //     this.setState({userId: this.props.location.state.userId});
    //     console.log("id" + this.state.userId);
    //     console.log("propsID", this.props.location.state.userId);

    // }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/events'});
      }
      render() {
        const { referrer } = this.state;
        if (referrer ) return <Redirect to={{pathname: "/events"}} />;
        // if (referrer && this.state.userId ) return <Redirect to={{pathname: "/events", state: { userId : this.props.location.state.userId}}} />;
        // const { userId } = this.props.location.state.userId;
        
        return (
            <Container > 
                    <h1>Tell us all about your event</h1>
                <QuestionAdmin />
                <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn>

            </Container> 
                      
        );
      }
}

export default Admin;