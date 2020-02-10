import React from 'react';
import Page from 'components/Page';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
//import { AvForm, AvField } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {addUserMutation} from '../../graphql/mutations'


class AddUser extends React.Component {

    constructor(props){
      super(props);
      this.state = { 
        email: '' ,
        password: ''
      };
    }
   
    handleChange = (e) => {
  
      this.setState({
        [e.target.id]: e.target.value
      });
      console.log(this.state)
    }

    handleSubmit = (event, errors, values) => {
      event.preventDefault();
      console.log(errors)
      this.setState({errors, values});
     
      if(this.state.errors.length === 0){
      const {
        email,
        password
      } = this.state.values;
      this.props.addUserMutation({
          variables: {
            email,
            password
              }
      }).then(res=>{ 
            this.props.history.push("/user")
      }); 
    }}
    
        

    render() {
      return (
    <Page title="Add User" breadcrumbs={[{ name: 'add user', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>Add User</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login Details</legend>
         
           <FormGroup>
                <label htmlFor="email">Email</label>
                <Input
                type="text"
                name="email"
                onChange={this.handleChange}
/>
            </FormGroup>
            </fieldset>

 
            <FormGroup>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>


                </Form>
          </CardBody>
          </Card>
          </Col>
          </Row>
          </Page>
   
      );
    }
   }
   export default compose(

    graphql(addUserMutation , { name: "addUserMutation" }),
  
  
  )(AddUser)