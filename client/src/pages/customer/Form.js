import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {addCustomerMutation, updateCustomerMutation} from '../../graphql/mutations'
import { queryCustomerById } from '../../graphql/queries';




class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "",
        phone : "",
        address : "",
        area : "",
        fax : "",
        operation : "Add",
        values : {}

    };

}

componentDidMount(preprops){
  console.log(this.props.match.params.id)
  if(this.props.match.params.id){
    // this.props.queryClientsById.refetch(); // >>> Refetch here!
    this.setState({operation : "Update"})
  }
  
}

componentDidUpdate(prevProps) {
  console.log(this.props.data.customer )
  console.log(prevProps)
  if( prevProps.data.customer !== this.props.data.customer ){
    console.log("----------------------------------")
    const {
      name ,
      phone,
      address ,
      area,
      fax 
        
    } =this.props.data.customer 
    this.setState({
      values : {
        name ,
        phone,
        address ,
        area,
        fax 
          
      }
    })
  }
  
//   if (this.props.clients !== prevProps.refetchId) {
// // //console.log("load")
//       this.props.queryClientsById.refetch(); // >>> Refetch here!

// //            //console.log(this.state)
//   }

// //         //console.log(this.state)
// // //console.log(this.props)

// // //console.log(this.state)
// if (!this.props.data.loading){
// if(this.props.data.everyClients){
// //console.log("the data not loaded")
// }
// this.populateState();    
}


handleChange = (e) => {
  // console.log(e.target.value)
  // console.log(e.target.id)
  
  this.setState({ 
    
    values : { 
    ...this.state.values,
    [e.target.id]: e.target.value
   }
    
  });
  
  console.log(this.state)
}

handleSubmit = (event, errors, values) => {
  event.preventDefault();
  
  this.setState({errors, values});
 console.log(values)
  if(this.state.errors.length === 0){
  const {
    name ,
    phone,
    address ,
    area,
    fax 
      
  } = this.state.values;

  if (this.state.operation === "Add")
      this.props.addCustomerMutation({
          variables: {
            name ,
            phone,
            address ,
            area,
            fax 
              
          }
      }).then(res=>{ 
            this.props.history.push("/customer") 
      });
  else
  this.props.updateCustomerMutation({
    variables: {
      id : this.props.match.params.id,
      name ,
      phone,
      address ,
      area,
      fax 
        
    }
}).then(res=>{ 
      this.props.history.push("/customer") 
});     

}

}



  render() {
    console.log(this.state)

    return (
    <Page title="Customer" breadcrumbs={[{ name: 'Customers', active: false, link : "/customer" },
    {name: this.state.operation , active: true,}  
    ]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>{this.state.operation}</CardHeader>
            <CardBody>
            <AvForm onSubmit={this.handleSubmit}>
       
        <AvField name="name" label="Customer Name" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a name'},
           // pattern: {value: '^[A-Za-z0-9 /b]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
            minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
            maxLength: {value: 100, errorMessage: 'Your name must be between 6 and 16 characters'}
          }} 
          value = {this.state.values.name || ""}
          onChange={this.handleChange}
          />
          
        <AvField name="phone" label="Phone " type="text"
        errorMessage="Invalid Phone Number ( must be 11 digits only )"
       validate={{tel: true,
        required: {value: true}
        }}
        value = {this.state.values.phone || ""}
     
        onChange={this.handleChange}
         />
        
        <AvField name="address" label="Address" type="text" errorMessage="Invalid address"
         validate={{
            required: {value: true},
            //pattern: {value: '^[A-Za-z0-9]+$'},
            minLength: {value: 6},
            maxLength: {value: 106}
          }}
          value = {this.state.values.address || ""}
     
          onChange={this.handleChange}
           />

          <AvField 
          type="select" 
          name="area" 
          label="Select Main Area" 
          validate={{
          required: {value: true}
          }} 
          
          onChange={this.handleChange}
          >
          <option value="stockton" >Stockton</option>
          <option value="scramento" >Scramento</option>
          <option value="bayarea">Bay Area</option>
          
        </AvField>

        <AvField name="fax" label="Fax " type="text"
        errorMessage="Invalid Fax Number"
        validate={{tel: true,
        required: {value: true}
        }}
        value = {this.state.values.fax || ""}
        onChange={this.handleChange}
         />

        <Button color="primary">Submit</Button>
      </AvForm>
      
                  </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};
}
 export default compose(

  graphql(addCustomerMutation , { name: "addCustomerMutation" }),
  graphql(queryCustomerById , {
  options: (props) => {
    return {
        variables: {
            id: props.match.params.id
        }
    }
    }
       }),
    graphql(updateCustomerMutation , { name: "updateCustomerMutation" }),

)(CustomerForm)
