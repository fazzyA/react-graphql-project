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
import {queryTicketById} from '../../graphql/queries'
import {addTicketMutation, updateTicketMutation} from '../../graphql/mutations'

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
        status:'',
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
       console.log("props.data.ticket",this.props)
      // console.log("prev",prevProps.data)
      if( prevProps.data.ticket !== this.props.data.ticket ){
        console.log("----------------------------------")
        const {
          customerId,
          category,
          assignTo,
          description,
          comment,
          dateCallReceived,
          createdAt,
          status
              
        } =this.props.data.ticket 
        this.setState({
          values : {
            customerId,
            category,
            assignTo,
            description,
            comment,
            dateCallReceived,
            createdAt,
            status
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
   
   displayEmployee = () => {
        var {everyEmployee} = this.props.queryEveryEmployee
       if(everyEmployee){
        const tab = everyEmployee.map((emp)=>{return <option value={emp.id} selected={this.state.values.assignTo===emp.id}>{emp.name}</option>})
         return tab;
}
 }//employee


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
      customerId ,
      assignTo,
      category,
      description ,
      comment,
      status,
      dateCallReceived,
      
        
    } = this.state.values;

    if (this.state.operation === "Add"){
    this.props.addTicketMutation({
        variables: {
          customerId,
          assignTo,
          category,
          description,
          comment,
          createdAt:Date.now().toString(),
          dateCallReceived,
          status,
            }
    }).then(res=>{ 
          this.props.history.push("/ticket")
    }).catch(res=>{console.log(res)}); 
  }//endif
else{
console.log('updated')
this.props.updateTicketMutation({
  variables: {
    id : this.props.match.params.id,
    customerId,
    assignTo,
    category,
    description,
    comment,
    dateCallReceived,
    status,

  }
}).then(res=>{ 
    //this.props.history.push("/ticket") 
    console.log("finally updated",res)
});     

}//else
}//handlesubmit
/////////////////////////

    render() {
      console.log("renedr",this.props)
      return (
    <Page title="Ticket" breadcrumbs={[{ name: this.state.operation+' ticket', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardBody>
            <CardHeader>Tickets</CardHeader>
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
                    {this.displayEmployee()}
                  </Input>
        </FormGroup>


            <FormGroup>
                <label htmlFor="category">category</label>
                <Input
                    type="text"
                    name="category" onChange={this.handleChange}
                    value = {this.state.values.category || ""}

                  />

           </FormGroup>
           <FormGroup> 
                <label htmlFor="description">description</label>
                <Input type="textarea" name="description"  onChange={this.handleChange}
                value = {this.state.values.description || ""}
                />
         </FormGroup>
          <FormGroup> 
                <label htmlFor="comment">comment</label>
                <Input type="textarea" name="comment" onChange={this.handleChange} value = {this.state.values.comment || ""} />
         </FormGroup>

            <FormGroup>
                <label htmlFor="dateCallReceived">date call received (mm/dd/yyyy)</label>
                <Input
                type="text"
                name="dateCallReceived"
                value={this.state.dateCallReceived}
                onChange={this.handleChange}
                />
           </FormGroup>
            <FormGroup>
            <label htmlFor="status">Ticket Status</label>
            <Input type="select" name="status" onChange={this.handleChange}>
            <option value="">---select status ---</option>
            <option value="close" selected={this.state.values.status==='close'}>Close</option>
            <option value="pending" selected={this.state.values.status==='pending'}>pending</option>
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
    graphql(addTicketMutation , { name: "addTicketMutation" }),
    graphql(queryTicketById , {
      options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
        }
           }),
    
    graphql(updateTicketMutation , { name: "updateTicketMutation" })
   )(AddTicket);