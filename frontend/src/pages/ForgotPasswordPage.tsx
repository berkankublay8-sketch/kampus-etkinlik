import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section className="auth-kutu">
      <p>
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
        <label htmlFor="forgot-email">E-posta</label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
        {error && <span className="hata-metni">{error}</span>}

        <div className="form-butonlari">
          <button type="submit">Bağlantı gönder</button>
        </div>
      </form>

      <p className="auth-links">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </section>
  );
}

export default ForgotPasswordPage;
