import React from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  package: require('raw-loader!./code/package.txt'),
  provider: require('raw-loader!./code/provider.txt')
}

export default function InstallationScene () {
  return (
    <div className='counter-singleton-scene'>
      <div className='description'>
        <h2>Installation</h2>
        <p>
          Installing <code>kea</code> is rather straightforward. You need to add the <code>kea</code> package,
          reset kea's context and wrap your app with react-redux's <code>{'<Provider />'}</code> tag.
        </p>

        <h3>1. Install the packages</h3>
        <Highlight className='bash'>{code.package}</Highlight>

        <h3>2. Set up Kea's context</h3>
        <p>
          Kea stores all of its data on a <u>context</u>, which must be set up before any <code>logic</code> can be used.
          This context stores a reference to the redux store, initializes all plugins, caches all built logic and keeps track of what is mounted and what is not.
        </p>
        <p>
          To set it up, just call <code>{'resetContext(options)'}</code> before rendering your app.
        </p>
        <p>
          Then also wrap your <code>&lt;App /&gt;</code> with Redux's <code>&lt;Provider /&gt;</code>, getting the <code>store</code> from <code>getContext()</code>.
        </p>
        <p>
          This is how your <code>index.js</code> would look like if you used <code>create-react-app</code>:
        </p>
        <Highlight className='javascript'>{code.provider}</Highlight>

        <p>And you're done! Feel free to use <code>kea()</code> calls anywhere in your code!</p>

        <h4>A note about call order</h4>

        <p>
          In versions of Kea before 1.0, you had to run the setup code before any call to <code>{'kea({})'}</code> was made.
          This is no longer the case. Each call to <code>{'kea({})'}</code> lazily loads the logic and builds it only when requested,
          either when mounted onto a React component or instructed to do so manually (via <code>logic.build()</code> and/or <code>logic.mount()</code>).
        </p>
        <p>
          Calling <code>resetContext()</code> always clears all initialised logic and reverts your app to a clean state.
        </p>
      </div>
    </div>
  )
}

