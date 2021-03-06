import React from "react";
import "./MenuItem.styles.scss";
import { withRouter } from "react-router-dom";

function MenuItem({ title, imgUrl, size, history, linkUrl, match }) {
  const menuItemClass = size ? `${size} menu-item` : 'menu-item';
  return (
    <div
      className={menuItemClass}
      onClick={() => { history.push(`${match.url}${linkUrl}`) }}>
      <div className="background-image" style={{
        backgroundImage: `url(${imgUrl})`
      }} />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  )
}

export default withRouter(MenuItem);