import styles from "./page.module.css";
import MovieList from "@/components/MovieList";

type Props = {
    params: {
        listId: string;
    };
};

export default function Home({ params }: Props) {
    return (
        <main className={styles.main}>
            <MovieList listId={params.listId} />
        </main>
    );
}
