import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {prisma} from "@repo/db"

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const user = await prisma.user.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>
        {JSON.stringify(user)}
        </p>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>
    </div>
  );
}
