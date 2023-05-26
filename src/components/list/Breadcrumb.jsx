import React from "react";

const BreadCrumb = ({ breadcrumb }) => {
  return (
    <div>
      {breadcrumb.map((item, index) => (
        <React.Fragment key={index}>
          {item.active ? (
            <span
              style={{
                color: "gray",
                textDecoration: "none"
              }}
            >
              {item.icon} {item.name}
            </span>
          ) : (
            <a
              href={item.link}
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px"
              }}
            >
              {item.icon} {item.name}
            </a>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
