import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/villagers">Villagers</Link>
        <Link href="/form">Add Visitor</Link>
      </nav>
    </>
  );
}
