import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import styles from "./ImageModal.module.css";

type ImageType = {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  likes: number;
  created_at: string;
  location?: {
    name?: string;
  };
};

interface ImageModalProps {
  image: ImageType;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
    setIsModalOpen(!!image);
  }, [image]);

  if (!image) return null;

  const { alt_description, user, likes, created_at, location, urls } = image;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <img src={urls.regular} alt={alt_description || "Image"} />
        <div className={styles.modalInfo}>
          <h2>{alt_description || "No description available"}</h2>
          <p className={styles.author}>
            Photo by{" "}
            <a href={user.links.html} target="_blank" rel="noopener noreferrer">
              {user.name}
            </a>
          </p>
          <p className={styles.likes}>Likes: {likes}</p>
          <p className={styles.createdAt}>
            Created at: {new Date(created_at).toLocaleDateString()}
          </p>
          {location?.name && (
            <p className={styles.location}>Location: {location.name}</p>
          )}
        </div>
        <button
          className={styles.buttonClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
