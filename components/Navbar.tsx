const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="container navbar">
        <div className="logo-container">
          <img src="/favicon.ico" alt="logo" className="logo" />
          <span className="title-logo">Al-Emara</span>
        </div>
        <div className="search-bar">
          <img src="/icons/search-icon.svg" alt="" />
          <input type="text" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
