/**
 * Calculate node height and other dimension by adding a ghost element onto the page
 *
 * TODO: Check if there is a smarter way to calculate node height without creating a ghost <textarea> element.
 *
 * Thanks to @andreypopp and @jackmoore for autosizing logic
 */

const HIDDEN_TEXTAREA_STYLE = `
  visibility:hidden !important;
  position:absolute !important;
  top:0 !important;
  right:0 !important
  min-height:none !important;
  max-height:none !important;
  height:0 !important;
  overflow:hidden !important;
  z-index:-1000 !important;
`;

const SIZING_PROPERTIES = [
  'line-height',
  'width',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'text-rendering',
  'text-transform',
  'letter-spacing',
  'font-family',
  'font-weight',
  'font-size',
  'border-width',
  'box-sizing'
];

let computedStyleCache = {};
let hiddenTextarea;

export default function calcNodeHeight(inlineEditNode, useCache = false, minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Get all CSS properties that can have an impact on the height of the content in the textarea.
  let {paddingSize, borderSize, sizingStyle} = calculateNodeStyling(inlineEditNode, useCache);

  hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
  hiddenTextarea.value = inlineEditNode.value || inlineEditNode.placeholder || '';

  let minHeight = -Infinity;
  let maxHeight = Infinity;
  let height = hiddenTextarea.scrollHeight + borderSize;

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = '';
    let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

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
  return {height, minHeight, maxHeight};
}

function calculateNodeStyling(node, useCache = false) {
  let nodeRef = (
    node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name')
  );

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  let style = window.getComputedStyle(node);

  let paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  );

  let borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  );

  let sizingStyle = SIZING_PROPERTIES
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');

  let nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}
