import React from 'react'

const Header = ({ numberOfSchools }: { numberOfSchools: number }) => {
  return (
    <h1 className='schools-header'>
      NYC Schools ({numberOfSchools || '...'})
    </h1>
  )
}

export default Header