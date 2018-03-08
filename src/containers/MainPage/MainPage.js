import React, { Component } from 'react'
import { Container } from 'reactstrap';
import './MainPage.css'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      discription: '',
      canEdit: true,
    }
    this.onTitleChange = (e) => this.setState({ title: e.target.value })
    this.onAuthorChange = (e) => this.setState({ author: e.target.value })
    this.onDiscriptionChange = (e) => this.setState({ discription: e.target.value })
    this.onPressedButtonPublish = this.onPressedButtonPublish.bind(this)
  }

  onPressedButtonPublish() {
    console.log(this.state);
  }

  render() {
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
            </address>
          </header>
          <article className="App-article">
            <textarea 
              placeholder="Your story..." 
              value={this.state.discription}
              onChange={this.onDiscriptionChange}>
            </textarea>
          </article>
          <aside className="App-aside">
            <button className="button" onClick={this.onPressedButtonPublish} >PUBLISH</button>
          </aside>
        </main>
      </Container>
    )
  }
}

export default MainPage;