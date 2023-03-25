"use client";

import styles from "./Search.module.css";
import { useState } from "react";

export default function Search() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className={styles.button}
                onClick={() => setShowModal(!showModal)}
            >
                Search
            </button>
            {showModal && (
                <>
                    <div
                        className={styles.modal}
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className={styles.modalContent}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </>
            )}
        </>
    );
}
