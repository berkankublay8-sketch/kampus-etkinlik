import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

interface HeaderContent {
  title: string;
  subtitle?: string;
}

function getHeaderContent(pathname: string, events: ReturnType<typeof useEvents>["events"]): HeaderContent {
  if (pathname === "/") {
    return {
      title: "Kampüs Etkinlikleri",
      subtitle: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    };
  }

  if (pathname === "/events") {
    return {
      title: "Tüm Etkinlikler",
      subtitle: "Ekim ayında kampüste düzenlenen etkinlikler.",
    };
  }

  const detailMatch = pathname.match(/^\/events\/([^/]+)$/);
  if (detailMatch) {
    const event = findEventById(events, decodeURIComponent(detailMatch[1]));
    return { title: event?.title ?? "Sayfa bulunamadı" };
  }

  if (pathname === "/admin") return { title: "Etkinlik Yönetimi" };
  if (pathname === "/admin/new") return { title: "Etkinlik Ekle" };

  const editMatch = pathname.match(/^\/admin\/([^/]+)\/edit$/);
  if (editMatch) {
    const event = findEventById(events, decodeURIComponent(editMatch[1]));
    return { title: event ? "Etkinlik Güncelle" : "Sayfa bulunamadı" };
  }

  if (pathname === "/login") return { title: "Giriş Yap" };
  if (pathname === "/register") return { title: "Kayıt Ol" };
  if (pathname === "/forgot-password") return { title: "Şifremi Unuttum" };

  return { title: "Sayfa bulunamadı" };
}

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();
  const { title, subtitle } = getHeaderContent(pathname, events);

  useEffect(() => {
    document.title =
      pathname === "/" ? "Kampüs Etkinlikleri" : `${title} — Kampüs Etkinlikleri`;
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export default Header;
