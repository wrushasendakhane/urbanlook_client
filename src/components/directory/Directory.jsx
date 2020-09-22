import React from "react";
import { connect } from "react-redux";
import MenuItem from "../menu-item/MenuItem";
import classes from "./Directory.module.css";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directorySelector";

function Directory({ sections }) {
  return (
    <div className={classes.directory}>
      {sections.map(({ id, title, imageUrl, linkUrl, size }) => (
        <MenuItem
          key={id}
          title={title}
          imageUrl={imageUrl}
          size={size}
          linkUrl={linkUrl}
        />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
