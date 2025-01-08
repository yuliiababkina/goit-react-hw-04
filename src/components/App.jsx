import { useState, useEffect } from "react";
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
        overflow: "hidden",
        height: "80%",
    },
    overlay: {
        position: "fixed",
        top: "95px",
        bottom: "70px",
        left: "50%",
        marginLeft: "35px",
        marginRight: "auto",
        transform: "translate(-50%, -0%)",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        border: "none",
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

    const openModal = (imageId) => {
        setModalIsOpen(true);
        setModalImage(imageId);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalImage(null);
        document.body.style.overflow = "";
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
                    <ImageGallery images={images} onOpenModal={openModal} />
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
