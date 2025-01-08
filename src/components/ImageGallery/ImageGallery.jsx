import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = forwardRef((props, ref) => {
    return (
        <ul className={s.imagesList} ref={ref}>
            {props.images.map((image) => {
                return (
                    <li key={image.id} className={s.imagesItem}>
                        <ImageCard
                            image={image}
                            onOpenModal={props.openModal}
                        />
                    </li>
                );
            })}
        </ul>
    );
});

export default ImageGallery;
