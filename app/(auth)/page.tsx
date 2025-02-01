import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Вы не авторизованы в приложении выполните <Link href='/login'>логин</Link>
      </main>
    </div>
  );
}
