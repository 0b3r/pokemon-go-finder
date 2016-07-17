export default React => { 

  const AddConfirm = ({close}) => (
    <div className="add-stage-4">
      <span>
        Awesome I'll add the sighting to my record!  
        Let me know if you see more!
      </span>
      <div>Share your sighting!</div>
      <div>
        <button className="btn btn-default">Facebook</button>
        <button className="btn btn-default">Google</button>
        <button className="btn btn-default">Twitter</button>
      </div>
      <div>
        <button className="btn btn-success" onClick={close}>Close</button>
      </div>
    </div>
  );

  return AddConfirm;
};