import Image from "next/image";
import Link from "next/link";
import tent from "@/../public/assets/nook-tent.png";
import museum from "@/../public/assets/museum.png";

export default function Home() {
  return (
    <>
      <h1>Villager Vault</h1>
      <Link href="/villagers">
        <Image
          className="home-image"
          src={tent}
          alt="animal crossing tent"
          width={250}
          height={"auto"}
          // placeholder="blur"
        />
      </Link>
      <p className="intro">Come check out who could visit your island next!</p>
      <Link href="/form">
        <Image
          className="home-image"
          src={museum}
          alt="animal crossing museum"
          width={250}
          height={"auto"}
          // placeholder="blur"
        />
      </Link>
      <p className="intro">
        Found a new favourite? Add them to the collection!
      </p>
    </>
  );
}
