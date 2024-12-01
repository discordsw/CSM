import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function EmptyCard() {

  return (
    <>
      <FontAwesomeIcon icon={faPlus} className="cardEmptyIcon" />
    </>
  )
}

export default EmptyCard;
