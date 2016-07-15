


export default React => {

  const professorWillow = require('../../assets/images/Professor_Willow.png');
  


  const AddOverlay = ({toggleAddLocation}) => {

    return (
      <div className="add-overlay">
        <div className="add-overlay-modal"></div>
        <div className="add-overlay-wrapper">
          <button 
            className="btn btn-success pull-right" 
            onClick={toggleAddLocation}>
              Close
          </button>
          <div 
            className="professor-willow" 
            style={{backgroundImage: `url(${professorWillow})`}}>
          </div>
          <div className="add-location-wrapper">
            
          </div>
        </div>
      </div>
    );
  }

  return AddOverlay;

} 