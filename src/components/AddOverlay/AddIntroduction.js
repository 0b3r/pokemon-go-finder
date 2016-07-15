export default React => { 

  const AddIntroduction = () => (
    <div>
      <span>Why hello there! What have you found for me today?</span>
      <ul className="list-group">
        <li className="list-group-item">I found a new Pokemon!</li>
        <li className="list-group-item">I found a new PokeStop!</li>
        <li className="list-group-item">I found a new Gym!</li>
      </ul>
    </div>
  );

  return AddIntroduction;
};