import { useState } from "react";

const Sidebar = () => {
  // const data = useTitleStore();

  const [classActive, setClassActive]: any = useState(false);
  const handelClick = () => {
    if (!classActive) setClassActive(true);
    else setClassActive(false);
  };

  return (
    <div
      className={
        classActive
          ? "container sidebar-container sidebar-container-active"
          : "container sidebar-container"
      }
    >
      <ul className="items">
        <li className="item nav-icon" onClick={handelClick}>
          <a className="link">
            <img
              src={classActive ? "/icons/ximg.png" : "/icons/nav-bar.png"}
              alt="Menu"
              className="logo"
            />
            <span className="content">Menu</span>
          </a>
        </li>
        <li className="item">
          <a href="/" className="link">
            <img
              src={classActive ? "/icons/homecol.png" : "/icons/home.png"}
              alt="Home"
              className="logo"
            />
            <span className="content">Home</span>
          </a>
        </li>

        <li className="item">
          <a href="/users" className="link">
            <img
              src={classActive ? "/icons/team.png" : "/icons/users.png"}
              alt="Users"
              className="logo"
            />
            <span className="content">Users</span>
          </a>
        </li>
        <li className="item">
          <a href="/admin" className="link">
            <img
              src={classActive ? "/icons/admin col.png" : "/icons/admin.png"}
              alt="Admins"
              className="logo"
            />
            <span className="content">Admin</span>
          </a>
        </li>
        <li className="item">
          <a href="/products" className="link">
            <img
              src={classActive ? "/icons/boxes.png" : "/icons/cubes.png"}
              alt="Products"
              className="logo"
            />
            <span className="content">Products</span>
          </a>
        </li>
        <li className="item">
          <a href="/category" className="link">
            <img
              src={
                classActive
                  ? "/icons/category_icon.png"
                  : "/icons/category_icon_fill.png"
              }
              alt="Products"
              className="logo"
            />
            <span className="content">Category</span>
          </a>
        </li>
        <li className="item">
          <a href="/sub-category" className="link">
            <img
              src={
                classActive
                  ? "/icons/sub-category.svg"
                  : "/icons/sub-category.png"
              }
              alt="Products"
              className="logo"
            />
            <span className="content">Sub-Category</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
