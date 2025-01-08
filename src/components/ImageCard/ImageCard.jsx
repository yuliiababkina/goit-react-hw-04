import s from "./ImageCard.module.css";

function ImageCard({ image, onOpenModal }) {
    return (
        <div className={s.galleryImage}>
            <img
                src={image.urls.small}
                alt={image.alt_description}
                onClick={() => {
                    onOpenModal(image);
                }}
            />
        </div>
    );
}

export default ImageCard;
