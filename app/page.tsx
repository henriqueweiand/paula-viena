import Image from 'next/image'

const WHATSAPP_NUMBER = '5547999949255' // E.164 sem +  (BR +55, DDD 47)
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá Paula, gostaria de agendar uma conversa inicial.'
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
const INSTAGRAM_URL = 'https://instagram.com/paulaviena_psicanalista'

function Magnolia() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Back petal */}
      <path d="M100 28c-22 10-34 32-28 58 4 17 15 28 28 32 13-4 24-15 28-32 6-26-6-48-28-58z" />
      {/* Left petal */}
      <path d="M72 86c-20-4-38 6-46 24 14 8 30 8 44 1 10-5 16-14 17-24-4-1-10-1-15-1z" />
      {/* Right petal */}
      <path d="M128 86c20-4 38 6 46 24-14 8-30 8-44 1-10-5-16-14-17-24 4-1 10-1 15-1z" />
      {/* Center */}
      <path d="M100 82c-6 6-10 14-10 22 0 10 5 18 10 22 5-4 10-12 10-22 0-8-4-16-10-22z" />
      {/* Stamen dots */}
      <circle cx="100" cy="100" r="1.6" fill="currentColor" />
      <circle cx="96" cy="106" r="1.2" fill="currentColor" />
      <circle cx="104" cy="106" r="1.2" fill="currentColor" />
      {/* Leaf */}
      <path d="M70 140c10 4 24 4 36-2 10-5 16-13 20-22" />
      <path d="M80 142c14-2 28-8 38-20" opacity="0.6" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#6c2c72] text-white font-sans">
      {/* ── Hero (purple) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Decorative magnolia */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-20 w-[540px] opacity-[0.08] select-none text-white"
        >
          <Magnolia />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-16 pb-20 text-center relative">
          {/* Logo / wordmark */}
          <div className="mx-auto mb-10 flex flex-col items-center">
            <div className="w-24 h-24 text-white/85">
              <Magnolia />
            </div>
            <h1 className="-mt-2 font-signature text-5xl md:text-6xl tracking-wide">
              Paula Viena
            </h1>
            <p className="mt-1 text-[0.7rem] tracking-[0.35em] uppercase text-white/80">
              Psicanalista
            </p>
          </div>

          {/* Main headline */}
          <h2 className="text-3xl md:text-4xl font-light leading-tight">
            Você aprendeu a ser forte
            <br />
            para todo mundo.{' '}
            <span className="font-semibold">Mas quem cuida de você?</span>
          </h2>

          {/* Supporting text */}
          <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mx-auto">
            Ansiedade, angústia, excesso de pensamentos, dificuldade nos
            relacionamentos ou sensação de estar perdido em si{' '}
            <span className="font-semibold">
              podem ser sinais de que algo dentro de você precisa ser escutado.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-12">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white text-[#6c2c72] px-8 py-4 text-base md:text-lg font-semibold shadow-lg hover:bg-white/90 hover:shadow-xl transition active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Agende uma conversa inicial
            </a>
            <p className="mt-4 text-sm text-white/70">
              Resposta por WhatsApp em poucas horas
            </p>
          </div>
        </div>
      </section>

      {/* ── About / Photo (green) ─────────────────────────────────── */}
      <section className="relative bg-[#4a6b3a] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 bottom-10 w-[560px] opacity-[0.09] select-none text-white"
        >
          <Magnolia />
        </div>

        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-xl mx-auto">
            A psicanálise é um espaço de fala, escuta e elaboração.{' '}
            <span className="font-semibold">
              Cuidar da saúde mental também é uma forma de cuidar da vida.
            </span>
          </p>

          <p className="mt-6 text-xl md:text-2xl font-semibold">
            Agende uma conversa inicial.
          </p>

          {/* Photo */}
          <div className="mt-12 flex justify-center">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/10 bg-white/5">
              <Image
                src="/paula.png"
                alt="Paula Viena, psicanalista"
                width={420}
                height={440}
                priority
                className="w-64 md:w-80 h-auto object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="mt-8">
            <h3 className="text-3xl md:text-4xl font-semibold">Paula Viena</h3>
            <p className="mt-1 text-white/85">Psicanalista</p>
          </div>

          {/* Info cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="rounded-2xl bg-white/10 backdrop-blur p-5 text-center">
              <p className="text-xs tracking-widest uppercase text-white/70">
                Atendimento
              </p>
              <p className="mt-2 font-semibold text-lg">Análise para adultos</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur p-5 text-center">
              <p className="text-xs tracking-widest uppercase text-white/70">
                Modalidade
              </p>
              <p className="mt-2 font-semibold text-lg">
                Atendimento presencial e online
              </p>
            </div>
          </div>

          {/* Closing statement */}
          <p className="mt-14 text-xl md:text-2xl font-semibold leading-snug max-w-lg mx-auto">
            Falar pode transformar aquilo que parecia impossível de suportar.
          </p>
        </div>
      </section>

      {/* ── Contact (deep purple) ─────────────────────────────────── */}
      <section className="bg-[#5a2460]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/70">Contato</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white text-[#5a2460] px-7 py-3 font-semibold shadow hover:bg-white/90 transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              47 99994-9255
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white/10 text-white px-7 py-3 font-semibold ring-1 ring-white/25 hover:bg-white/15 transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.268 2.163 12c0-3.204.012-3.584.07-4.849.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.148 0-3.518.012-4.762.068-1.014.046-1.57.216-1.94.359-.487.189-.835.415-1.2.781-.366.365-.592.713-.78 1.2-.144.371-.313.927-.36 1.94C2.905 9.59 2.892 9.96 2.892 13.11c0 3.148.012 3.518.068 4.762.046 1.014.216 1.57.359 1.94.189.487.415.835.781 1.2.365.366.713.592 1.2.78.371.144.927.313 1.94.36 1.245.056 1.615.068 4.762.068 3.148 0 3.518-.012 4.762-.068 1.014-.046 1.57-.216 1.94-.359.487-.189.835-.415 1.2-.781.366-.365.592-.713.78-1.2.144-.371.313-.927.36-1.94.056-1.245.068-1.615.068-4.762 0-3.148-.012-3.518-.068-4.762-.046-1.014-.216-1.57-.359-1.94-.189-.487-.415-.835-.781-1.2-.365-.366-.713-.592-1.2-.78-.371-.144-.927-.313-1.94-.36C15.518 2.175 15.148 2.163 12 2.163zm0 3.138a6.7 6.7 0 100 13.398 6.7 6.7 0 000-13.398zm0 11.06a4.362 4.362 0 110-8.723 4.362 4.362 0 010 8.723zm6.538-11.5a1.565 1.565 0 11-3.13 0 1.565 1.565 0 013.13 0z" />
              </svg>
              @paulaviena_psicanalista
            </a>
          </div>

          <p className="mt-10 text-xs text-white/60">
            © {new Date().getFullYear()} Paula Viena — Psicanalista. Todos os
            direitos reservados.
          </p>
        </div>
      </section>
    </main>
  )
}
