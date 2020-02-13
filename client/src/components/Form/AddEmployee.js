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
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {addEmployeeMutation, addUserMutation} from '../../graphql/mutations'


class AddEmployee extends React.Component {

    constructor(props){
      super(props);
    
      this.state = { 
        username: '',
        name: '' ,
        email: '' ,
        gender: '',
        ratePerHour: '',
        jobTitle: '',
        hoursPerWeek: '',
        joinDate: '',
        phone: '',
        address: '',
        payrollid: '',
        badge: '',
        pin: '',
        picture: '',
        department: ''
      };
    }
   
    handleChange = (e) => {
  

      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(this.state)
    }

    handleSubmit = (event) => {
      event.preventDefault();
     // this.setState({errors, values});
     
    //if(this.state.errors.length === 0){
      const {
        username,
        name,
        email,
        gender,
        ratePerHour,
        jobTitle,
        hoursPerWeek,
        joinDate,
        phone,
        address,
        payrollid,
        badge,
        pin,
        picture,
        department
          
      } = this.state;
      
      
      this.props.addEmployeeMutation({
          variables: {
           
            username,
            name,
            email,
            gender,
            ratePerHour,
            jobTitle,
            hoursPerWeek,
            joinDate,
            phone,
            address,
            payrollid,
            badge,
            pin,
            picture,
            department
              }
      }).then(res=>{ 
            this.props.history.push("/employee")
      }); 
//}
  }
    
        

    render() {
      console.log(this.state)
      console.log(this.props)
      
      return (
    <Page title="Add Employee" breadcrumbs={[{ name: 'add employee', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>New employee</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login Details</legend>
         <FormGroup><label htmlFor="username">username</label>
            <Input
              type="text"
              name="username"
             onChange={this.handleChange}
            /></FormGroup>
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
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              onChange={this.handleChange}
            />
            </FormGroup>

            <FormGroup check>
              
                      <Label check>
                        <Input type="radio" name="gender" /> Male
                      </Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="gender" /> Female
                      </Label>
                    </FormGroup>

<hr></hr>
            <FormGroup>
                <label htmlFor="ratePerHour">Rate per hour</label>
                <Input
                type="text"
                name="ratePerHour"
                value={this.state.ratePerHour} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="joinDate">Join date</label>
                <Input
                type="text"
                name="joinDate"
                value={this.state.joinDate} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="phone">Phone</label>
                <Input
                type="text"
                name="phone"
                value={this.state.phone} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="address">Address</label>
                <Input
                type="text"
                name="address"
                value={this.state.address} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="badge">Badge</label>
                <Input
                type="text"
                name="badge"
                value={this.state.badge} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="pin">Pin</label>
                <Input
                type="text"
                name="pin"
                value={this.state.pin} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="department">department</label>
                <Input
                type="text"
                name="department"
                value={this.state.department} onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="picture">Picture</label>
                <Input
                type="file"
                name="pic"
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
     graphql(addEmployeeMutation,{name:"addEmployeeMutation"})

   )(AddEmployee);