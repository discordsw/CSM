import React, { useState, useEffect } from 'react'
import { Modal, Box, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material'
import Fade from '@mui/material/Fade';
import SFR from '../assets/sfr.svg?react'
import Orange from '../assets/orange.svg?react'
import Free from "../assets/free.svg?react"
import '../assets/modal.css'

function ModalCSM(props) {
  const [selectedOperator, setSelectedOperator] = useState('empty');
  const [simNumber, setSimNumber] = useState('');
  const [line, setLine] = useState('');
  const [pin, setPin] = useState('');


  useEffect(() => {

    const loadData = async () => {
      if(props.type !== 'empty') {
        const config = await window.electron.getJsonData()
        if (config && props.id !== undefined) {
          const cardData = config['place'+props.id]
          if(cardData) {
            setSelectedOperator(cardData.operator || 'empty')
            setSimNumber(cardData.SIM || '')
            setLine(cardData.line || '')
            setPin(cardData.PIN || '')
          } else {
            resetFields()
          }
        }
      } else {
        resetFields()
      }
    }
    loadData()
  }, [props.id, props.type])


  const resetFields = () => {
    setSelectedOperator('empty')
    setSimNumber('')
    setLine('')
    setPin('')
  }

  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value)
  }

  let divLeft = null;
  let divRight = null;

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
        <Select labelId="operator-label" label="Opérateur" defaultValue="empty" onChange={handleOperatorChange} value={selectedOperator}>
          <MenuItem value="empty">Inconnu</MenuItem>
          <MenuItem value="sfr">SFR</MenuItem>
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label="Numéro SIM" variant="outlined" margin="normal" value={simNumber} onChange={e => setSimNumber(e.target.value)} />
      <TextField fullWidth label="Ligne" variant="outlined" margin="normal" value={line} onChange={e => setLine(e.target.value)} />
      <TextField fullWidth label="PIN" variant="outlined" margin="normal" value={pin} onChange={e => setPin(e.target.value)} />
    </div>
  )


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
