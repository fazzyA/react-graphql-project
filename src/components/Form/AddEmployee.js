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


class AddEmployee extends React.Component {

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
    <Page title="Add Employee" breadcrumbs={[{ name: 'add employee', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>New Ticket</CardHeader>
            <CardBody>
              <Form>
          <fieldset>
            <legend>Login Details</legend>
         <FormGroup><label htmlFor="username">username</label>
            <Input
              type="text"
              name="username"
              value={this.state.username}
             // onChange={this.handleChange}
            /></FormGroup>
           <FormGroup>
                <label htmlFor="email">Email</label>
                <Input
                type="text"
                name="email"
                />
            </FormGroup>
            </fieldset>

           <FormGroup>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
             // onChange={this.handleChange}
            />
            </FormGroup>

            <FormGroup check>
              
                      <Label check>
                        <Input type="radio" name="gender" /> Male
                      </Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="gender" /> Female
                      </Label>
                    </FormGroup>

<hr></hr>
            <FormGroup>
                <label htmlFor="jt">Rate per hour</label>
                <Input
                type="text"
                name="hrrate"
                value={this.state.hrrate}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="joindate">Join date</label>
                <Input
                type="text"
                name="joindate"
                value={this.state.joindate}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="phone">Phone</label>
                <Input
                type="text"
                name="phone"
                value={this.state.phone}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="address">Address</label>
                <Input
                type="text"
                name="address"
                value={this.state.address}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="badge">Badge</label>
                <Input
                type="text"
                name="badge"
                value={this.state.badge}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="pin">Pin</label>
                <Input
                type="text"
                name="pin"
                value={this.state.pin}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="department">department</label>
                <Input
                type="text"
                name="department"
                value={this.state.department}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="picture">Picture</label>
                <Input
                type="file"
                name="pic"
                />
            </FormGroup>
            <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
                </Form>
          </CardBody>
          </Card>
          </Col>
          </Row>
          </Page>
   
      );
    }
   }
   export default AddEmployee;