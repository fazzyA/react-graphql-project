import React from 'react';
import PropTypes from 'utils/propTypes';

import bn from 'utils/bemnames';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Typography from './Typography';

import { graphql, renderToStringWithData} from 'react-apollo';
import {flowRight as compose} from 'lodash';
// import {transactionType} from "../../constants"
import { withRouter } from 'react-router-dom';

// import { 
//     signIn ,
    
    
//  } from '../graphql/mutations/signIn';
 import { queryCurrentUser } from '../graphql/queries'
import { Redirect } from 'react-router';

import { AuthContext } from '../store/authcontext';




const bem = bn.create('page');



class Page extends React.Component {
  state = {
      logged : false,
      
  }
  static contextType = AuthContext;
  
  componentDidMount=async () =>{
    
    const { isLogin, currentUser, login } = this.context;
    // console.log(localStorage.token)
    
            
        if (this.state.logged === false && isLogin == false )
            {
                if(localStorage.token != null)
                    {
                      let res= await this.props.queryCurrentUser.refetch();
                            // console.log(this.props.queryCurrentUser.currentUser);
                            // console.log(res.data.currentUser)
                            if(res.data.currentUser){ // check if token expired
                           await login(this.props.queryCurrentUser.currentUser)
                            // this.props.history.push("/admin/dashboard");
                           
                            this.setState(prevState => {
                                return{
                                    logged : true
                                }
                                });
                            }
                            else
                            {
                                localStorage.removeItem('token')
                                //this.props.history.push("/auth/signin") 
                            }
                
                       
                    
                }
                else{
                     console.log("------------------no token found-------------")
                     
                     console.log(this.props)
                     if(this.props.queryCurrentUser.loading === false 
                        && this.props.queryCurrentUser.currentUser === null
                       && this.props.location.pathname !== "/login"
                        )
                        this.props.history.push("/login")
                    }
        
        
                
            }
  }

  componentDidUpdate(preprops){
    const { isLogin, currentUser, login } = this.context;
    console.log(this.props)
    if(!isLogin && this.props.queryCurrentUser.loading === false
                              && this.props.queryCurrentUser.currentUser === null
      )
    this.props.history.push("/login")
  }

render(){
  
  const {
    title,
    breadcrumbs,
    tag: Tag,
    className,
    children,
    ...restProps
  } = this.props;

  const classes = bem.b('px-3', className);
  const { isLogin } = this.context;
  console.log(isLogin)

  // if (this.state.logged ) {
  //   console.log("#############inside############")
  
  //  return <Redirect to="/login" />;
  // }
  return (
    <Tag className={classes} {...restProps} >
      <div className={bem.e('header')}>
        {title && typeof title === 'string' ? (
          <Typography type="h1" className={bem.e('title')}>
            {title}
          </Typography>
        ) : (
            title  
          )}
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map(({ name, active }, index) => (
                <BreadcrumbItem key={index} active={active}>
                  {name}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}
      </div>
      {children}
    </Tag>
  );
}
}

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
}

Page.defaultProps = {
  tag: 'div',
  title: '',
}

export default withRouter(compose(
   graphql(queryCurrentUser,{name: "queryCurrentUser"})
)(Page));
