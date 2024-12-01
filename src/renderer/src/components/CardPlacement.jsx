import EmptyCard from './EmptyCard'
import CardSIM from './CardSIM'

function cardPlacement(props) {
  return (
    <>
      <div className={"cardPlacement " + "card"+props.place }>
        { props.empty ? (
          <EmptyCard />
        ) : (
          <CardSIM operator={props.operator} id={props.place} />
        )}
      </div>
    </>
  )

}

export default cardPlacement;
