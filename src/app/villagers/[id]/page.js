import dbConnect from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export default async function IndividualVillager({ params }) {
  const db = dbConnect();
  const villager = (
    await db.query(`SELECT * FROM villagers2 WHERE id = ${params.id}`)
  ).rows;

  // getting villager name only from the one that is returned on the solo page so this can be used in my api request
  const soloVillagerName = villager[0].name;

  const comments = (
    await db.query(`SELECT * FROM comments WHERE villager_id = ${params.id}`)
  ).rows;

  // declaring variable now so data set to it can then be used outside the function
  let apiData = null;
  const result = await fetch("https://api.nookipedia.com/villagers", {
    headers: {
      "X-API-KEY": process.env.API_KEY,
    },
  });
  const data = await result.json();
  data.map((apiVillager) => {
    // here i am matching the db villager name with the matching villager object in the api
    if (soloVillagerName == apiVillager.name) {
      // i can use this object in my return
      apiData = apiVillager;
    }
  });

  async function handleSubmit(formData) {
    "use server";
    const name = formData.get("name");
    const comment = formData.get("comment");
    const villagerId = params.id;

    const db = dbConnect();
    await db.query(
      `INSERT INTO comments(name, comment, villager_id) VALUES ($1, $2, $3)`,
      [name, comment, villagerId]
    );
    revalidatePath(`/villagers/${params.id}`);
  }

  return (
    <>
      {villager.map((info) => (
        <div className="individual-villager-div" key={info.id}>
          <div className="individual-villager-name">
            <h1 className="individual-villager-name" class="font-semibold">
              {info.name}
            </h1>
          </div>

          <div className="individual-villager-image">
            <Image
              className="villager-image"
              src={apiData.image_url}
              alt={`Image of ${info.name} villager`}
              priority
              width={100}
              height={100}
            />
          </div>
          <div className="individual-villager-container">
            <p class="font-semibold">Species: {info.species}</p>
            <p class="font-semibold">Personality: {info.personality}</p>
            <p class="font-semibold">
              Birthday: {info.day} {info.month}
            </p>
            <p class="font-semibold">Birthday Sign: {apiData.sign}</p>
            <p class="font-semibold">Favourite Quote: {apiData.quote}</p>
            <p class="font-semibold">Favourite Clothing: {apiData.clothing}</p>
          </div>
        </div>
      ))}
      <h1 className="comment">Comments</h1>
      <form action={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input type="text" name="name" required />
        <label htmlFor="comment">Your Comment</label>
        <input type="text" name="comment" required />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map((info) => (
          <div className="comment-div" key={info.id}>
            <p>Name: {info.name}</p>
            <p>Comment: {info.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
