import s from "./ImageCard.module.css";

function ImageCard({
    image: {
        alt_description,
        urls: { small },
    },
}) {
    return (
        <div className={s.galleryImage}>
            <img src={small} alt={alt_description} />
        </div>
    );
}

export default ImageCard;
