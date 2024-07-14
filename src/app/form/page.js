import dbConnect from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function form() {
  async function handleSubmit(formData) {
    "use server";
    const name = formData.get("name");
    const species = formData.get("species");
    const personality = formData.get("personality");
    const day = formData.get("day");
    const month = formData.get("month");

    // put data into db
    const db = dbConnect();
    await db.query(
      `INSERT INTO villagers2(name, species, personality, day, month) VALUES ($1, $2, $3, $4, $5)`,
      [name, species, personality, day, month]
    );
    revalidatePath("/villagers");
    redirect("/villagers");
  }

  return (
    <>
      <h1>Add a Villager</h1>
      <form className="form-villager" action={handleSubmit}>
        <label htmlFor="name">Villager Name</label>
        <input type="text" name="name" required placeholder="e.g. Bluebear" />
        <label htmlFor="species">Villager Species</label>
        <input type="text" name="species" required placeholder="e.g. Cub" />
        <label htmlFor="personality">Personality</label>
        <select
          className="personality"
          name="personality"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Normal">Normal</option>
          <option value="Lazy">Lazy</option>
          <option value="Snooty">Snooty</option>
          <option value="Smug">Smug</option>
          <option value="Peppy">Peppy</option>
          <option value="Jock">Jock</option>
          <option value="Sisterly">Sisterly</option>
          <option value="Cranky">Cranky</option>
        </select>
        <p className="birthday">Villager Birthday</p>
        <div className="birthday-div">
          <label htmlFor="day">Date</label>
          <input type="number" min={1} max={31} name="day" required />
          <label className="month" htmlFor="month">
            Month
          </label>
          <select name="month" defaultValue="" required>
            <option value="" disabled>
              Select
            </option>
            <option value="January">Janurary</option>
            <option value="Feburary">Feburary</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div className="button-div">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
