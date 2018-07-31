// Home.js
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Home extends Component {
    constructor(props){
      super(props);
      this.state={inputusername: "", inputpassword: ""};
      this.redirectSignUp = this.redirectSignUp.bind(this);
      this.redirectLogin = this.redirectLogin.bind(this);
    }

    redirectSignUp(){
      return window.location = '/signup';
    }

    redirectLogin(){
      return window.location = '/login';
    }

    render() {
        return (
            <Jumbotron className='text-center'>
                <h1 className="display-3"> Mentor Mentee Match</h1>
                <h4> A platform to match mentor and mentee</h4>
                <hr/>
                <h6> New here? Sign up below to get started! </h6>
                <p> Otherwise, go ahead and login.</p>
                <a href="login">
                <Button color="primary" className="mx-3" onClick =  {this.redirectLogin()}> Login </Button>
                </a>
                <a href="signup">
                <Button color="primary" className="mx-3" onClick = {this.redirectSignUp()}> Signup </Button>
                </a>
            </Jumbotron>
        );
    }
  }
export default Home;
