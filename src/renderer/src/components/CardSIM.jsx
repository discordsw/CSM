import React, { useState } from 'react'
import SFR from '../assets/sfr.svg?react'
import Orange from '../assets/orange.svg?react'
import Free from "../assets/free.svg?react"
import Remove from '../assets/remove.svg?react'
import ModalCSM from '../components/ModalCSM'


function CardSIM(props) {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const operators = {
    empty: {
      logo: null,
    },
    sfr: {
      logo: () => <SFR style={{ width: "20px", height: "20px", marginLeft: "20px" }} />,
    },
    orange: {
      logo: () => <Orange style={{ width: "20px", height: "20px" }}  />,
    },
    free: {
      logo: () => <Free style={{ width: "40px", height: "30px" }} />,
    }
  }

  return (
    <>
      <div className="cardSIM" onClick={handleOpen}>
        {operators[props.operator].logo && operators[props.operator].logo()}
        <button
          className="delete-button"
          onClick={(event) => {
            event.stopPropagation()
            props.onDelete(props.id)
          } }
          aria-label="Supprimer la carte">
          <Remove className="delete-icon" />
        </button>
      </div>

      <ModalCSM open={open} handleClose={handleClose} onCardSaved={props.onCardSaved} type="cardSIM" model={props.operator} id={props.id} />
    </>
  )

}

export default CardSIM;
