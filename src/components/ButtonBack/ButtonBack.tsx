"use client";

import styles from "./ButtonBack.module.css";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
    const router = useRouter();

    return (
        <button className={styles.button} onClick={() => router.back()}>
            Back
        </button>
    );
}
