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
// var images = require.context('./uploads/', true);

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
        const nowDate = Date.now();
       // const filenamehere = e.target.files[0].name+nowDate

        this.setState({
          values : { 
            ...this.state.values,
            picture:e.target.files[0].name,
            fileEmp:e.target.files[0]
           }

          })


      } else{
      this.setState({
        values : { 
          ...this.state.values,
          [e.target.name]: e.target.value
         }
            });

          }//else
    }

    handleSubmit = (event, errors, values) => {
      event.preventDefault();
      const formData = new FormData();
        formData.append('file',this.state.values.fileEmp);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            } 
        };
        axios.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
                const { fileName, filePath } = response.data;
            }).catch((error) => { console.log('...........',error)
        });
    // this.setState({errors, values});
    //  console.log("i am in handlesubmit",this.state)
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
      // console.log("const picture",picture)
      // console.log("state value =",this.state.values.picture)

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
         console.log(res,"updated");// this.props.history.push("/employee") 
    }).catch(res=>console.log(res));     
          }

// }  //if
  }//handle submit
    


    render() {
    //   console.log(this.props)
    const imagePath = '../../uploads/'+this.state.values.picture;
          console.log(imagePath,'image path')

      return (
    <Page title="Employeeee" breadcrumbs={[{ name: 'Employee', active: false, link : "/employee" },
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
{/* ////////////if add form show email field else not show it/// */}

          {this.state.values.operation==='Add'?
          <AvField name="email" label="Email" type="email" 
          value = {this.state.values.email || ""}
          onChange={this.handleChange}/>
          : null}

       
            </fieldset>
            <input type="file" name="picture" id="picture" onChange= {this.handleChange} />
            <div><img src={imagePath} width='100px' height='100px'></img></div>

<AvRadioGroup name="gender" id='gender' label="Gender"  errorMessage="Pick one!">
  {this.state.values.gender}

          <AvRadio name="gender" label="Male" value="Male" onChange={this.handleChange}  />
          <AvRadio name="gender" label="Female" value="Female" checked={this.state.values.gender==="Female"} onChange={this.handleChange}/>
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

           {this.state.values.department}
          <AvField 
          type="select" 
          name="department" 
          id="department" 
          label="Department" 
          validate={{
          required: {value: true}
          }} 
          
          onChange={this.handleChange}
          >
          <option >Select</option>
          <option value="sales" selected>Sales</option>
          <option value="administration" selected={this.state.values.department=='administration'} >Administration</option>
          <option value="technical" selected={this.state.values.department=='technical'}>Technical</option>
           
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