import FontIcon from 'material-ui/FontIcon';

export default React => ({style, type, ...props}) => {
  const baseStyle = {
    cursor: 'pointer'
  };
  return (
    <FontIcon 
      className="material-icons" 
      style={ Object.assign({}, baseStyle, style) } 
      { ...props }>
        { type }
    </FontIcon>
  );
};