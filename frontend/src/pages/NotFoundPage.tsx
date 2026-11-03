import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="bulunamadi">
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link className="button-link" to="/">
        Ana sayfaya dön
      </Link>
    </section>
  );
}

export default NotFoundPage;
