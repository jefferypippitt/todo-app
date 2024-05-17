export default function Footer() {
  return (
    <footer className="py-4">
      <div className="container">
        <p className="text-center text-xs">
          &copy; {new Date().getFullYear()} Jeffery Pippitt. All rights
          reserved. Created to track and share my journey as a full-stack
          developer. Visit my{" "}
          <a
            href="https://github.com/jefferypippitt"
            className="underline hover:text-gray-800 dark:hover:text-white transition-colors"
            target="_blank"
          >
            GitHub
          </a>{" "}
          to follow my progress and projects.
        </p>
      </div>
    </footer>
  );
}