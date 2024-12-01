import React, { useState, useEffect } from 'react'
import CardPlacement from './CardPlacement'

function CardHolder({onCardClick}) {
  const [data, setData] = useState({})

  useEffect(() => {
    window.electron.getJsonData().then(
      (jsonData) => {
        setData(jsonData)
      })
  }, [])

  return (
    <>
      <div className="cardHolder">
        {Object.keys(data).map((placeKey) => {
          const place = data[placeKey]
          return (
            <CardPlacement key={place.id} place={place.id} empty={place.type === "empty"} operator={place.operator || null} />
          )
        })}
      </div>
    </>
  )
}

export default CardHolder;
