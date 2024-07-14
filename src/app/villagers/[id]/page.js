import dbConnect from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export default async function IndividualVillager({ params }) {
  const db = dbConnect();
  const villager = (
    await db.query(`SELECT * FROM villagers2 WHERE id = ${params.id}`)
  ).rows;

  const comments = (
    await db.query(`SELECT * FROM comments WHERE villager_id = ${params.id}`)
  ).rows;

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
          <h1>{info.name}</h1>
          <p>Species: {info.species}</p>
          <p>Personality: {info.personality}</p>
          <p>
            Birthday: {info.day} {info.month}
          </p>
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
