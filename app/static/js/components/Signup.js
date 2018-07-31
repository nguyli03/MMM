import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button, Input, Label, Jumbotron, Option, Select } from 'reactstrap';

const style = {
  backgroundColor:"#f1f1f1"
};

class Signup extends Component {
  constructor(props){
   super(props);
   this.state={inputusername: "", inputpassword: "", inputretypepassword:""};
   this.handleClick = this.handleClick.bind(this);
   this.updateInputValueUserName = this.updateInputValueUserName.bind(this);
   this.updateInputValuePassword = this.updateInputValuePassword.bind(this);
   this.updateInputValueRetypePassword = this.updateInputValueRetypePassword.bind(this);
   this.redirectLogin = this.redirectLogin.bind(this);
  }

  handleClick(){
    console.log("value of username: "+this.state.inputusername);
    console.log("value of password: "+this.state.inputpassword);
    console.log("role of the user: "+this.state.inputrole)
  }

  updateInputValueUserName(evt){
    this.setState({inputusername: evt.target.value});
  }

  updateInputValuePassword(evt){
    this.setState({inputpassword: evt.target.value});
  }

  updateInputUserRole(evt){
    this.setState({inputrole: evt.target.value})
  }

  redirectLogin(){
    return window.location = '/login';
  }

  render() {
    return (
      <Row className='text-center' fluid>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Jumbotron>
        <h2> Sign up for MentorMenteeMatch</h2>
          <Label><b>Username</b></Label>
          <Input type="text" id ='username' placeholder="Enter Username" className="inputusername" value = {this.state.inputusername} onChange={this.updateInputValueUserName.bind(this)} required />

          <Label><b>Password</b></Label>
          <Input type="password" id ='password' placeholder="Enter Password" className="inputpassword" value ={this.state.inputpassword} onChange={this.updateInputValuePassword.bind(this)} required />

          <Label><b>Retype Password</b></Label>
          <Input type="password" id ='retypepassword' placeholder="Retype Password" className="inputpassword" value ={this.state.inputretypepassword} onChange={this.updateInputValueRetypePassword.bind(this)} required />

          <hr/>
          <Button type="submit" id='signupButton' color="primary" onClick ={this.sendInfo.bind(this)}> Signup</Button>
          <hr />
          <Button type ="button" id ='signupButton' color="danger" onClick = {this.redirectLogin}>Return to login</Button>
      </Jumbotron>
      </Col>
      </Row>
    );
  }

  sendInfo(){
    var config = { headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'}
    }
    axios.post('/signupHelper', {
      inputusername: this.state.inputusername,
      inputpassword: this.state.inputpassword,
      inputretypepassword: this.state.inputretypepassword
    }, config)
    .then(function (response) {
      if (response.data == 'errorNull'){
        alert('Please fill in all the information');
      }
      else if(response.data == 'passwordError') {
        alert('Passwords do not match. Please retype password')
      }
      else if (response.data == '/login') {
        alert("You have an account already, we'll redirect you to login");
        window.location = response.data;
      } else {
        alert("You have successfully signed up!");
        window.location = response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default Signup;
