import React from 'react'
import SssHead from '../components/SSS/SssHead'
import SssBody from '../components/SSS/SssBody'
import useDocumentTitle from '../hooks/useDocumentTitle'
const Sss = () => {
  useDocumentTitle("IPSS - SSS")
  return (
    <div className='container mx-auto mt-10 mb-10 h-full p-3 md:p-0'>
      <SssHead />
      <SssBody />
    </div>
  )
}

export default Sss