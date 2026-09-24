"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createPlan } from "@/services/plans";
import { getSession } from "@/services/session";

const copy = {
    es: {
        title: "Crear un nuevo plan",
        subtitle: "Organiza, invita a tus amigos o abre plazas para que otros miembros se sumen a vivir momentos únicos.",
        image: "Foto de portada del plan", imageHint: "Copia el enlace de una imagen",
        imageHelp: "Haz que tu plan destaque a primera vista", name: "Nombre del plan",
        address: "Dirección", price: "Precio estimado", time: "Duración (minutos)",
        description: "Descripción del plan", recommendations: "Recomendaciones para los asistentes",
        recommendationsHelp: "Agrega tips clave como vestimenta recomendada, qué llevar o recordatorios puntuales.",
        cancel: "Cancelar", submit: "Publicar plan", saving: "Publicando...",
        validation: "Revisa los datos del formulario: nombre entre 2 y 50 caracteres, precio mayor que 0, duración entera positiva y descripción de 1 a 599 caracteres.",
        serverError: "No se pudo publicar el plan. Inténtalo de nuevo.",
        nameExample: "Ej. Tarde de paddle surf y atardecer",
        addressExample: "Ej. Bahía de las Brisas · Muelle Norte",
        descriptionExample: "Cuéntale a todos de qué va el plan, cuál es la vibra del grupo, el itinerario aproximado y qué lo hace especial...",
        recommendationsExample: "Ej. Llevar protector solar, toalla y agua",
    },
    en: {
        title: "Create a new plan",
        subtitle: "Organize, invite your friends or open spots for other members to join you.",
        image: "Plan cover photo", imageHint: "Paste an image URL",
        imageHelp: "Make your plan stand out", name: "Plan name", address: "Address",
        price: "Estimated price", time: "Duration (minutes)", description: "Plan description",
        recommendations: "Recommendations for attendees",
        recommendationsHelp: "Add useful tips about clothing, what to bring, or reminders.",
        cancel: "Cancel", submit: "Publish plan", saving: "Publishing...",
        validation: "Check the form: name 2–50 characters, price above 0, positive whole number of minutes, and description 1–599 characters.",
        serverError: "Could not publish the plan. Please try again.",
        nameExample: "E.g. Paddleboarding at sunset", addressExample: "E.g. North Pier",
        descriptionExample: "Tell everyone about the plan, the group and the itinerary...",
        recommendationsExample: "E.g. Bring sunscreen, a towel and water",
    },
    };

    export default function NewPlanPage() {
    const { lang } = useParams<{ lang: string }>();
    const locale = lang === "en" ? "en" : "es";
    const t = copy[locale];
    const router = useRouter();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [description, setDescription] = useState("");
    const [recommendations, setRecommendations] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!getSession().id) router.replace(`/${locale}/auth/login`);
    }, [locale, router]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        const userId = getSession().id;
        if (!userId) {
        router.replace(`/${locale}/auth/login`);
        return;
        }
        const price = Number(estimatedPrice);
        const minutes = Number(estimatedTime);
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        if (trimmedName.length < 2 || trimmedName.length > 50 || !address.trim() ||
            !Number.isFinite(price) || price <= 0 || !Number.isInteger(minutes) || minutes <= 0 ||
            trimmedDescription.length < 1 || trimmedDescription.length >= 600) {
        setError(t.validation);
        return;
        }
        setSaving(true);
        try {
        await createPlan({
            name: trimmedName, address: address.trim(), estimatedPrice: price,
            estimatedTime: minutes, description: trimmedDescription,
            recommendations: recommendations.trim(),
            image: image.trim() || "https://picsum.photos/seed/plan/1200/700",
            userId,
        });
        router.push(`/${locale}/plans`);
        } catch (cause) {
        setError(cause instanceof Error ? cause.message : t.serverError);
        setSaving(false);
        }
    }

    const inputClass = "mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600";
    const labelClass = "block text-sm font-semibold text-slate-900";

    return (
        <main className="flex-1 bg-slate-50 px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
            <p className="mt-1 text-sm text-slate-600">{t.subtitle}</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="image" className={labelClass}>{t.image}</label>
                <span className="text-xs text-slate-600">{t.imageHint}</span>
                </div>
                <div className="mt-3 rounded-xl border border-dashed border-blue-300 px-5 py-7 text-center">
                <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">▧</span>
                <p id="image-help" className="mt-2 text-sm text-slate-600">{t.imageHelp}</p>
                <input id="image" name="image" type="url" value={image} onChange={e => setImage(e.target.value)}
                    aria-describedby="image-help" placeholder="https://..." className={inputClass} />
                </div>
            </div>
            <div>
                <label htmlFor="name" className={labelClass}>{t.name} <span aria-hidden="true" className="text-red-700">*</span></label>
                <input id="name" name="name" type="text" required minLength={2} maxLength={50}
                value={name} onChange={e => setName(e.target.value)} placeholder={t.nameExample} className={inputClass} />
            </div>
            <div>
                <label htmlFor="address" className={labelClass}>{t.address} <span aria-hidden="true" className="text-red-700">*</span></label>
                <input id="address" name="address" type="text" required value={address}
                onChange={e => setAddress(e.target.value)} placeholder={t.addressExample} className={inputClass} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                <label htmlFor="estimatedPrice" className={labelClass}>{t.price} <span aria-hidden="true" className="text-red-700">*</span></label>
                <input id="estimatedPrice" name="estimatedPrice" type="number" required min="0.01" step="any"
                    value={estimatedPrice} onChange={e => setEstimatedPrice(e.target.value)} placeholder="25000" className={inputClass} />
                </div>
                <div>
                <label htmlFor="estimatedTime" className={labelClass}>{t.time} <span aria-hidden="true" className="text-red-700">*</span></label>
                <input id="estimatedTime" name="estimatedTime" type="number" required min="1" step="1"
                    value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)} placeholder="120" className={inputClass} />
                </div>
            </div>
            <div>
                <div className="flex justify-between gap-2">
                <label htmlFor="description" className={labelClass}>{t.description} <span aria-hidden="true" className="text-red-700">*</span></label>
                <span id="description-count" className="text-xs text-slate-600">{description.length} / 599</span>
                </div>
                <textarea id="description" name="description" required maxLength={599} rows={4}
                aria-describedby="description-count" value={description} onChange={e => setDescription(e.target.value)}
                placeholder={t.descriptionExample} className={inputClass} />
            </div>
            <div>
                <label htmlFor="recommendations" className={labelClass}>{t.recommendations}</label>
                <p id="recommendations-help" className="mt-1 text-xs text-slate-600">{t.recommendationsHelp}</p>
                <input id="recommendations" name="recommendations" type="text" aria-describedby="recommendations-help"
                value={recommendations} onChange={e => setRecommendations(e.target.value)}
                placeholder={t.recommendationsExample} className={inputClass} />
            </div>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <Link href={`/${locale}/plans`} className="rounded-lg bg-slate-100 px-5 py-3 font-semibold text-slate-800">{t.cancel}</Link>
                <button type="submit" disabled={saving} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white disabled:opacity-50">
                {saving ? t.saving : t.submit}
                </button>
            </div>
            </form>
        </div>
        </main>
    );
}
