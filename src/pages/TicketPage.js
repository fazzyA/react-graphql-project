/* eslint-disable jsx-a11y/href-no-hash */

import Page from 'components/Page';
import Typography from 'components/Typography';
import React from 'react';
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledAlert,
} from 'reactstrap';

const tableTypes = ['responsive'];

const TicketPage = () => {
  return (
    <Page title="Tickets" breadcrumbs={[{ name: 'tickets', active: true }]}>
      
        {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardHeader>{tableType || 'default'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table {...{ [tableType || 'default']: true }}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Ticket Subject</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Ticket By</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
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

      <Row>
        <Col>
          <Card>
            <CardHeader>Some Content</CardHeader>
            <CardBody>
              <Alert color="success">
                <Typography type="h4" className="alert-heading">
                  Well done!
                </Typography>
                <Typography>
                  Aww yeah, you successfully read this important alert message.
                  This example text is going to run a bit longer so that you can
                  see how spacing within an alert works with this kind of
                  content.
                </Typography>
                <hr />
                <Typography className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep
                  things nice and tidy.
                </Typography>
              </Alert>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default TicketPage;
