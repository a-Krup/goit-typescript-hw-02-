import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
  loading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 50,
  color = "#000",
  loading = true,
}) => {
  return (
    loading && (
      <div className={styles.loader}>
        <ClipLoader size={size} color={color} />
      </div>
    )
  );
};

export default Loader;
