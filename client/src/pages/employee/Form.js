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

import {addEmployeeMutation, updateEmployeeMutation} from '../../graphql/mutations'
import {addUserMutation} from '../../graphql/mutations'
import {queryEmployeeById} from '../../graphql/queries'
const axios = require("axios");


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
        department: '',
        operation: 'Add',
        values:{}
      };
    }
   

    componentDidMount(preprops){
     // console.log(this.props.match.params.id)
      if(this.props.match.params.id){
        // this.props.queryClientsById.refetch(); // >>> Refetch here!
        this.setState({operation : "Update"})
       // console.log('updated')
      }
      
    }

    
    componentDidUpdate(prevProps) {
      // console.log(this.props.data.employee )
      // console.log(prevProps)
      if( prevProps.data.employee !== this.props.data.employee ){
        console.log("----------------------------------")
        const {
          name ,
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
              
        } =this.props.data.employee 
        this.setState({
          values : {
            name,
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
        })
      }
    }
    



    handleChange = (e) => {
      if(e.target.id==='picture'){

        this.setState({
          values : { 
            ...this.state.values,
            picture:e.target.files[0].name
           }

          })
          console.log('files',this.state.values)


      } else{
      this.setState({
        values : { 
          ...this.state.values,
          [e.target.id]: e.target.value
         }
            });
            console.log('else===',this.state.values)

          }//else
    }

    handleSubmit = (event, errors, values) => {
      event.preventDefault();
      const formData = new FormData();
        formData.append('picture',this.state.values.picture);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    // this.setState({errors, values});
     console.log("i am in handlesubmit",this.state)
    //  if(this.state.errors.length === 0){
      const {
        // username,
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
          
      } = this.state.values;
        //if(this.state.errors.length === 0){
      if (this.state.operation === "Add"){
      // const {
      //   username,
      //   name,
      //   email,
      //   gender,
      //   ratePerHour,
      //   jobTitle,
      //   hoursPerWeek,
      //   joinDate,
      //   phone,
      //   address,
      //   payrollid,
      //   badge,
      //   pin,
      //   picture,
      //   department
          
      // } = this.state;
      this.props.addUserMutation({
        variables: {         
          email,
          password : "12345678",
          role : "tech",
          createdAt : Date.now().toString(),
          updatedAt : Date.now().toString(),
          status : "pending"
        }
      }).then(res=>{
// console.log('res.data.add',res)
// console.log(resUser.id)
this.props.addEmployeeMutation({
  variables: {
    userId: res.data.addUser.id,
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
    } else{
      console.log("i am in update")
      // const {
      //   name,
      //   gender,
      //   ratePerHour,
      //   jobTitle,
      //   hoursPerWeek,
      //   joinDate,
      //   phone,
      //   address,
      //   payrollid,
      //   badge,
      //   pin,
      //   picture,
      //   department
          
      // } = this.state;
console.log(this.props.data.employee.userId)
      this.props.updateEmployeeMutation({
        variables: {
          id : this.props.match.params.id,
          name,
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
          department,
          userId : this.props.data.employee.userId
        }
    }).then(res=>{ 
         console.log(res);// this.props.history.push("/employee") 
    }).catch(res=>console.log(res));     
          }

// }  //if
  }//handle submit
    


    render() {
       console.log("rendr",this.props)
    //   console.log(this.props)
      
      return (
    <Page title="Employee" breadcrumbs={[{ name: 'Employee', active: false, link : "/employee" },
    {name: this.state.operation , active: true,}  
    ]}>

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
          value = {this.state.values.name || ""}
          onChange={this.handleChange}
          />
<AvField name="email" label="Email" type="email" 
value = {this.state.values.email || ""}
onChange={this.handleChange}/>
       
            </fieldset>
            <input type="file" name="picture" id="picture" onChange= {this.handleChange} />

<AvRadioGroup name="gender" label="Gender"  errorMessage="Pick one!">
          <AvRadio name="gender" label="Male" value="Male" selected={this.state.values.gender==='Male'} onChange={this.handleChange}  />
          <AvRadio name="gender" label="Female" value="Female" selected={this.state.values.gender==='Female'} onChange={this.handleChange}/>
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
            value = {this.state.values.ratePerHour || ""}
            errorMessage='Enter in number' validate={{number: true}}
            onChange={this.handleChange} />

<AvField name="joinDate" label="joinDate" type="date" value = {this.state.values.joinDate || ""}
onChange={this.handleChange}
/>
            {/* <FormGroup>
                <label htmlFor="joinDate">Join date</label>
                <Input
                type="text"
                name="joinDate"
                value={this.state.joinDate} onChange={this.handleChange}
                />
            </FormGroup> */}
                <AvField name="phone" label="Phone " type="tel"
        errorMessage="Invalid Phone Number. Enter 11 digits"
        value = {this.state.values.phone || ""}
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
          value = {this.state.values.address || ""}
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
    graphql(addUserMutation,{name:"addUserMutation"}),
    graphql(queryEmployeeById , {
      options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
        }
           }),
   
    graphql(updateEmployeeMutation , { name: "updateEmployeeMutation" }),

    )(AddEmployee);