import React from 'react'

const FbaseContext = React.createContext(null)

export const addFirebase = Component => props => (
  <FbaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FbaseContext.Consumer>
)

export default FbaseContext