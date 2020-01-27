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


import {addCustomerMutation} from '../../graphql/mutations'



class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "",
        phone : "",
        address : "",
        area : "",
        fax : ""

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
  this.setState({errors, values});
 
  if(this.state.errors.length === 0){
  const {
    name ,
    phone,
    address ,
    area,
    fax 
      
  } = this.state.values;
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
}}



  render() {
    console.log(this.state)
    return (
    <Page title="Customer" breadcrumbs={[{ name: 'Customers', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>Add</CardHeader>
            <CardBody>
            <AvForm onSubmit={this.handleSubmit}>
       
        <AvField name="name" label="Customer Name" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a name'},
           // pattern: {value: '^[A-Za-z0-9 /b]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
            minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
            maxLength: {value: 100, errorMessage: 'Your name must be between 6 and 16 characters'}
          }} 
          onChange={this.handleChange}
          />
          
        <AvField name="phone" label="Phone " type="text"
        errorMessage="Invalid Phone Number"
       validate={{tel: true,
        required: {value: true}
        }}
        onChange={this.handleChange}
         />
        
        <AvField name="address" label="Address" type="text" errorMessage="Invalid address"
         validate={{
            required: {value: true},
            //pattern: {value: '^[A-Za-z0-9]+$'},
            minLength: {value: 6},
            maxLength: {value: 106}
          }}
          onChange={this.handleChange}
           />

          <AvField type="select" name="area" label="Select Main Area" helpMessage=""
          validate={{
        required: {value: true}
        }} 
        onChange={this.handleChange}
          >
          <option value="stockton">Stockton</option>
          <option value="scramento">Scramento</option>
          <option value="bay area">Bay Area</option>
          
        </AvField>

        <AvField name="fax" label="Fax " type="text"
        errorMessage="Invalid Fax Number"
       validate={{tel: true,
        required: {value: true}
        }}
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


)(AddCustomer)
