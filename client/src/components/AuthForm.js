import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput , AvFeedback} from 'availity-reactstrap-validation';


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        email: "",
        password: "",
        isValid : true,
        vmessage : ""

    };

}

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    const {email, password}=this.state;
    this.setState({errors, values});
        // console.log(this.state)
  
    if(this.state.errors.length === 0)
    this.props.onSubmitForm({ email, password})
  };

  handleChange = (e) => {
       this.setState({
            [e.target.name]: e.target.value
        });

        // console.log(this.state)
}


  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    // console.log(this.state)
    return (
      <AvForm onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            /> BMCS
          </div>
        )} 
        <AvGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <AvInput {...usernameInputProps}  required onChange={this.handleChange}  />
          <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          
        </AvGroup>
        <AvGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <AvInput {...passwordInputProps} required   onChange={this.handleChange} />
          <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
        </AvGroup>
        {this.isSignup && (
          <AvGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </AvGroup>
        )}
        <AvGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </AvGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          type="submit"
         // onClick={this.handleSubmit}
         >
          {this.renderButtonText()}
        </Button>


        {children}
      </AvForm>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
    name : "email"
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
    name: "password"
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
