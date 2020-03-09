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
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

// import {queryEveryEmployee} from '../../graphql/queries'
// import {queryEveryCustomer} from '../../graphql/queries'
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
   

    handleChange = (e) => {
  

      this.setState({
        [e.target.name]: e.target.value
      });
      this.setState({
        createdAt: ''
      });
  //console.log(this.state)
      }
  
/////////////////////
// handleSubmit = (event, errors, values) => {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)

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
          description ,
          comment,
          status,
          dateCallReceived,
          createdAt
            }
    }).then(res=>{ 
          this.props.history.push("/ticket")
    }); 

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
                  <Label for="customerId">Ticket raised By</Label>
                  <Input type="select" name="customerId" onChange={this.handleChange}>
                    <option>--please select customer--</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
        </FormGroup>

         <FormGroup>
                  <Label for="assignTo">Assign to</Label>
                  <Input type="select" name="assignTo" onChange={this.handleChange}>
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
    graphql(addTicketMutation , { name: "addTicketMutation" }),

   )(AddTicket);