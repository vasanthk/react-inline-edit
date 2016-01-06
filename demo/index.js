import React from 'react';
import {render} from 'react-dom';
import InlineEdit from '../scripts/InlineEdit';

// Stateless Functions (> React 0.14)
class Demo extends React.Component {
  render() {

    return (
      <div>
        <div>
          <h3>Component with placeholder text</h3>
          <pre>
{`
<InlineEdit
  placeholder="Add text here..."
  />
`}
          </pre>
          <InlineEdit
            placeholder="Add text here..."
          />
        </div>
        <div>
          <h3>Component with minRows and maxRows</h3>
          <pre>
{`
<InlineEdit
  minRows={3}
  maxRows={6}
  defaultValue="Click here and edit..."
  />
`}
          </pre>
          <InlineEdit
            minRows={3}
            maxRows={6}
            defaultValue="Click here and edit..."
          />
        </div>
        <div>
          <h3>Component with maxRows</h3>
<pre>
{`
<InlineEdit
  maxRows={5}
  defaultValue="..."
  />
`}
          </pre>
          <InlineEdit
            maxRows={5}
            defaultValue="
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
          Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
          In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          "
          />
        </div>
        <div>
          <h3>Component with maxHeight</h3>
<pre>
{`
<InlineEdit
  style={{maxHeight: 100}}
  defaultValue="Click here and edit..."
  />
`}
          </pre>
          <InlineEdit
            style={{maxHeight: 100}}
            defaultValue="Click here and edit..."
          />
        </div>
        <div>
          <h3>Component with set # of rows</h3>
          <pre>
{`
<InlineEdit
  rows={4}
  defaultValue="Click here and edit..."
  />
`}
          </pre>
          <InlineEdit
            rows={4}
            defaultValue="Click here and edit..."
          />
        </div>
      </div>
    );
  }
}


render(
  <Demo />,
  document.getElementById('root')
);
