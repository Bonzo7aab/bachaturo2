import React from 'react'
import './program.css'

import timetable1 from '../../util/timetable1.png'
import timetable2 from '../../util/timetable2.png'


const Program = () => {
  return (
    <div className='timetable'>
      Program
      <img src={timetable1} alt='timtable1' /> 
      <img src={timetable2} alt='timtable1' /> 
    </div>
  )
}

export default Program

// https://demo.curlythemes.com/pirouette/timetable/
