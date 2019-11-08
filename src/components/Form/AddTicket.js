import React from 'react';
import '../../mystyle.css';

class AddTicket extends React.Component {

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
          <div class="addform">
              <label htmlFor="customerid">Ticket raised By</label>
          <select name="customerid">
                <option value="">
                    --please select customer--
                </option>
            </select>
         </div>

        <div class="addform">
            <label>assign to</label><br />
            <select name="assignto">
                <option value="">--please select--
                </option>
            </select>
            </div>
            <div class="addform">
            <label>tech id</label><br />
            <select name="techid">
                <option value="">
                --please select--</option>
            </select>
            </div>
            <div class="addform">
                <label htmlFor="category">category</label>
                <input
                type="text"
                name="category"
                />
            </div>
           <div class="addform"> 
                <label htmlFor="description">description</label>
                <textarea name="description">
                </textarea>
          </div>
          <div class="addform"> 
                <label htmlFor="comment">comment</label>
                <textarea name="comment">
                </textarea>
          </div>

            <div class="addform"> 
                <label htmlFor="calldate">date call received</label>
                <input
                type="date"
                name="calldate"
                value={this.state.calldate}
                />
            </div>
            <div class="addform">
            <label htmlFor="status">Ticket Status</label>
            <select name="status">
            <option value="">---select status ---</option>
            <option value="close">Close</option>
            <option value="pending">pending</option>
            </select>
            </div>

            <div>
		          <input type="submit" value="Register" id="submit" />
         </div>
          </form>
   
      );
    }
   }
   export default AddTicket;