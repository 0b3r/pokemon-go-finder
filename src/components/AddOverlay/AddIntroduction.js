import C from '../../constants';
import createAddType from './AddType';

export default React => { 

  const AddType = createAddType(React);
  const typesMap = [{
    text: 'I found a new Pokemon',
    addState: C.ADD_LOCATION_POKEMON_SELECT
  },{
    text: 'I found a new Gym',
    addState: C.ADD_LOCATION_GYM
  },{
    text: 'I found a new Pokestop',
    addState: C.ADD_LOCATION_POKESTOP
  }];

  const AddIntroduction = ({handler}) => {

    const addTypeItems = typesMap.map(({text, addState}, index) => (
      <AddType key={index} handler={() => handler(addState)} text={text} />
    ));

    return (
      <div>
        <span>Why hello there! What have you found for me today?</span>
        <ul className="list-group">
          { addTypeItems }
        </ul>
      </div>
    );
  };

  return AddIntroduction;
};