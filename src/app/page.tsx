import MovieLists from "./components/MovieLists";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <MovieLists />
        </main>
    );
}
