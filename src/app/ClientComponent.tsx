'use client'

import React, { useEffect } from 'react'
import envConfig from '../config'

const ClientComponent = () => {
  useEffect(() => {
    console.log(envConfig)
  }, [])

  return <div>ClientComponent</div>
}

export default ClientComponent
