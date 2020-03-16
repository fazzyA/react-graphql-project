import Page from 'components/Page';
import React from 'react';
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
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {queryEveryCustomer} from '../../graphql/queries'
import {queryEveryEmployee} from '../../graphql/queries'
import {addTicketMutation} from '../../graphql/mutations'

class AddTicket extends React.Component {

    constructor(props){
      super(props);
      this.state = { 
        customerId:'',
        category:'',
        assignTo:'',
        description:'',
        comment:'',
        dateCallReceived:'',
        createdAt:'',
        status:''
      };
      
    }
    displayCustomers = () => {
      // var {data} = this.props ;

      //console.log("customer=",this.props)
    //   if(data.loading){
    //     return( <div>Loading tickets...</div> );
    // } else {

// const tab = data.map((cust)=>{return <option value={cust.id}>{cust.name}</option>})
//       return tab;
    // }
   }//displaycustomer
   
   displayEmployee = () => {
    // var {data} = this.props ;

    //console.log("eeee=",this.props)
  //   if(data.loading){
  //     return( <div>Loading tickets...</div> );
  // } else {

// const tab = data.map((emp)=>{return <option value={emp.id}>{emp.name}</option>})
//       return tab;
  // }
 }//employee


    handleChange = (e) => {
  

      this.setState({
        [e.target.name]: e.target.value
      });
  //console.log(this.state)
      }
  
/////////////////////
// handleSubmit = (event, errors, values) => {
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("faiza",this.state.customerId)

        const {
      customerId ,
      assignTo,
      category,
      description ,
      comment,
      status,
      dateCallReceived,
      createdAt
        
    } = this.state;
    this.props.addTicketMutation({
        variables: {
          customerId,
          assignTo,
          category,
          description,
          comment,
          status,
          dateCallReceived,
          createdAt:''
            }
    }).then(res=>{ 
          this.props.history.push("/ticket")
    }).catch(res=>{console.log(res)}); 

  //  this.setState({errors, values});
   
  //   if(this.state.errors.length === 0){
  //   const {
  //     name ,
  //     phone,
  //     address ,
  //     area,
  //     fax 
        
  //   } = this.state.values;
  //   this.props.TicketFormMutation({
  //       variables: {
  //         name ,
  //         phone,0
  //         address ,
  //         area,
  //         fax 
            
  //       }
  //   }).then(res=>{ 
  //         this.props.history.push("/ticket")
  //   }); 
  // }
}
/////////////////////////

    render() {
      //console.log("renedr",this.props)
      return (
    <Page title="Add ticket" breadcrumbs={[{ name: 'add ticket', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>New Ticket</CardHeader>
            <CardBody>

              <Form onSubmit={this.handleSubmit}>

          {/* <form> */}
         <FormGroup>
                  <Label for="customerId">Ticket raised By</Label>
                  <Input type="select" name="customerId" onChange={this.handleChange}>
                    <option>--please select customer--</option>
                    {this.displayCustomers()}
                  </Input>
        </FormGroup>

         <FormGroup>
                  <Label for="assignTo">Assign to</Label>
                  <Input type="select" name="assignTo" onChange={this.handleChange}>
                    <option>------</option>
                    {/* {this.displayEmployee()} */}
                  </Input>
        </FormGroup>


            <FormGroup>
                <label htmlFor="category">category</label>
                <Input
                    type="text"
                    name="category" onChange={this.handleChange}
                  />

           </FormGroup>
           <FormGroup> 
                <label htmlFor="description">description</label>
                <Input type="textarea" name="description"  onChange={this.handleChange}/>
         </FormGroup>
          <FormGroup> 
                <label htmlFor="comment">comment</label>
                <Input type="textarea" name="comment" onChange={this.handleChange} />
         </FormGroup>

            <FormGroup>
                <label htmlFor="dateCallReceived">date call received</label>
                <Input
                type="date"
                name="dateCallReceived"
                value={this.state.dateCallReceived}
                onChange={this.handleChange}
                />
           </FormGroup>
            <FormGroup>
            <label htmlFor="status">Ticket Status</label>
            <Input type="select" name="status" onChange={this.handleChange}>
            <option value="">---select status ---</option>
            <option value="close">Close</option>
            <option value="pending">pending</option>
            </Input>
           </FormGroup>

            <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
          {/* </form> */}
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
    graphql(queryEveryCustomer, {name: "queryEveryCustomer"}),
    graphql(queryEveryEmployee, {name: "queryEveryEmployee"}),
    graphql(addTicketMutation , { name: "addTicketMutation" })
   )(AddTicket);