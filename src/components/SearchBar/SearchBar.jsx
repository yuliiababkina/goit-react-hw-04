import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

function SearchBar({ onSubmit }) {
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value.trim()) {
            return toast.error("Oops... Please type your search query!");
        }

        onSubmit(value);
        setValue("");
    };

    return (
        <header className={s.header}>
            <form className={s.form} onSubmit={handleSubmit}>
                <button className={s.formBtn} type="submit">
                    <IoSearch className={s.searchIcon} size={20} />
                </button>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type="text"
                    className={s.formInput}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}

export default SearchBar;
