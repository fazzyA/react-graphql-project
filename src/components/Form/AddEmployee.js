import React from 'react';
import '../../mystyle.css';

class AddEmployee extends React.Component {

    constructor(props){
      super(props);
      this.state = { username: '' };
      this.state = { name: '' };
      this.state = { jt: '' };
      //this.state = { username: '' };
    }
   
    // handleChange = event => {
    //   this.setState({ username: event.target.value });
    // };
   
    render() {
      return (
          <form>
          <fieldset>
            <legend>Login Details</legend>
          <div class="addform"><label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
             // onChange={this.handleChange}
            /></div>
            <div class="addform">
                <label htmlFor="email">Email</label>
                <input
                type="text"
                name="email"
                />
            </div>
            </fieldset>

            <div class="addform">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
             // onChange={this.handleChange}
            />
            </div>
            <div class="addform"> 
                <label htmlFor="gender">gender</label>
                <span class="">Gender:</span>
                <input type="radio" name="gender" id="male"
                  value="M" />
                <label for="male">Male</label>
                <input type="radio" name="gender" id="female"
                  value="F" />
                <label for="female">Female</label>            </div>

            <div class="addform"> 
                <label htmlFor="jt">rate per hour</label>
                <input
                type="text"
                name="hrrate"
                value={this.state.hrrate}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="joindate">Join date</label>
                <input
                type="text"
                name="joindate"
                value={this.state.joindate}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="phone">Phone</label>
                <input
                type="text"
                name="phone"
                value={this.state.phone}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="address">Address</label>
                <input
                type="text"
                name="address"
                value={this.state.address}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="badge">Badge</label>
                <input
                type="text"
                name="badge"
                value={this.state.badge}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="pin">Pin</label>
                <input
                type="text"
                name="pin"
                value={this.state.pin}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="department">department</label>
                <input
                type="text"
                name="department"
                value={this.state.department}
                />
            </div>
            <div class="addform"> 
                <label htmlFor="picture">Picture</label>
                <input
                type="file"
                name="pic"
                />
            </div>
            <div>
		          <input type="submit" value="Register" id="submit" />
         </div>
          </form>
   
      );
    }
   }
   export default AddEmployee;