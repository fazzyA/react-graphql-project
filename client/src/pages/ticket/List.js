/* eslint-disable jsx-a11y/href-no-hash */

import Page from 'components/Page';
//import Typography from 'components/Typography';
import React, { Component } from 'react'
import {
 // Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
  //UncontrolledAlert,
} from 'reactstrap';

import {
  MdEdit,
  MdDelete,
} from 'react-icons/md';
import { getColor } from 'utils/colors';

import { Link } from 'react-router-dom';

import {queryEveryTicket} from '../../graphql/queries'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {deleteTicketMutation} from '../../graphql/mutations'
import { graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';




const tableTypes = ['responsive'];

class TicketList extends Component {

  displayTickets(){
    var {data} = this.props ;
    console.log('hell', data);

    if(data.loading){
        return( <div>Loading tickets...</div> );
    } else {
          
          const columns = [{
            dataField: 'name',
            text: 'Name',
            filter: textFilter()
          }, 
          {
            dataField: 'df1',
            isDummyField: true,
            text: 'Actions',
            formatter: (cellContent, row) => {
              return (
              <div>
              <Link to={"/ticket/update/" + row.id} style={{marginRight : 2}} className="label theme-bg text-white f-12">
              
              <MdEdit size={25} color={getColor('primary')} /> 
              
              </Link>


              <Link variant="danger" to="#" onClick={()=>{console.log(row.id); this.handleShow(row.id);}} key={row.id}
              className="label  text-danger f-12 ml-5" >
              
              
              <MdDelete size={25} color={getColor('danger')} /> 
              
              </Link>
               
              </div>
              );
            }
          },
        ];

         
          
          return <BootstrapTable keyField="id" 
          data={data.everyTicket} 
          columns={ columns } 
          pagination={ paginationFactory() }
          filter={ filterFactory() }
          className="table"
           />
    }
}


  render() {
    console.log(this.props)
  return (
    <Page title="Ticket" breadcrumbs={[{ name: 'ticket', active: true }]}>
   

        {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardHeader> <Link to="/addticket" class="btn btn-primary active">Add New</Link> </CardHeader>
              <CardBody>
                      { this.displayTickets()}
             
              
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}

    </Page>
  );
};
}
export default compose(
  graphql(queryEveryTicket),
  graphql(deleteTicketMutation  ,{ name: "deleteTicketMutation" })
        
    
)(TicketList);
