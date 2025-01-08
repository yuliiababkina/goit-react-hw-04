import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import s from "./App.module.css";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { fetchImages } from "../services/api";
import ImageModal from "./ImageModal/ImageModal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
    overlay: {
        backgroundColor: "rgb(66, 52, 52)",
    },
};

Modal.setAppElement("#root");

function App() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const openModal = (image) => {
        setModalIsOpen(true);
        setModalImage(image);
        console.log(image);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalImage(null);
    };

    const handleChangePage = () => {
        setPage((prev) => prev + 1);
    };

    const handleChangeQuery = (newQuery) => {
        setQuery(newQuery);
        setImages([]);
        setPage(1);
    };

    useEffect(() => {
        if (!query) {
            return;
        }

        const getImagesData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = await fetchImages(query, page);
                setTotalPages(data.total_pages);
                setImages((prev) => [...prev, ...data.results]);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getImagesData();
    }, [query, page]);

    return (
        <>
            <SearchBar onSubmit={handleChangeQuery} />
            <div className={s.dvh}>
                {isError && <ErrorMessage />}
                {images && (
                    <ImageGallery images={images} openModal={openModal} />
                )}
                {isLoading && <Loader />}
                {page < totalPages && (
                    <LoadMoreBtn onChangePage={handleChangePage} />
                )}
                {modalIsOpen && (
                    <ImageModal
                        image={modalImage}
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        styles={customStyles}
                    />
                )}
            </div>
        </>
    );
}

export default App;
