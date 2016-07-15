export default React => { 

  const PokemonConfirm = () => (
    <div className="add-stage-4">
      <span>Where did you find it?</span>
      <div>
        <button className="btn btn-success">Here!</button>
        <span>OR</span>
        <button className="btn btn-warning">Drop a Pin</button>
      </div>
    </div>
  );

  return PokemonConfirm;
};