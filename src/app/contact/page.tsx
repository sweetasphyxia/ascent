'use client'

import { useState } from 'react'
import { Container, Heading, Text, Input, Button, Divider } from '@/components/ui'
import { MapPin, Mail, Phone, type LucideProps } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Имитация отправки формы
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  return (
    <>
      {/* === HERO === */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-black border-b border-brand-gray-800">
        <Container size="xl">
          <Text variant="eyebrow" className="mb-6">Get in Touch</Text>
          {/* ✅ ИСПРАВЛЕНО: text-display-xl! (v4 important) */}
          <Heading level={1} className="text-display-xl!">
            LET&apos;S <span className="text-stroke-white">TALK</span>
          </Heading>
        </Container>
      </section>

      {/* === КОНТЕНТ === */}
      <section className="py-20 md:py-32 bg-brand-black">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Левая колонка: Инфо */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <Heading level={3} className="mb-6">Contact Info</Heading>
                <Text variant="body" className="text-brand-gray-400 mb-8">
                  Есть вопросы о сотрудничестве, оптовых закупках или просто хочешь сказать привет? 
                  Мы на связи.
                </Text>
                
                <div className="space-y-6">
                  <ContactItem 
                    icon={Mail} 
                    label="Email" 
                    value="hello@ascent.brand" 
                    href="mailto:hello@ascent.brand" 
                  />
                  <ContactItem 
                    icon={Phone} 
                    label="Phone" 
                    value="+7 (999) 123-45-67" 
                    href="tel:+79991234567" 
                  />
                  <ContactItem 
                    icon={MapPin} 
                    label="Showroom" 
                    value="Москва, Берсеневская наб., 12" 
                  />
                </div>
              </div>

              <Divider />

              <div>
                <Heading level={4} className="mb-4">Hours</Heading>
                <div className="space-y-2 text-sm text-brand-gray-400">
                  <div className="flex justify-between">
                    <span>Пн — Пт</span>
                    <span className="text-brand-white tabular-nums">10:00 — 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Сб — Вс</span>
                    <span className="text-brand-white tabular-nums">12:00 — 18:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка: Форма */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="First Name" name="firstName" required placeholder="John" />
                  <Input label="Last Name" name="lastName" required placeholder="Doe" />
                </div>
                
                <Input label="Email" type="email" name="email" required placeholder="john@example.com" />
                
                <div>
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-brand-gray-400 mb-2">
                    Subject
                  </label>
                  <select 
                    name="subject"
                    className="w-full bg-transparent text-brand-white border-b border-brand-gray-600 focus:border-brand-white transition-colors duration-300 outline-none py-3"
                  >
                    <option value="general" className="bg-brand-black">General Inquiry</option>
                    <option value="wholesale" className="bg-brand-black">Wholesale</option>
                    <option value="press" className="bg-brand-black">Press & Media</option>
                    <option value="support" className="bg-brand-black">Customer Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-brand-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us what&apos;s on your mind..."
                    className="w-full bg-transparent text-brand-white placeholder:text-brand-gray-500 border-b border-brand-gray-600 focus:border-brand-white transition-colors duration-300 outline-none py-3 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="xl" 
                  fullWidth
                  disabled={isSubmitted}
                >
                  {isSubmitted ? 'Message Sent ✓' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

// ✅ ИСПРАВЛЕНО: правильный тип LucideProps вместо any
function ContactItem({ 
  icon: Icon, 
  label, 
  value, 
  href 
}: { 
  icon: React.ComponentType<LucideProps>
  label: string
  value: string
  href?: string
}) {
  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Wrapper 
      {...wrapperProps}
      className="flex items-start gap-4 group"
    >
      <div className="w-10 h-10 border border-brand-gray-700 flex items-center justify-center shrink-0 group-hover:border-brand-white transition-colors">
        <Icon className="h-4 w-4 text-brand-gray-400 group-hover:text-brand-white transition-colors" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-500 mb-1">{label}</p>
        <p className="text-brand-white group-hover:text-brand-gray-300 transition-colors">{value}</p>
      </div>
    </Wrapper>
  )
}