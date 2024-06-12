import React from 'react'

function Layout({children}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout