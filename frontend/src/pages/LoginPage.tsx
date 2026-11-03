import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const found: LoginErrors = {};

    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section className="auth-kutu">
      {sent && (
        <p className="mesaj mesaj-basari">
          Form geçerli. Gerçek giriş Sprint 10&apos;da.
        </p>
      )}

      <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
        <label htmlFor="login-email">E-posta</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && <span className="hata-metni">{errors.email}</span>}

        <label htmlFor="login-password">Şifre</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
        />
        {errors.password && (
          <span className="hata-metni">{errors.password}</span>
        )}

        <div className="form-butonlari">
          <button type="submit">Giriş yap</button>
        </div>
      </form>

      <p className="auth-links">
        <Link to="/forgot-password">Şifremi unuttum</Link>{" "}
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </section>
  );
}

export default LoginPage;
