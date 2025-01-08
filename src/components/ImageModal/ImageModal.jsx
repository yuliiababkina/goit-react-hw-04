import Modal from "react-modal";

function ImageModal({ image, isOpen, onClose, styles }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} styles={styles}>
            <div>
                <img src={image?.urls?.regular} alt={image?.alt_description} />
                <p>Author: {image?.users?.instagram_username}</p>
            </div>
        </Modal>
    );
}

export default ImageModal;
