# React inline edit

This component allows you to to make inplace edits using 'contenteditable' and behaves like and input element.
Customized version of react wysiwyg.

Support: Chrome, Firefox, Safari (desktop & mobile), and IE 9-11.

## Install

```
$ npm install react-inline-edit
```

## Usage

```javascript
var InlineEdit = require('react-wysiwyg');

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
    // set your contenteditable field into editing mode.
    this.setState({ editing: true });
  }

});
```
