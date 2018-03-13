import React, { Component } from 'react'
import { Container, Button, Badge } from 'reactstrap';
import './InputForm.css'
import Moment from 'react-moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class InputForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    discription: PropTypes.string,
    dateTime: PropTypes.instanceOf(Date),
    buttonText: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    momentVisibility: PropTypes.string.isRequired
  };
  
  static defaultProps = {
    title: '',
    author: '' ,
    discription: '',
    dateTime: null,
    buttonText: 'PUBLISH',
    canEdit: true,
    momentVisibility: 'moment-hidden'
  };

  constructor(props) {
    super(props);
    this.storyId = this.props.location.pathname.substring(1);
    this.storyList = (localStorage.storyList === undefined) ? new Map() : new Map(JSON.parse(localStorage.storyList));
    this.state = {
      title: this.props.title,
      author: this.props.author ,
      discription: this.props.discription,
      dateTime: this.props.dateTime,
      buttonText: this.props.buttonText,
      canEdit: this.props.canEdit,
      momentVisibility: this.props.momentVisibility
    };
    this.onTitleChange = (e) => this.setState({ title: e.target.value });
    this.onAuthorChange = (e) => this.setState({ author: e.target.value });
    this.onDiscriptionChange = (e) => this.setState({ discription: e.target.value });
    this.onPressedButtonPublish = this.onPressedButtonPublish.bind(this);
    this.getLink = this.getLink.bind(this);
  }

  getLink() {
    let month = this.state.dateTime.getMonth() + 1;
    let day = this.state.dateTime.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    let prefix = 1;
    let result = `${this.state.title}-${month}-${day}-${prefix}`;
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
      return (
        <Container className="App">
          <main className="App-main">
            <header className="App-header">
              <h1>
                {this.state.title && this.state.canEdit && <label htmlFor="title">Title</label>}
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
                {this.state.author && this.state.canEdit && <label htmlFor="author">Author</label>}
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
                {!this.state.canEdit && <span>● </span>}
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

export default withRouter(InputForm);