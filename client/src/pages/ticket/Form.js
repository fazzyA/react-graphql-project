import React from 'react';
import Page from '../../components/Page';
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

import {queryEveryEmployee} from '../../graphql/queries'
import {queryEveryCustomer} from '../../graphql/queries'
import {addTicketMutation} from '../../graphql/mutations'

class AddTicket extends React.Component {

    constructor(props){
      super(props);
      this.state = { username: '' };
      this.state = { name: '' };
      this.state = { jt: '' };
    }
   

    handleChange = (e) => {
  

        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(this.state)
      }
  
/////////////////////
// handleSubmit = (event, errors, values) => {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('this.state')
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
  //         phone,
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
      return (
    <Page title="Add tickets" breadcrumbs={[{ name: 'add tickets', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>New Ticket</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>

          {/* <form> */}
         <FormGroup>
                  <Label for="customerid">Ticket raised By</Label>
                  <Input type="select" name="customerid">
                    <option>--please select customer--</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
        </FormGroup>

         <FormGroup>
                  <Label for="assignto">Assign to</Label>
                  <Input type="select" name="assignto">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
        </FormGroup>


            <FormGroup>
                <label htmlFor="category">category</label>
                <Input
                    value=""
                    name="category"
                  />

           </FormGroup>
           <FormGroup> 
                <label htmlFor="description">description</label>
                <Input type="textarea" name="text" />
         </FormGroup>
          <FormGroup> 
                <label htmlFor="comment">comment</label>
                <Input type="textarea" name="text" />
         </FormGroup>

            <FormGroup>
                <label htmlFor="dateCallReceived">date call received</label>
                <Input
                type="date"
                name="dateCallReceived"
                value={this.state.dateCallReceived}
                />
           </FormGroup>
            <FormGroup>
            <label htmlFor="status">Ticket Status</label>
            <Input type="select" name="status">
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
    graphql(addTicketMutation , { name: "addTicketMutation" }),

   )(AddTicket);