import createAuth from './Auth';

export default React => {

  const Auth = createAuth(React);
  
  const Main = ({ children }) => (
    <div className="main-container">
      <nav className="navbar navbar-default main-nav" role="navigation">
        <Auth />
      </nav>
      <div className="container route-container">
        { children }
      </div>
    </div>
  );

  return Main; 
};

