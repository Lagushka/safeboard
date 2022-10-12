import React from "react";
import styles from "./Group.module.scss";

export default function Group(props) {
  return (
    <div>
      <span className={styles.groupName}>{ props.name }</span>
      <div className="group">
        
      </div>
    </div>
  );
}