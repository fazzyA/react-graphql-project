/* eslint-disable jsx-a11y/href-no-hash */

import Page from 'components/Page';
//import Typography from 'components/Typography';
import React from 'react';
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
import { Link } from 'react-router-dom';
import { queryEveryCustomer } from '../graphql/queries';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {deleteCustomerMutation} from '../graphql/mutations'

const tableTypes = ['responsive'];



const CustomerPage = () => {
  return (
    <Page title="Customers" breadcrumbs={[{ name: 'customers', active: true }]}>
   

        {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardHeader> <Link to="/addcustomer" class="btn btn-primary active">Add New</Link> </CardHeader>
              <CardBody>
                <Row> 
                  <Col>
                    <Card body>
                      <Table {...{ [tableType || 'default']: true }}>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                          </tr>
           
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}

    </Page>
  );
};

export default CustomerPage;
