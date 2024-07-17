import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Could not find requested page</p>
      <p>
        Visit <Link href="/">homepage</Link>
      </p>
    </div>
  );
}
