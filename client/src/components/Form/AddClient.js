import React from 'react';
// import '../../mystyle.css';
import { graphql } from 'react-apollo';
import { queryEveryUser } from '../../graphql/queries';
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

class AddClient extends React.Component {

    constructor(props){
      super(props);
      this.state = { username: '' };
      this.state = { name: '' };
      this.state = { jt: '' };
      //this.state = { username: '' };
    }
   
    handleSubmit = event => {

        
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
      }
   
    render() {
      return (
    <Page title="Add client" breadcrumbs={[{ name: 'add client', active: true }]}>
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            <CardHeader>New Client</CardHeader>
            <CardBody>
              <Form>

          {/* <form> */}


            <FormGroup>
                <label htmlFor="usrName">User Name</label>
                <Input value="" name="usrName" />

           </FormGroup>
           <FormGroup> 
                <label htmlFor="email">email</label>
                <Input  value="" name="email" />
         </FormGroup>

         <FormGroup> 
                <label htmlFor="password">Password</label>
                <Input  value="" name="password" />
         </FormGroup>

            {/* <FormGroup>
            <label htmlFor="status">Client Status</label>
            <Input type="select" name="status">
            <option value="">---select status ---</option>
            <option value="close">Close</option>
            <option value="pending">pending</option>
            </Input>
           </FormGroup>
 */}
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
   export default AddClient;