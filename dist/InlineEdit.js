'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

/**
 * A component that allows inline/in-place edits.
 *
 * @Author: Vasanth Krishnamoorthy
 *
 * Thanks to @andreypopp and @jackmoore for jQuery autosize and react-textarea autosize
 */

var _React$Component = require('react');

var _React$Component2 = _interopRequireDefault(_React$Component);

var _render = require('react-dom');

var _calcNodeHeight = require('./utils/calcNodeHeight');

var _calcNodeHeight2 = _interopRequireDefault(_calcNodeHeight);

var InlineEdit = (function (_Component) {
  function InlineEdit(props) {
    var _this = this;

    _classCallCheck(this, InlineEdit);

    _get(Object.getPrototypeOf(InlineEdit.prototype), 'constructor', this).call(this, props);

    this._onChange = function (e) {
      _this._resizeIfNeeded();
      var onChange = _this.props.onChange;

      onChange(e);
    };

    this._onFocus = function (e) {
      _this.setState({
        isFocus: true
      });
      var onFocus = _this.props.onFocus;

      onFocus(e);
    };

    this._onBlur = function (e) {
      _this.setState({
        isFocus: false
      });
      var onBlur = _this.props.onBlur;

      onBlur(e);
    };

    this._resizeIfNeeded = function () {
      var cacheNodeStyling = _this.props.cacheNodeStyling;

      _this.setState(_calcNodeHeight2['default'](_this._DOMNode, cacheNodeStyling, _this.props.rows || _this.props.minRows, _this.props.maxRows));
    };

    this.state = {
      isHover: false,
      isFocus: false,
      height: null,
      maxHeight: Infinity
    };
    this._DOMNode = null;
  }

  _inherits(InlineEdit, _Component);

  _createClass(InlineEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var onChange = _props.onChange;
      var onFocus = _props.onFocus;
      var onBlur = _props.onBlur;
      var backgroundColor = _props.backgroundColor;

      var props = _objectWithoutProperties(_props, ['onChange', 'onFocus', 'onBlur', 'backgroundColor']);

      props = _extends({}, props);

      var defaultStyle = {
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        borderStyle: this.state.isHover ? 'dotted' : 'none',
        outline: 'none',
        resize: 'none'
      };

      props.style = _extends({}, defaultStyle, {
        height: this.state.height }, props.style);

      var maxHeight = Math.max(props.style.maxHeight ? props.style.maxHeight : Infinity, this.state.maxHeight);

      if (maxHeight < this.state.height) {
        props.style.overflow = 'hidden';
      }

      return _React$Component2['default'].createElement('textarea', _extends({}, props, {
        onChange: this._onChange,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onMouseEnter: function () {
          return _this2.setState({ isHover: true });
        },
        onMouseLeave: function () {
          return _this2.setState({ isHover: false });
        },
        ref: function (node) {
          _this2._DOMNode = node;
        }
      }));
    }
  }, {
    key: 'componentDidMount',

    /**
     * Lifecycle Hooks
     */
    value: function componentDidMount() {
      this._resizeIfNeeded();
      window.addEventListener('resize', this._resizeIfNeeded);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this._resizeIfNeeded();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._resizeIfNeeded);
    }
  }]);

  return InlineEdit;
})(_React$Component.Component);

exports['default'] = InlineEdit;

/**
 * PropType definitions
 */
InlineEdit.propTypes = {
  value: _React$Component2['default'].PropTypes.string,
  onChange: _React$Component2['default'].PropTypes.func,
  onBlur: _React$Component2['default'].PropTypes.func,
  onFocus: _React$Component2['default'].PropTypes.func,
  cacheNodeStyling: _React$Component2['default'].PropTypes.bool,
  rows: _React$Component2['default'].PropTypes.number,
  minRows: _React$Component2['default'].PropTypes.number,
  maxRows: _React$Component2['default'].PropTypes.number
};

/**
 * Default Props
 */
InlineEdit.defaultProps = {
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  cacheNodeStyling: false
};
module.exports = exports['default'];

/**
 * Component Action functions
 */