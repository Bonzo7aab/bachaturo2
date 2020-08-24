import React, { useState } from 'react'
import Card from '../_general/Card/Card'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './artists.css'
import image1 from '../../util/11.jpg'
import image2 from '../../util/22.jpg'
import image3 from '../../util/33.jpg'
import image4 from '../../util/44.jpg'
import image5 from '../../util/55.jpg'


const Artists = () => {
  const [value, setValue] = useState(0)
  
  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <div className='artists'>
       <br />
      <ButtonGroup variant="outlined" color="secondary" aria-label="text primary button group">
        <Button className={value === 0 ? 'btn-active' : null} onClick={() => handleChange(0)} >Bachata</Button>
        <Button className={value === 1 ? 'btn-active' : null} onClick={() => handleChange(1)} >Kizomba</Button>
        <Button className={value === 2 ? 'btn-active' : null} onClick={() => handleChange(2)} >Salsa</Button>
        <Button className={value === 3 ? 'btn-active' : null} onClick={() => handleChange(3)} >Zouk</Button>
      </ButtonGroup>
      <br />
      <div className={value === 0 ? 'active' : 'inactive'}>
        <Card
        imageUrl={image1}
        title='Dana y Victora'
        description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        />
        <Card 
        imageUrl={image2}
        title='Abeera Edasda'
        description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        />
        <Card 
        imageUrl={image3}
        title='Keerer Ira & Pawvl Rattaa'
        description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        />
      </div>

      <div className={value === 2 ? 'active' : 'inactive'}>
        <Card
        imageUrl={image4}
        title='Kris'
        description='Lorem typesetting industry. Lorem Ipndustrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        />
        <Card 
        imageUrl={image5}
        title='Samoah'
        description='Opesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        />
      </div>
    </div>
  )
}

export default Artists
