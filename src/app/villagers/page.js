import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/utils/dbConnection";
import up from "@/../public/assets/up-arrow.png";
import down from "@/../public/assets/down-arrow.png";

export default async function Villagers({ searchParams }) {
  const db = dbConnect();
  const villagers = (await db.query(`SELECT * FROM villagers2`)).rows;

  // access the query parameters from the URL using searchParams object
  // villagers?sort=desc, searchParams.sort
  if (searchParams.sort === "desc") {
    villagers.reverse();
  }

  return (
    <>
      <h1>Villagers</h1>
      <p class="text-center pt-2 font-semibold">
        Click on a villager to find out more!
      </p>
      <div className="icon-div">
        <p>Sort</p>
        <Link href="/villagers?sort=asc">
          <Image
            className="icon"
            src={up}
            alt="up arrow"
            width={25}
            height={"auto"}
          />
        </Link>
        <Link href="/villagers?sort=desc">
          <Image
            className="icon"
            src={down}
            alt="down arrow"
            width={25}
            height={"auto"}
          />
        </Link>
      </div>

      <div className="villagers-container">
        {villagers.map((villager) => (
          <Link href={`/villagers/${villager.id}`} key={villager.id}>
            <h3>{villager.name}</h3>
            <div className="villager">
              <p>Species: {villager.species}</p>
              <p>Personality: {villager.personality}</p>
              <p>
                Birthday: {villager.day} {villager.month}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
