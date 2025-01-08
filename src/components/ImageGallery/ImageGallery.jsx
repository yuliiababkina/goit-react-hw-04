import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onOpenModal }) => {
    return (
        <ul className={s.imagesList}>
            {images.map((image) => {
                return (
                    <li key={image.id} className={s.imagesItem}>
                        <ImageCard image={image} onOpenModal={onOpenModal} />
                    </li>
                );
            })}
        </ul>
    );
};

export default ImageGallery;
