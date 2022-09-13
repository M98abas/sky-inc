const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="container navbar">
        <img src="/favicon.ico" alt="logo" className="logo" />
        <div className="search-bar">
          <img src="/icons/search-icon.svg" alt="" />
          <input type="text" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
