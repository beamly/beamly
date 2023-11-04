import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed w-full bottom-0 border-t p-2">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          &copy; {currentYear} beamly.app <br />
          Powered by{" "}
          <Link
            href={"https://audius.co/"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Audius
          </Link>
        </p>
      </div>
    </footer>
  );
}
