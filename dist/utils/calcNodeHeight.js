'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = calcNodeHeight;
/**
 * Calculate node height and other dimension by adding a ghost element onto the page
 *
 * TODO: Check if there is a smarter way to calculate node height without creating a ghost <textarea> element.
 *
 * Thanks to @andreypopp and @jackmoore for autosizing logic
 */

var HIDDEN_TEXTAREA_STYLE = '\n  visibility:hidden !important;\n  position:absolute !important;\n  top:0 !important;\n  right:0 !important\n  min-height:none !important;\n  max-height:none !important;\n  height:0 !important;\n  overflow:hidden !important;\n  z-index:-1000 !important;\n';

var SIZING_PROPERTIES = ['line-height', 'width', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'text-rendering', 'text-transform', 'letter-spacing', 'font-family', 'font-weight', 'font-size', 'border-width', 'box-sizing'];

var computedStyleCache = {};
var hiddenTextarea = undefined;

function calcNodeHeight(inlineEditNode) {
  var useCache = arguments[1] === undefined ? false : arguments[1];
  var minRows = arguments[2] === undefined ? null : arguments[2];
  var maxRows = arguments[3] === undefined ? null : arguments[3];

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Get all CSS properties that can have an impact on the height of the content in the textarea.

  var _calculateNodeStyling = calculateNodeStyling(inlineEditNode, useCache);

  var paddingSize = _calculateNodeStyling.paddingSize;
  var borderSize = _calculateNodeStyling.borderSize;
  var sizingStyle = _calculateNodeStyling.sizingStyle;

  hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
  hiddenTextarea.value = inlineEditNode.value || inlineEditNode.placeholder || '';

  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var height = hiddenTextarea.scrollHeight + borderSize;

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = '';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      minHeight = minHeight + paddingSize + borderSize;
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      maxHeight = maxHeight + paddingSize + borderSize;
      height = Math.min(maxHeight, height);
    }
  }
  return { height: height, minHeight: minHeight, maxHeight: maxHeight };
}

function calculateNodeStyling(node) {
  var useCache = arguments[1] === undefined ? false : arguments[1];

  var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  var style = window.getComputedStyle(node);

  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  var sizingStyle = SIZING_PROPERTIES.map(function (name) {
    return '' + name + ':' + style.getPropertyValue(name);
  }).join(';');

  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}
module.exports = exports['default'];