import s from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onChangePage }) {
    return (
        <button onClick={onChangePage} className={s.loadMoreBtn}>
            Load more
        </button>
    );
}

export default LoadMoreBtn;
