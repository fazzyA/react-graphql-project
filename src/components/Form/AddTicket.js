import React from 'react';
import '../../mystyle.css';
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

class AddTicket extends React.Component {

    constructor(props){
      super(props);
      this.state = { username: '' };
      this.state = { name: '' };
      this.state = { jt: '' };
      //this.state = { username: '' };
    }
   
    // handleChange = event => {
    //   this.setState({ username: event.target.value });
    // };
   
    render() {
      return (
    <Page title="Add tickets" breadcrumbs={[{ name: 'add tickets', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Input Types</CardHeader>
            <CardBody>
              <Form>

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
            <label>tech id</label><br />
            <select name="techid">
                <option value="">
                --please select--</option>
            </select>
           </FormGroup>
            <FormGroup>
                <label htmlFor="category">category</label>
                <input
                type="text"
                name="category"
                />
           </FormGroup>
           <FormGroup> 
                <label htmlFor="description">description</label>
                <textarea name="description">
                </textarea>
         </FormGroup>
          <FormGroup> 
                <label htmlFor="comment">comment</label>
                <textarea name="comment">
                </textarea>
         </FormGroup>

            <FormGroup>
                <label htmlFor="calldate">date call received</label>
                <input
                type="date"
                name="calldate"
                value={this.state.calldate}
                />
           </FormGroup>
            <FormGroup>
            <label htmlFor="status">Ticket Status</label>
            <select name="status">
            <option value="">---select status ---</option>
            <option value="close">Close</option>
            <option value="pending">pending</option>
            </select>
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
   export default AddTicket;