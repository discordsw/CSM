import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function EmptyCard({ handleOpen }) {

  return (
    <div className="cardEmpty" onClick={handleOpen}>
      <FontAwesomeIcon icon={faPlus} className="cardEmptyIcon" />
    </div>
  )
}

export default EmptyCard;
