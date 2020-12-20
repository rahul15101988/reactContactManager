import React, { Component } from "react";
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = (id, dispatch) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res => dispatch({type: 'DELETE_CONTACT', payload: id})));
  }
  render() {
    const { id, name, email, phone } = this.props.contacts;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {
          value => {
            const { dispatch } = value;
            return (
              <div className="card card-body mb-3">
              <h4>
                <span 
                  onClick={
                    () => {
                      this.setState({
                        showContactInfo: !showContactInfo,
                      });
                    }
                  }
                  style={{ cursor: "pointer" }}>
                    {name} 
                    <i className="fas fa-sort-down"></i>
                </span>
                <span 
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}>
                    <i className="fas fa-times"></i>
                </span>
                <Link to={`contact/edit/${id}`}>
                <i className="fas fa-pencil-alt"
                style ={{
                  cursor: "pointer",
                  float: "right",
                  color: "black",
                  marginRight: "1rem"
                }}></i>
                </Link>
              </h4>
              {showContactInfo ? (
              <ul className="list-group">
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{phone}</li>
              </ul>
              ) : null}
          </div>
            )
            
          }
        }
      </Consumer>
      
    );
  }
}

export default Contact;
