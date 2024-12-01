import React, { useState } from 'react'
import { Modal, Box, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material'
import Fade from '@mui/material/Fade';
import SFR from '../assets/sfr.svg?react'
import Orange from '../assets/orange.svg?react'
import Free from "../assets/free.svg?react"
import '../assets/modal.css'

function ModalCSM(props) {
  console.log(props.model)
  const [selectedOperator, setSelectedOperator] = useState(props.model || 'empty');

  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value)
  }

  let divLeft = null;
  let divRight = null;


  if(props.type === 'cardSIM') {
    let model = null
    switch(selectedOperator) {
      case 'sfr':
        model = (<SFR style={{ width: "40px", height: "40px", marginLeft: "40px" }} />)
        break;
      case 'orange':
        model = (<Orange style={{ width: "40px", height: "40px" }}  />)
        break;
      case 'free':
        model = (<Free style={{ width: "80px", height: "60px" }} />)
        break;
      case 'empty':
        model = null
    }

    divLeft = (
      <div className="left-div">
        <div className="cardSIM" style={{width: 160, height: 114}}>
          { model }
        </div>
      </div>
    )

    divRight = (
      <div className="right-div">
        <FormControl fullWidth margin="normal">
          <InputLabel id="operator-label">Opérateur</InputLabel>
          <Select labelId="operator-label" label="Opérateur" defaultValue="empty" onChange={handleOperatorChange}>
            <MenuItem value="empty">Inconnu</MenuItem>
            <MenuItem value="sfr">SFR</MenuItem>
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Numéro SIM" variant="outlined" margin="normal" />
        <TextField fullWidth label="Ligne" variant="outlined" margin="normal" />
        <TextField fullWidth label="PIN" variant="outlined" margin="normal" />
      </div>
    )
  }


  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
    >
      <Fade in={props.open}>
        <Box className="modal-csm">
          { divLeft }
          { divRight }
        </Box>
      </Fade>
    </Modal>
  )

}

export default ModalCSM;
