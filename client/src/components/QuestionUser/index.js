import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Input, FormBtn } from "../Form";
import "./QuestionUser.css";
import API from "../../utils/API";
import { getFromStorage, setInStorage } from "../../utils/storage";
import axios from 'axios';

class QuestionUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            token: '',
            signUpError: '',
            masterError: '',
            signUpFullName: '',
            signUpCompany: '',
            signUpEmail: '',
            signUpPassword: '',
            signInEmail:'',
            signInPassword:'',
            users: [],
            referrer: null,
            userId: ''

        };

        this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
        this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
        this.onChangeSignUpFullName = this.onChangeSignUpFullName.bind(this);
        this.onChangeSignUpCompany = this.onChangeSignUpCompany.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeSignUpEmail(e) {
        this.setState({
            signUpEmail: e.target.value,
            signInEmail: e.target.value
        })
    }
    onChangeSignUpPassword(e) {
        this.setState({
            signUpPassword: e.target.value,
            signInPassword: e.target.value
        })
    }
    onChangeSignUpFullName(e) {
        this.setState({
            signUpFullName: e.target.value
        })
    }
    onChangeSignUpCompany(e) {
        this.setState({
            signUpCompany: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const {
            signUpFullName,
            signUpCompany,
            signUpEmail,
            signUpPassword,
            signInEmail,
            signInPassword
        } = this.state;

        this.setState({
            isLoading: true,
            referrer: '/events'
        })

        // post requirest to backend
        API.saveUser({
            name: signUpFullName,
            company: signUpCompany,
            email: signUpEmail,
            password: signUpPassword
        }).then(data => {
            console.log(data);
            const response = data.data;
            if (response.success) {
                this.setState({
                    signUpError: response.message,
                    userId:response._id,
                    isLoading: false,
                    signUpEmail: '',
                    signUpPassword: '',
                    signUpFullName: '',
                    signUpCompany: ''
                });
            } else {
                this.setState({
                    signUpError: response.message,
                    isLoading: false
                });
            };
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
        })

    }
    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj  && obj.token) {
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
    }

    // state = {
    //     users: [],
    //     name: "",
    //     email: "",
    //     company: "",
    //     password: "",
    //     referrer: null,
    //     userId: ""

    // }

    // handleChange = e => {
    //     e.preventDefault();
    //     this.setState({ [e.target.name]: e.target.value })
    // }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     if (this.state.name && this.state.email && this.state.password) {
            
    //         this.setState({ referrer: '/events' });
    //         API.saveUser({
    //             name: this.state.name,
    //             email: this.state.email,
    //             company: this.state.company,
    //             password: this.state.password
    //         })
    //         .then(res => {                
    //             console.log(res);
    //             this.setState({userId:res.data._id});
            
    //         })
    //         .catch (err => console.log(err));
    //     } else {
    //         alert("Please enter missing fields")
    //     }
    // }


    render() {
        const { 
            isLoading,
            token,
            signUpError,
            signUpFullName,
            signUpCompany,
            signUpEmail,
            signUpPassword,
            referrer,
            userId       
        } = this.state;

        if (isLoading) {
            return (
                <div><p>Loading...</p></div>
            );
        }

        // if ( referrer && this.state.userId ) 
        if (!token){
            return (
                <div>
                    <ul className="navbar-nav flex-row ml-md-auto link-cont">
                        <li className="nav-item">
                            <a className="nav-link guide-link mr-3" href="/events">Events Guide</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link logout-link" onClick={this.handleSubmit} href="#">Register</a>
                        </li> */}
                    </ul>
                    {
                        (signUpError) ? (
                            <p>{signUpError}</p>
                        ) : (null)
                    }
                    <form className="col-6" id="formRegister"> 
                        <Input id="name" name="name" placeholder="Full Name (required)" value={signUpFullName} onChange={this.onChangeSignUpFullName} />
                        <Input id="email" name="email" placeholder="Email (required)" value={signUpEmail} onChange={this.onChangeSignUpEmail} />
                        <Input id="company" name="company" placeholder="Your Company" value={signUpCompany} onChange={this.onChangeSignUpCompany} />
                        <Input id="password" name="password" placeholder="Choose a Password" value={signUpPassword} onChange={this.onChangeSignUpPassword} />

                        <FormBtn id="registerButton" onClick={this.handleSubmit}>Register</FormBtn>
                    </form>
                </div>
            )
        }
        return <Redirect to={{pathname: "/events", state: { token : this.state.token}}} />;
    }
}

export default QuestionUser;