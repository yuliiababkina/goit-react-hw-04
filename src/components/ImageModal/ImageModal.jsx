import Modal from "react-modal";
import s from "./ImageModal.module.css";

function ImageModal({ image, isOpen, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName={s.overlay}
            className={s.modal}
            shouldCloseOnOverlayClick={true}
        >
            <div className={s.container}>
                <img
                    src={image?.urls?.regular}
                    alt={image?.alt_description}
                    className={s.image}
                />
            </div>
        </Modal>
    );
}

export default ImageModal;
