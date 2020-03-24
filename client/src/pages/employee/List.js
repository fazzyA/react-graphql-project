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
import { queryEveryEmployee} from '../../graphql/queries';


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {deleteEmployeeMutation} from '../../graphql/mutations'
import { graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import DeleteButton from '../../components/DeleteButton'




const tableTypes = ['responsive'];

class EmployeeList extends Component {


  displayEmployees(){
    var {data} = this.props ;
  console.log("displayfunction",this.props)
    if(data.loading){
        return( <div>Loading employees...</div> );
    } else {

      console.log("displayfunction==else==",data.everyEmployee)
 
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
              <Link to={"/employee/update/" + row.id} style={{marginRight : 2}} className="label theme-bg text-white f-12">
              
              <MdEdit size={25} color={getColor('primary')} /> 
              
              </Link>


              <DeleteButton handleDelete={this.handleDelete} deleteRec={row.id} />

              </div>
              );
            }
          },
        ];

         
          
          return <BootstrapTable keyField="id" 
          data={data.everyEmployee} 
          columns={ columns } 
          pagination={ paginationFactory() }
          filter={ filterFactory() }
          className="table"
           />
    }
}

handleDelete=(id=null)=>{
  if (id)
  {
     this.props.deleteEmployee({
      variables: {
          id
          
      },
    refetchQueries: [{ query: queryEveryEmployee }]
    });
    //put here a notification similar to the home page.
}
}



  render() {
    console.log(this.props)
  return (
    <Page title="Employee" breadcrumbs={[{ name: 'employee', active: true }]}>
   

        {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardHeader> <Link to="/addemployee" class="btn btn-primary active">Add New</Link> </CardHeader>
              <CardBody>
                      { this.displayEmployees()}
             
              
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
  graphql(queryEveryEmployee,
  {
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(deleteEmployeeMutation  ,{ name: "deleteEmployee" })
    
)(EmployeeList);
