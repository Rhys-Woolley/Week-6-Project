const CatInfoComponent = (props) => {
  const cat = props.cat;

  if (cat == null) return;

  return (
    <>
      <div className={"basketBG " + (props.visible ? "" : "hidden")}
            onClick={() => props.setVisible(false)}></div>

      <div className={"basketHolder basketBG " + (props.visible ? "" : "hidden")}
          onClick={() => props.setVisible(false)}></div>  

      <div className={"infoBox " + (props.visible ? "" : "hidden")}>
        
        <div className="innerInfoBox flex">
          <img src={cat.url} />
          <div className="catInfo">
            <h1>{cat.name}</h1>
            <h2>£{cat.price}</h2>
            <p>{cat.description}</p>
            <button onClick={() => props.addFunc(cat)}>add</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CatInfoComponent