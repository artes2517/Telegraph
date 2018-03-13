import React, { Component } from 'react'
import { Container, Button, Badge } from 'reactstrap';
import './NewStory.css'
import { withRouter } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';

class NewStory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputForm />
    );
  }
}

export default withRouter(NewStory);