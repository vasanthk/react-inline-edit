# React inline edit

This component allows you to to make inplace edits using a hybrid approach that behaves like a 'contenteditable' input element.
Inpired by Ben Mcmahen's react wysiwyg.

Support: Chrome, Firefox, Safari (desktop & mobile) and IE 9+

## Install

```
$ npm i react-inline-edit
```

## Usage

```javascript
var InlineEdit = require('react-inline-edit');

var Example = React.createClass({
  
  getInitialState: {
    text: '',
    editing: false
  },

  render: function(){
    return (
      <div>
        <InlineEdit
          tagName='div'
          className='name-field'
          onChange={this.onChange}
          onEnterKey={this.onSave}
          onEscapeKey={this.onCancel}
          text={this.state.text}
          placeholder='Your Name'
          autofocus={true}
          maxLength={200}
          editing={this.state.editing}
        />
        <button onClick={this.enableEditing}>
          Enable Editing
        </button>
      </div>
    );
  },

  onSave: function() {
    // logic to save this.state.text here
    this.replaceState(this.getInitialState())
  },

  onCancel: function() {
    this.replaceState(this.getInitialState())
  },

  onChange: function(text) {
    // in order to render the updated text,
    // you need to pass it as a prop to contentEditable.
    // This gives you increased flexibility.
    this.setState({ text: text });
  },

  enableEditing: function(){
    // contenteditable field set to edit mode.
    this.setState({ editing: true });
  }

});
```
