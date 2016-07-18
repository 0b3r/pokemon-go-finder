export default React => { 

  const AddHow = ({hereAction, dropPinAction}) => {

    return (
      <div>
        <span>Where did you find it?</span>
        <div>
          <button className="btn btn-success" onClick={hereAction}>
            Here!
          </button>
          --OR--
          <button className="btn btn-warn" onClick={dropPinAction}>
            Drop Pin!
          </button>
        </div>
      </div>
    );
  };

  return AddHow;
};