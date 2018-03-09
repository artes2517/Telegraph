import React, { Component } from 'react'
import { Container, Button, Badge } from 'reactstrap';
import './StoryPage.css'
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

class StoryPage extends Component {
  constructor(props) {
    super(props);
    this.storyId = this.props.location.pathname.substring(1);
    this.storyList = (localStorage.storyList === undefined) ? new Map() : new Map(JSON.parse(localStorage.storyList));
    this.getInitialState = this.getInitialState.bind(this);
    this.state = this.getInitialState();
    this.onTitleChange = (e) => this.setState({ title: e.target.value });
    this.onAuthorChange = (e) => this.setState({ author: e.target.value });
    this.onDiscriptionChange = (e) => this.setState({ discription: e.target.value });
    this.onPressedButtonPublish = this.onPressedButtonPublish.bind(this);
    this.getLink = this.getLink.bind(this);
  }

  getInitialState() {
    console.log(this.storyId)
    if (this.storyId === '') {
      return ({
        title: '',
        author: '' ,
        discription: '',
        dateTime: null,
        buttonText: 'PUBLISH',
        canEdit: true,
        momentVisibility: 'moment-hidden'
      });
    }
    return {...this.storyList.get(this.storyId), 
      buttonText: 'EDIT', 
      canEdit: false,
      momentVisibility: 'moment-visible'
    }
  }

  getLink() {
    let month = this.state.dateTime.getMonth();
    let day = this.state.dateTime.getDate();
    let prefix = 1;
    let result = `${this.state.title}-${day}-${month}-${prefix}`;
    let length = result.length - 1;
    while (this.storyList.has(result)) {
      prefix++;
      result = result.substring(0, length) + prefix;
    }
    return result;
  }

  onPressedButtonPublish() {
    this.storyId = this.props.location.pathname.substring(1);
    if (!this.state.canEdit) {
      this.setState({ canEdit: true, buttonText: 'PUBLISH', momentVisibility: 'moment-hidden' });
    } else {
        if ((this.state.title !== '') && 
          (this.state.author !== '') && 
          (this.state.discription !== '')) {
        this.state.dateTime = new Date();
        let link;
        console.log(this.storyId);
        if (this.storyList.has(this.storyId)) {
          link = this.storyId;
          this.storyList.delete(link);
        } else {
          link = this.getLink();
        }
        this.storyList.set(
            link,
            {
              title: this.state.title,
              author: this.state.author,
              discription: this.state.discription,
              dateTime: this.state.dateTime,
            }
        );
        localStorage.storyList = JSON.stringify(Array.from(this.storyList.entries()));
        this.props.history.push(`/${link}`);
        this.setState({ canEdit: false, buttonText: 'EDIT', momentVisibility: 'moment-visible' });
      }
    }
  }

  render() {
    if ((this.storyId !== '') && !this.storyList.has(this.storyId)) {
      return (
        <Container className="App">
          <h2><Badge>Not Found 404!</Badge></h2>
        </Container>
      )
    } else {
      return (
        <Container className="App">
          <main className="App-main">
            <header className="App-header">
              <h1>
                {this.state.title && <label htmlFor="title">Title</label>}
                <input
                  id="title"
                  type="text"
                  className="input__lg"
                  value={this.state.title}
                  onChange={this.onTitleChange}
                  placeholder="Title"
                  autoComplete="off"
                  readOnly={!this.state.canEdit}
                />
              </h1>
              <address>
                {this.state.author && <label htmlFor="author">Author</label>}
                <input
                  id="author"
                  type="text"
                  className="input__sm"
                  value={this.state.author}
                  onChange={this.onAuthorChange}
                  placeholder="Your name"
                  autoComplete="off"
                  readOnly={!this.state.canEdit}
                />
                <Moment className={this.state.momentVisibility} format="LLL">
                  { this.state.dateTime }
                </Moment> 
              </address>
            </header>
            <article className="App-article">
              <textarea 
                placeholder="Your story..." 
                value={this.state.discription}
                onChange={this.onDiscriptionChange}
                readOnly={!this.state.canEdit}
              >
              </textarea>
            </article>
            <aside className="App-aside">
              <Button className="button"onClick={this.onPressedButtonPublish}>{this.state.buttonText}</Button>
            </aside>
          </main>
        </Container>
      )
    }
  }
}

export default withRouter(StoryPage);