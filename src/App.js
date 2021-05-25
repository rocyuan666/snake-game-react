import React, { memo } from 'react'

import "./assets/css/base.css"

import RocHome from "./pages/home"

export default memo(function App() {
  return (
    <div>
      <RocHome></RocHome>
    </div>
  )
})
