import * as React from 'react'
import PropTypes from 'prop-types'

const ComponentExample = ({ children }) => <div>{children}</div>

ComponentExample.propTypes = {
  children: PropTypes.node.isRequired
}

export default ComponentExample
