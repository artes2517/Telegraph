import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils } from 'draft-js'
import './style.css'

const getSelectedBlockElement = (range) => {
  let node = range.startContainer
  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node
    }
    node = node.parentNode
  } while (node != null)

  return null
}

const getSelectionRange = () => {
  const selection = window.getSelection()
  if (selection.rangeCount === 0) return null
  return selection.getRangeAt(0)
}

const isParentOf = (elm, maybeParent) => {
  while(elm.parentNode != null && elm.parentNode !== document.body) {
    if (elm.parentNode === maybeParent) return true
    elm = elm.parentNode
  }
  return true
}

class RichEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onBlur = this._onBlur.bind(this)
    this.onFocus = this._onFocus.bind(this)
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.updateSelection = () => {
      const selectionRange = getSelectionRange()
      if (!selectionRange) return

      const editor = ReactDOM.findDOMNode(this.refs.editor)
      if (!isParentOf(selectionRange.commonAncestorContainer, editor)) return

      if (!this.editorBounds) this.editorBounds = editor.getBoundingClientRect()


      const selectedBlock = getSelectedBlockElement(selectionRange)
      if (!selectedBlock) return

      const blockBounds = selectedBlock.getBoundingClientRect()
      const rangeBounds = selectionRange.getBoundingClientRect()
    }
  }

  componentDidUpdate() {
    this.updateSelection()
  }

  _isContentBlockEmpty() {
    const { editorState } = this.props
    const selection = editorState.getSelection()
    return !(editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getLength())
  }

  _handleKeyCommand(command) {
    const { editorState, onChange } = this.props
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return true
    }
    return false
  }

  _onFocus() {
    if (this.props.readOnly) return
    this.refs.editor.focus()
  }

  _onBlur(...arg) {
    if (this.props.onBlur) this.props.onBlur.apply(this, arg)
  }

  render() {
    const { onChange, ...others } = this.props

    let { editorState } = this.props
    if (!editorState) {
      editorState = EditorState.createEmpty()
      onChange(editorState)
    }

    return (
      <div className="Editor-root" onClick={this.onFocus}>
        <Editor
          ref="editor"
          className="Editor-editor"
          blockRendererFn={this.blockRender}
          handleKeyCommand={this.handleKeyCommand}
          {...others}
          editorState={editorState}
          onChange={onChange}
          onBlur={this.onBlur}
        />
      </div>
    )
  }
}

RichEditor.propTypes = {
  blockTypes: PropTypes.object,
  readOnly: PropTypes.bool,
}

export default RichEditor