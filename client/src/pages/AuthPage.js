import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Redirect } from 'react-router';
import { Card, Col, Row } from 'reactstrap';
import { graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { 
    signIn ,
    
    
 } from '../graphql/mutations';
import { AuthContext } from '../store/authcontext';
import { queryCurrentUser } from '../graphql/queries'

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      logedIn : false
    }
  }


  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  static contextType = AuthContext;
  handleSubmit=(user) => {
    console.log(user)
    const { login } = this.context;
        
                this.props.signIn({
                    variables: {
                        email: user.email,
                        password: user.password,
                        
                    },
                    // refetchQueries: [{ query: queryCurrentUser }]
                }).then(res=>{ 
                    // console.log(res.data.signIn.token)
                localStorage.setItem("token", res.data.signIn.token);
                this.props.queryCurrentUser.refetch().then(async (res)=>{
                  login(this.props.queryCurrentUser.currentUser)
                  this.setState({logedIn : true})
              });
              
                }).catch(e => {
                    // toast.error(e.message.replace("GraphQL error:", ""), {
                    //     position: toast.POSITION.TOP_LEFT
                    //   });
                    console.log(e)
                }); 
                    // this.setState({
                    //     userId: data.addUsers.id
                    //   });
    
  }

  render() {
    if (this.state.logedIn ) {
      console.log("#############inside############")
     return <Redirect to="/" />;
    }

    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor : 'gray'
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
              onSubmitForm={this.handleSubmit}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default compose(
  graphql(signIn,{name : "signIn"}),
  graphql(queryCurrentUser,{name: "queryCurrentUser"})
)(AuthPage);
