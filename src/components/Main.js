export default React => ({ children }) => (
  <div className="main-container">
    <nav className="navbar navbar-default" role="navigation">
      MENU
    </nav>
    <div className="container route-container">
      { children }
    </div>
  </div>
);

