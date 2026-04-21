'use client'

import { useState, type ChangeEvent } from "react"

import { eventTypes } from "@/data/eventos"

type FormState = {
  name: string
  email: string
  phone: string
  eventType: string
  date: string
  message: string
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  date: "",
  message: "",
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialState)

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <div className="rounded-2xl bg-[#F7F3EE] p-6 sm:p-8">
      <h2 className="font-heading text-2xl text-[#1C1C1B]">
        Solicitar Orçamento
      </h2>

      <form
        action="mailto:contato@estaleirovillage.com"
        method="post"
        encType="text/plain"
        className="mt-6 space-y-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-[#1C1C1B]">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B6CA8] focus:outline-none"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-[#1C1C1B]">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B6CA8] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-medium text-[#1C1C1B]">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B6CA8] focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="eventType" className="text-sm font-medium text-[#1C1C1B]">
              Tipo de evento
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B6CA8] focus:outline-none"
              required
            >
              <option value="">Selecione uma opção</option>
              {eventTypes.map((eventType) => (
                <option key={eventType.id} value={eventType.title}>
                  {eventType.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium text-[#1C1C1B]">
              Data prevista
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B6CA8] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm font-medium text-[#1C1C1B]">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B6CA8] focus:outline-none"
            placeholder="Conte um pouco sobre o evento, numero de convidados e necessidades especiais."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-[#1B6CA8] py-3 font-medium text-white transition hover:bg-[#155a8e]"
        >
          Enviar solicitação
        </button>
      </form>
    </div>
  )
}
