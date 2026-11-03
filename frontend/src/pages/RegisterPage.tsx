import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section className="auth-kutu">
      {sent && <p className="mesaj mesaj-basari">Kayıt formu geçerli (demo).</p>}

      <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
        <label htmlFor="register-name">Ad Soyad</label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name && <span className="hata-metni">{errors.name}</span>}

        <label htmlFor="register-email">E-posta</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && <span className="hata-metni">{errors.email}</span>}

        <label htmlFor="register-password">Şifre</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
        />
        {errors.password && (
          <span className="hata-metni">{errors.password}</span>
        )}

        <label htmlFor="register-password2">Şifre (tekrar)</label>
        <input
          id="register-password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          aria-invalid={errors.password2 ? true : undefined}
        />
        {errors.password2 && (
          <span className="hata-metni">{errors.password2}</span>
        )}

        <div className="form-butonlari">
          <button type="submit">Kayıt ol</button>
        </div>
      </form>

      <p className="auth-links">
        Zaten hesabın var mı? <Link to="/login">Giriş yap</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
