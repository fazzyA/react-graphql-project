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
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {addEmployeeMutation} from '../../graphql/mutations'
import {addUserMutation} from '../../graphql/mutations'


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
      this.props.addUserMutation({
        variables: {
         
          email,
          password : "12345678",
          role : "tech",
          createdAt : Date.now(),
          status : "pending"
        }
      }).then(res=>{
// console.log('res',res)
// console.log(res.data.addUser.id)
this.props.addEmployeeMutation({
  variables: {
    userId: res.data.addUser.id,
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
  console.log('resolved');
  this.props.history.push("/employee")
}); 

      });

//}
  }
    
        

    render() {
    //   console.log(this.state)
    //   console.log(this.props)
      
      return (
    <Page title="Add Employee" breadcrumbs={[{ name: 'add employee', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>New employee</CardHeader>
            <CardBody>
            <AvForm onSubmit={this.handleSubmit}>
          <fieldset>
            {/* <legend>Login Details</legend> */}
            {/* <hr/> */}
         {/* <FormGroup><label htmlFor="username">username</label>
            <Input
              type="text"
              name="username"
             onChange={this.handleChange}
            /></FormGroup> */}

{/* <AvField name="username" label="UserName" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a username'},
           // pattern: {value: '^[A-Za-z0-9 /b]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
            minLength: {value: 5, errorMessage: 'Your name must be between 5 and 16 characters'},
            maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
          }} 
          onChange={this.handleChange}
          /> */}
          <AvField name="name" label="Name" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a name'}
           // pattern: {value: '^[A-Za-z0-9 /b]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
          }} 
          onChange={this.handleChange}
          />

<AvField name="email" label="Email" type="email" onChange={this.handleChange}/>
       
            </fieldset>

           {/* <FormGroup>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              onChange={this.handleChange}
            />
            </FormGroup> */}
            {/* <br/><br/>
            <h2>General Details</h2>
            <hr/> */}


{/* 
            <FormGroup check>
              
                      <Label check>
                        <Input type="radio" name="gender" /> Male
                      </Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="gender" /> Female
                      </Label>
                    </FormGroup> */}

<AvRadioGroup name="gender" label="Gender"  errorMessage="Pick one!">
          <AvRadio label="Male" value="Male" />
          <AvRadio label="Female" value="Female" />
        </AvRadioGroup>



            {/* <FormGroup>
                <label htmlFor="ratePerHour">Rate per hour</label>
                <Input
                type="text"
                name="ratePerHour"
                value={this.state.ratePerHour} onChange={this.handleChange}
                />
            </FormGroup> */}

            <AvField name="ratePerHour" label="ratePerHour" type="text"
            errorMessage='Enter in number' validate={{number: true}} />

<AvField name="joinDate" label="joinDate" type="date" />
            {/* <FormGroup>
                <label htmlFor="joinDate">Join date</label>
                <Input
                type="text"
                name="joinDate"
                value={this.state.joinDate} onChange={this.handleChange}
                />
            </FormGroup> */}
                <AvField name="phone" label="Phone " type="text"
        errorMessage="Invalid Phone Number"
       validate={{tel: true
        }}
        onChange={this.handleChange}
         />
            {/* <FormGroup>
                <label htmlFor="phone">Phone</label>
                <Input
                type="text"
                name="phone"
                value={this.state.phone} onChange={this.handleChange}
                />
            </FormGroup> */}

<AvField name="address" label="Address" type="text" errorMessage="Invalid address"
         validate={{
           // required: {value: true},
            //pattern: {value: '^[A-Za-z0-9]+$'},
            minLength: {value: 6},
            maxLength: {value: 106}
          }}
          onChange={this.handleChange}
           />


          <AvField 
          type="select" 
          name="department" 
          label="Department" 
          validate={{
          required: {value: true}
          }} 
          
          onChange={this.handleChange}
          >
          <option >Select</option>
          <option value="sales" >Sales</option>
          <option value="administration" >Administration</option>
          <option value="technical">Technical</option>
          
        </AvField>

            {/* <FormGroup>
                <label htmlFor="department">department</label>
                <Input
                type="text"
                name="department"
                value={this.state.department} onChange={this.handleChange}
                />
            </FormGroup> */}
            {/* <FormGroup>
                <label htmlFor="picture">Picture</label>
                <Input
                type="file"
                name="pic"
                />
            </FormGroup> */}
            {/* <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup> */}
          <Button>Submit</Button>

                </AvForm>
          </CardBody>
          </Card>
          </Col>
          </Row>
          </Page>
   
      );
    }
   }
   export default compose(
    graphql(addEmployeeMutation,{name:"addEmployeeMutation"}),
    graphql(addUserMutation,{name:"addUserMutation"})
    )(AddEmployee);