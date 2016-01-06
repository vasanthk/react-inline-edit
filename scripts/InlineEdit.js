/**
 * A component that allows inline/in-place edits.
 *
 * @Author: Vasanth Krishnamoorthy
 *
 * Thanks to @andreypopp and @jackmoore for jQuery autosize and react-textarea autosize
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import calcNodeHeight from './utils/calcNodeHeight';

export default class InlineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      isFocus: false,
      height: null,
      maxHeight: Infinity
    };
    this._DOMNode = null;
  }

  render() {
    let {onChange, onFocus, onBlur, backgroundColor, ...props} = this.props;
    props = {...props};

    const defaultStyle = {
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      borderStyle: this.state.isHover ? 'dotted' : 'none',
      outline: 'none',
      resize: 'none'
    };

    props.style = {
      ...defaultStyle,
      height: this.state.height,
      ...props.style
    };

    const maxHeight = Math.max(
      props.style.maxHeight ? props.style.maxHeight : Infinity,
      this.state.maxHeight
    );

    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }

    return (
      <textarea
        {...props}
        onChange={this._onChange}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onMouseEnter={() => this.setState({isHover: true})}
        onMouseLeave={() => this.setState({isHover: false})}
        ref={(node) => {this._DOMNode = node}}
      />
    );

  }

  /**
   * Lifecycle Hooks
   */
  componentDidMount() {
    this._resizeIfNeeded();
    window.addEventListener('resize', this._resizeIfNeeded);
  }

  componentWillReceiveProps() {
    this._resizeIfNeeded();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeIfNeeded);
  }

  /**
   * Component Action functions
   */
  _onChange = (e) => {
    this._resizeIfNeeded();
    const {onChange} = this.props;
    onChange(e);
  };

  _onFocus = (e) => {
    this.setState({
      isFocus: true
    });
    const {onFocus} = this.props;
    onFocus(e);
  };

  _onBlur = (e) => {
    this.setState({
      isFocus: false
    });
    const {onBlur} = this.props;
    onBlur(e);
  };

  _resizeIfNeeded = () => {
    const {cacheNodeStyling} = this.props;
    this.setState(
      calcNodeHeight(
        this._DOMNode,
        cacheNodeStyling,
        this.props.rows || this.props.minRows,
        this.props.maxRows
      )
    );
  };
}

/**
 * PropType definitions
 */
InlineEdit.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  cacheNodeStyling: React.PropTypes.bool,
  rows: React.PropTypes.number,
  minRows: React.PropTypes.number,
  maxRows: React.PropTypes.number
};

/**
 * Default Props
 */
InlineEdit.defaultProps = {
  onChange: () => {
  },
  onBlur: () => {
  },
  onFocus: () => {
  },
  cacheNodeStyling: false
};