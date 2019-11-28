import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

//import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
         &copy; BMCS 2019
          {/* <SourceLink>Github</SourceLink> */}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
