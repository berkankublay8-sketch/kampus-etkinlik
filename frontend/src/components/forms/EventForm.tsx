import { useState, type ChangeEvent, type FormEvent } from "react";
import type {
  Category,
  EventFormData,
  EventFormErrors,
} from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void {
    const field = e.target.name as keyof EventFormData;
    const value = e.target.value;
    setData((current) => ({ ...current, [field]: value } as EventFormData));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">Etkinlik Adı</label>
      <input id="title" name="title" type="text" value={data.title} onChange={handleChange} aria-invalid={errors.title ? true : undefined} />
      {errors.title && <span className="hata-metni">{errors.title}</span>}

      <label htmlFor="category">Kategori</label>
      <select id="category" name="category" value={data.category} onChange={handleChange} aria-invalid={errors.category ? true : undefined}>
        <option value="">Seçiniz</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      {errors.category && <span className="hata-metni">{errors.category}</span>}

      <label htmlFor="date">Tarih</label>
      <input id="date" name="date" type="date" value={data.date} onChange={handleChange} aria-invalid={errors.date ? true : undefined} />
      {errors.date && <span className="hata-metni">{errors.date}</span>}

      <label htmlFor="time">Saat</label>
      <input id="time" name="time" type="time" value={data.time} onChange={handleChange} aria-invalid={errors.time ? true : undefined} />
      {errors.time && <span className="hata-metni">{errors.time}</span>}

      <label htmlFor="location">Yer</label>
      <input id="location" name="location" type="text" value={data.location} onChange={handleChange} aria-invalid={errors.location ? true : undefined} />
      {errors.location && <span className="hata-metni">{errors.location}</span>}

      <label htmlFor="capacity">Kontenjan</label>
      <input id="capacity" name="capacity" type="number" min="1" max="1000" value={data.capacity} onChange={handleChange} aria-invalid={errors.capacity ? true : undefined} />
      {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" name="description" rows={5} value={data.description} onChange={handleChange} aria-invalid={errors.description ? true : undefined} />
      {errors.description && <span className="hata-metni">{errors.description}</span>}

      <div className="form-butonlari">
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
}

export default EventForm;
