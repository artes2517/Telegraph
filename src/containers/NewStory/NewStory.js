import React, { Component } from 'react'
import './NewStory.css'
import { withRouter } from 'react-router-dom'
import InputForm from '../../components/InputForm/InputForm'
import { PATH } from '../../constants/fetch-config'

class NewStory extends Component {
  constructor(props) {
    super(props)
    this.storyList = null
    this.res = null
  }

  async componentWillMount() {
    this.storyList = (localStorage.storyList === undefined) ? new Map() : new Map(JSON.parse(localStorage.storyList))
    if (this.storyList.size === 0) {
        this.res = await fetch(PATH, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach((value) => {
            this.storyList.set(
              value.link,
              {
                _id: value._id,
                flag: '',
                title: value.title,
                author: value.author ,
                discription: value.discription,
                dateTime: value.dateTime
              }
            )
          })
        }
      )
    }
    localStorage.storyList = JSON.stringify(Array.from(this.storyList.entries()))
  }

  async componentDidMount() {
    for(let value of this.storyList) {
      if (value[1].flag === 'C') {
          this.res = await fetch(PATH, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: value[1].title,
            author: value[1].author,
            discription: value[1].discription,
            link: value[0]
          })
        })
        .then(res => res.json())
        .then(
          (result) => {
            value[1]._id = result._id
            value[1].dateTime = result.dateTime
            value[1].flag = ''
          },
          (error) => {
          }
        )
      } else if (value[1].flag === 'U') {
          this.res = await fetch(`${PATH}/${value[1]._id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: value[1].title,
            author: value[1].author,
            discription: value[1].discription,
            link: value[0]
          })
        })
        .then(res => res.json())
        .then(
          (result) => {
            value[1].dateTime = result.dateTime
            value[1].flag = ''
          },
          (error) => {
          }
        )
      }
    }
    localStorage.storyList = JSON.stringify(Array.from(this.storyList.entries()))
  }

  render() {
    return (
      <InputForm />
    )
  }
}

export default withRouter(NewStory)