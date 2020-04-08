import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Typeahead} from 'react-bootstrap-typeahead';

import { queryEveryCustomer } from '../graphql/queries';


  ///fake data generator/////////////////////////
  const getItems = count =>{
    //console.log(this.state)
    return Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }))};
  
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  
  return result;
  };
  
  const grid = 8;
  
  const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  
  // change background colour if dragging
  background: isDragging ? '#7E61AA' : '#C589B1',
  
  // styles we need to apply on draggables
  ...draggableStyle,
  });
  
  const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
  });
  //   var {data} = this.props;
  
  //   if(!(data.loading)){
                  
  //         const mydata = this.props.data.everyCustomer
  //         console.log(typeof(data.everyCustomer))
  // }
  
//----------------------------------------------------------------------------------
class Routes extends React.Component {
//   const [activeTab, setActiveTab] = useState('1');

//   const toggle = tab => {
//     if(activeTab !== tab) setActiveTab(tab);
//   }

constructor(props){
  super(props)
  this.state = {
    // items: getItems(6),
    items: [],
    selected: []
  };
  this.onDragEnd = this.onDragEnd.bind(this);
}//constructor

onDragEnd(result) {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const items = reorder(
    this.state.items,
    result.source.index,
    result.destination.index
  );

  this.setState({
    ...this.state,items,
  });
}


render(){
  // mydata = this.props.data.everyCustomer

  console.log(this.props.data.everyCustomer)
  return (
    <div>
     {/* { this.displayClients()} */}
      <hr></hr>
      <Typeahead
      id="typeahead1" 
      labelKey='name'
      multiple='true'
  onChange={(selected) => {
    this.setState({...this.state,selected});
    this.setState({...this.state,
      items:[...this.state.items, selected]});
    console.log('items',this.state.items)
  }}  
  options={this.props.data.everyCustomer}
   selected={this.state.selected}
   placeholder="Choose a customer..."
/>

      <br></br><br></br><DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <Nav tabs vertical>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Moar Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} vertical>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent> */}
    </div>
  );
    }
}

export default compose(
  graphql(queryEveryCustomer)    
    )(Routes);