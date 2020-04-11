import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardDelete = ({item, deleteCard}) => {
  // const {item delete} = props;
  return (
    <div>
      <Card>
        {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
        <CardBody>
          <CardTitle><h3>{item.name}</h3></CardTitle>
          <CardSubtitle><b>Service Hours</b>: {item.serviceHours}</CardSubtitle>
          {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
          <Button onClick={()=>{deleteCard(item.id)}}>Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardDelete;