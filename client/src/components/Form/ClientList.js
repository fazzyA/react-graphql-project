import React from 'react';
// import '../../mystyle.css';
import { queryEveryUser } from '../../graphql/queries';

import { graphql } from 'react-apollo';
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

class ClientList extends React.Component {
     
  constructor( props ){
    super( props );
  }

    displayClients(){
        //console.log(this.props.data)
         var data = this.props.data;
        if(data.loading){
            return( <div>Loading clients...</div> );
        } 
        else {
            return data.everyUser.map(client => {
                return(
                    <li key={ client.id }>Email = { client.email} <br></br>Role = {client.role }</li>
                );
            })
        }
    }   
   
    render() {
        //console.log(this.props);
      return (
          <div>
              <h1>ClientList</h1>
              <h5>Email / Role</h5>
              <ul>
                  {this.displayClients()}
              </ul>
          </div>
   
      );
    }
   }
   export default graphql(queryEveryUser)(ClientList);