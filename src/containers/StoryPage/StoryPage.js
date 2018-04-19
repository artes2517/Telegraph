import React, { Component } from 'react'
import { Container, Badge } from 'reactstrap'
import './StoryPage.css'
import { withRouter } from 'react-router-dom'
import InputForm from '../../components/InputForm/InputForm'


class StoryPage extends Component {
  constructor(props) {
    super(props)
    this.storyId = this.props.location.pathname.substring(1)
    this.storyList = (localStorage.storyList === undefined) ? new Map() : new Map(JSON.parse(localStorage.storyList))
    this.story = this.storyList.get(this.storyId)
  }

  render() {
    if ((this.storyId !== '') && !this.storyList.has(this.storyId)) {
      return (
        <Container className="App">
          <h2><Badge>Not Found 404!</Badge></h2>
        </Container>
      )
    }
    return (
      <InputForm
        _id={this.story._id}
        flag={this.story.flag}
        title={this.story.title}
        author={this.story.author}
        discription={this.story.discription}
        dateTime={this.story.dateTime}
        buttonText={'Edit'} canEdit={false} 
        momentVisibility={'moment-visible'}
      />
    )
  }
}

export default withRouter(StoryPage)