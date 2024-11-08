import styles from "./page.module.css";
import React from "react";
import FetchIP from "./components/fetchIP";
export default function Home() {
 
  return (
    <>
    <FetchIP />
    <div className={styles.page}>
      <main className={styles.main}>

        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        {/* {ip && <p>Your IP address is: {ip}</p>} */}
      </main>
    </div>
    </>
  );
}