import React, { Component } from 'react';
import { Consumer } from '../../context';
import { v4 as uuidv4 } from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContacts extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }
  onChange = e => {
    this.setState({
        [e.target.name] :
        e.target.value
      
    })
  }

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    console.log(this.state);
    const { name , email, phone } = this.state;
  // Check Error
  if(name === '') {
    this.setState({
      errors:{
        name:'Name is required'
      }
    });
    return;
  }
  if(email === '') {
    this.setState({
      errors:{
        email:'Email is required'
      }
    });
    return;
  }
  if(phone === '') {
    this.setState({
      errors:{
        phone:'Phone is required'
      }
    });
    return;
  }

    const newContact = {
      name,
      email,
      phone
    };

    axios.post('https://jsonplaceholder.typicode.com/users', newContact)
    .then(res => dispatch({type: 'ADD_CONTACT', payload: newContact }));
    
    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors:{}
    });

    this.props.history.push("/");
  }
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {
          value => {
            const { dispatch } = value;
            return (
              <div className="card mb-3">
                <div className="card-header">
                  Add Contacts
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label = "Name"
                    name = "name"
                    placeholder = "Enter Name"
                    value = {name}
                    error={errors.name}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label = "Email"
                    name = "email"
                    type = 'email'
                    placeholder = "Enter Email"
                    value = {email}
                    error={errors.email}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label = "Phone"
                    name = "phone"
                    placeholder = "Enter Phone"
                    value = {phone}
                    error={errors.phone}
                    onChange={this.onChange}
                  />
                    <input type="submit" className="btn btn-light btn-block" value="Add Contact"></input>
                  </form>
                </div>
                
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}

export default AddContacts;