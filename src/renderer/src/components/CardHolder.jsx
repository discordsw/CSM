import CardPlacement from './CardPlacement'

function CardHolder({onCardClick}) {

  return (
    <>
      <div className="cardHolder">
        <CardPlacement place="1" empty={false} operator="sfr"/>
        <CardPlacement place="2" empty={false} operator="free"/>
        <CardPlacement place="3" empty={false} operator="empty"/>
        <CardPlacement place="4" empty={true}/>
        <CardPlacement place="5" empty={true}/>
        <CardPlacement place="6" empty={true}/>
        <CardPlacement place="7" empty={true}/>
        <CardPlacement place="8" empty={true}/>
        <CardPlacement place="9" empty={true}/>
        <CardPlacement place="10" empty={true}/>
        <CardPlacement place="12" empty={false} operator="orange"/>
      </div>
    </>
  )
}

export default CardHolder;
