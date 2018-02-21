import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon,
Form, FormGroup, Label, FormText} from 'reactstrap';
import { Redirect } from 'react-router-dom';

//SERVICE CALLS
import firebase from '../../fire';
import {userDb} from '../../db';

//Google Auth
var provider = new firebase.auth.GoogleAuthProvider();

class Register extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn:false,
      email: '',
      pass: '',
      fullName: '',
      toLog: false
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(ev){
      ev.preventDefault();
      const target = ev.target;
      const value = target.value;
      const name = target.name;

      this.setState({
          [name]: value
      })
  }

  handleOnSubmit(){
      let self = this;
      const email = this.state.email;
      const pass = this.state.pass;
      const username = this.state.fullName;

      firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {
        console.log(user);

            self.props.signIn(user);
            localStorage.userName = username;
            localStorage.uid = user.uid;
            localStorage.signedIn = true;
            self.setState({
                loggedIn: true
            });
            console.log(self.state);

    }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
  }

  render() {
     var signedIn = localStorage.signedIn === 'true' ? true : false;

      let stylishCard = {
          width: '50%'
      }
    return (
        this.state.loggedIn || signedIn ?
            <Redirect to={"/game"} />
            :
            <div className="app flex-row align-items-center">
              <Container style={ stylishCard }>
                <Row className="justify-content-center">
                    <Col xs="12">
                        <CardGroup>
                            <Card  className="text-black bg-secondary py-5 d-md-down-none p-4" >
                                <CardBody className="text-center">
                                  <div>
                                      <h2>Log-In</h2>
                                      <Form>
                                          <FormGroup>
                                            <Label>Name</Label>
                                            <Input type="text" name="fullName" placeholder="Full Name" onChange={ this.handleOnChange } />
                                          </FormGroup>
                                          <FormGroup>
                                            <Label>Email</Label>
                                            <Input type="email" name="email" placeholder="email@mail.com" onChange={ this.handleOnChange } />
                                          </FormGroup>
                                          <FormGroup>
                                            <Label>Password</Label>
                                            <Input type="password" name="pass" placeholder="password" onChange={ this.handleOnChange } />
                                          </FormGroup>
                                          <Button onClick={ this.handleOnSubmit } className="btn-dark">Submit</Button>
                                      </Form><br/>
                                  </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
              </Container>
            </div>
    );
  }
}

export default Register;
