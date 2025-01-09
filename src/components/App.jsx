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
        setTotalPages(0);
    };

    useEffect(() => {
        if (!query) {
            return;
        }

        const getImagesData = async () => {
            setIsLoading(true);
            try {
                setIsError(false);

                const data = await fetchImages(query, page);
                if (page === 1) {
                    setTotalPages(data.total_pages);
                }

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
                {images.length > 0 && page < totalPages && (
                    <LoadMoreBtn onChangePage={handleChangePage} />
                )}

                {modalIsOpen && (
                    <ImageModal
                        image={modalImage}
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    );
}

export default App;
