import Movie from "@/components/Movie";
import styles from "./page.module.css";

type Props = {
    params: {
        imdbId: string;
    };
};

export default function Home({ params }: Props) {
    return (
        <main className={styles.main}>
            <Movie imdbId={params.imdbId} />
        </main>
    );
}
