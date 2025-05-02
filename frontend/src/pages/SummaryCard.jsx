import React from 'react'

const SummaryCard = ({text,icon,number,color}) => {
  return (
    <div className='flex bg-white h-16 w-11/12 mt-6 ml-4'>
        <div className={`text-3xl flex justify-center items-center ${color} size-16 text-white`}>{icon}
    </div>
        <div className='flex flex-col ml-4 mt-2 font-semibold'>
    <p >{text}</p>
    <p className='text-lg font-bold'>{number}</p>
    </div>
    </div>
  )
}

export default SummaryCard
