export default React => ({handler, text}) => (
  <li className="list-group-item" onClick={handler}>
    { text }
  </li>
);
