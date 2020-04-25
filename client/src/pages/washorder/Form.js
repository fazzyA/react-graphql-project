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
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {queryEveryCustomer, queryWashorderById} from '../../graphql/queries'
import {addWashorderMutation, updateWashorderMutation} from '../../graphql/mutations'

class AddWO extends React.Component {

    constructor(props){
      super(props);
      this.state = { 
        status:'',
        description:'',
        customerId:'',
        location:'',
        payment:'',
        customerVerification:'',
        region:'',
        comments:'',
        operation : "Add",
        values : {}
      };
      
    }

 
    componentDidMount(preprops){
      // console.log("didmount",this.props)
      if(this.props.match.params.id){
        // this.props.queryClientsById.refetch(); // >>> Refetch here!
        this.setState({operation : "Update"})
      }
      
    } 
    componentDidUpdate(prevProps) {
       console.log("props.data.washorder",this.props)
      // console.log("prev",prevProps.data)
      if( prevProps.data.washorder !== this.props.data.washorder ){
        console.log("----------------------------------")
        const {
            status,
            description,
            customerId,
            location,
            payment,
            customerVerification,
            region,
            comments
              
        } =this.props.data.washorder 
        this.setState({
          values : {
            status,
            description,
            customerId,
            location,
            payment,
            customerVerification,
            region,
            comments
            }
        })
      }
    }//didupdate    



   displayCustomers = () => {
          var { everyCustomer} = this.props.queryEveryCustomer
          // console.log(everyCustomer)
            if(everyCustomer){
          const tab = everyCustomer.map((cust)=>{return <option value={cust.id} selected={this.state.values.customerId===cust.id}>{cust.name}</option>})
                return tab;
              }
      }//displaycustomer
   


    handleChange = (e) => {
      this.setState({ 
        values : { 
        ...this.state.values,
        [e.target.name]: e.target.value
       }
      });
    
      }
  
/////////////////////
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("faiza",this.state.customerId)

        const {
            status,
            description,
            customerId,
            location,
            payment,
            customerVerification,
            region,
            comments
      
        
    } = this.state.values;

    if (this.state.operation === "Add"){
    this.props.addWashorderMutation({
        variables: {
            status,
            description,
            customerId,
            location,
            payment,
            customerVerification,
            region,
            comments
                  }
    }).then(res=>{ 
          this.props.history.push("/washorder")
    }).catch(res=>{console.log(res)}); 
  }//endif
else{
console.log('updated')
this.props.updateWashorderMutation({
  variables: {
    id : this.props.match.params.id,
    status,
    description,
    customerId,
    location,
    payment,
    customerVerification,
    region,
    comments

  }
}).then(res=>{ 
    //this.props.history.push("/washorder") 
    console.log("finally updated",res)
});     

}//else
}//handlesubmit
/////////////////////////

    render() {
      console.log("",this.props)
      return (
    <Page title="WashOrder" breadcrumbs={[{ name: this.state.operation+' washorder', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>washorders</CardHeader>
            <CardBody>

            <AvForm onSubmit={this.handleSubmit}>

          <AvField name="description" label="description" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a description'}
           // pattern: {value: '^[A-Za-z0-9 /b]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
          }} 
          value = {this.state.values.description || ""}
          onChange={this.handleChange}
          />

          <AvField 
          type="select" 
          name="status" 
          id="status" 
          label="status" 
          validate={{
          required: {value: true}
          }}           
          onChange={this.handleChange}
          >
          <option >Select</option>
          <option value="pending" selected>pending</option>
          <option value="completed" selected={this.state.values.department=='completed'} >completed</option>
          <option value="cancelled" selected={this.state.values.department=='cancelled'}>cancelled</option>
           
        </AvField>

        <AvField 
        type="select" 
        name="customerId" 
        id="customerId" 
        label="customerId" 
        validate={{
        required: {value: true}
        }}           
        onChange={this.handleChange}
        >
        <option >Select</option>
        {this.displayCustomers()}         
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
    graphql(queryEveryCustomer, {name: "queryEveryCustomer"}),
    graphql(addWashorderMutation , { name: "addWashorderMutation" }),
    graphql(queryWashorderById , {
      options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
        }
           }),
    
    graphql(updateWashorderMutation , { name: "updateWashorderMutation" })
   )(AddWO);