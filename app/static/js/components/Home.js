// Home.js
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Jumbotron className='text-center'>
                <h1 className="display-3"> Mentor Mentee Match</h1>
                <h4> A platform to match mentor and mentee</h4>
                <hr/>
                <h6> New here? Sign up below to get started! </h6>
                <p> Otherwise, go ahead and login.</p>
                <a href="login">
                <Button color="primary" className="mx-3"> Login </Button>
                </a>
                <a href="signup">
                <Button color="primary" className="mx-3"> Signup </Button>
                </a>
            </Jumbotron>
        );
    }
  }

  export default Home;
