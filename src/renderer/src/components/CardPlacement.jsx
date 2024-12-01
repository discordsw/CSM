import React, { useState } from 'react'
import EmptyCard from './EmptyCard'
import CardSIM from './CardSIM'
import ModalCSM from '../components/ModalCSM'

function cardPlacement(props) {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className={"cardPlacement " + "card"+props.place }>
        { props.empty ? (
          <EmptyCard handleOpen={handleOpen} />
        ) : (
          <CardSIM operator={props.operator} id={props.place} handleOpen={handleOpen} handleClose={handleClose} />
        )}
      </div>
      <ModalCSM open={open} handleClose={handleClose} type="empty" />
    </>
  )

}

export default cardPlacement;
