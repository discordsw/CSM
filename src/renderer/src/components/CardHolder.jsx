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

  const logAction = (action, cardDetails) => {
    window.electron.sendCardAction(action, cardDetails)
  }

  const handleDelete = (id) => {
    const updateData = { ...data }
    const cardKey = 'place' + id

    if(updateData[cardKey]) {
      updateData[cardKey] = {
        id: id,
        type: 'empty',
        model: '',
        operator: '',
        SIM: '',
        line: '',
        PIN: '',
      }
      logAction('Suppression', updateData[cardKey])
      setData(updateData)
      window.electron.updateJsonData(updateData).catch(console.error)
    }
  }

  const handleCardSaved = (id, newData) => {
    const updatedData = { ...data }
    console.log('updated :', updatedData, 'newData', newData)
    updatedData['place' + id] = newData['place' + id];
    setData(updatedData)
    logAction('Modification', newData['place' + id])
    window.electron.updateJsonData(updatedData).catch(console.error)
  }

  return (
    <div className="cardHolder">
      {Object.keys(data).map((placeKey) => {
        const place = data[placeKey]
        if (!place) { // Ajoutez une vérification pour éviter l'erreur
          console.error(`Data is undefined for key: ${placeKey}`);
          return null; // Sauter cette itération si place est undefined
        }
        return (
          <CardPlacement
            key={place.id}
            place={place.id}
            empty={place.type === "empty"}
            operator={place.operator || null}
            onDelete={handleDelete}
            onCardSaved={handleCardSaved}
          />
        )
      })}
    </div>
  )
}

export default CardHolder;
