import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLogin : false,
    currentUser: "",
    
  }
  login= (cuser) => {
    this.setState({ isLogin : true, currentUser: cuser });
    localStorage.setItem("uid",cuser.id)
  }

  logout= () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    this.setState({ isLogin : false, currentUser: "" });
    console.log("#############################logout##################")
  }

  checklogin=()=> {
    
  } 
  render() { 
    return (
      <AuthContext.Provider value={{...this.state, login : this.login, logout : this.logout}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;