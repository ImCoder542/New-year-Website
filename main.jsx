import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Single-file React component for a festive New Year landing page
// Uses Tailwind CSS classes and framer-motion for animations.
// Drop this file into a CRA/Vite project, make sure Tailwind and framer-motion are installed.

export default function NewYearLanding() {
  const now = new Date();
  const nextYear = now.getFullYear() + (now.getMonth() === 11 && now.getDate() === 31 ? 1 : 1);
  const target = new Date(nextYear, 0, 1, 0, 0, 0);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [menuOpen, setMenuOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [gifts, setGifts] = useState([
    { id: 1, text: "Подарочная карта любимому", done: false },
    { id: 2, text: "Тёплый плед и горячий шоколад", done: false },
    { id: 3, text: "Набор для уютного вечера", done: false },
  ]);

  function getTimeLeft() {
    const diff = target - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      setConfetti(true);
      const t = setTimeout(() => setConfetti(false), 8000);
      return () => clearTimeout(t);
    }
  }, [timeLeft]);

  function toggleGift(id) {
    setGifts((g) => g.map(item => item.id === id ? { ...item, done: !item.done } : item));
  }

  function addGift(text) {
    if (!text) return;
    setGifts(g => [...g, { id: Date.now(), text, done: false }]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-black text-white overflow-hidden relative">
      {/* decorative snow (CSS-driven) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="snowLayer1" />
        <div className="snowLayer2" />
      </div>

      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center shadow-2xl ring-1 ring-white/20">🎆</div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Новый Год — Праздник открытий</h1>
            <p className="text-sm text-white/70">Красивый, полезный и вдохновляющий сайт</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#countdown" className="hover:underline">Обратный отсчёт</a>
          <a href="#ideas" className="hover:underline">Идеи</a>
          <a href="#recipes" className="hover:underline">Рецепты</a>
          <a href="#tips" className="hover:underline">Полезно</a>
          <button
            onClick={() => setMenuOpen(true)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >Меню</button>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/90">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 bg-black/60 z-40">
          <div className="absolute right-4 top-4">
            <button onClick={() => setMenuOpen(false)} className="p-2 bg-white/10 rounded">✕</button>
          </div>
          <div className="p-8 pt-24">
            <a href="#countdown" onClick={() => setMenuOpen(false)} className="block py-3 text-xl">Обратный отсчёт</a>
            <a href="#ideas" onClick={() => setMenuOpen(false)} className="block py-3 text-xl">Идеи</a>
            <a href="#recipes" onClick={() => setMenuOpen(false)} className="block py-3 text-xl">Рецепты</a>
            <a href="#tips" onClick={() => setMenuOpen(false)} className="block py-3 text-xl">Полезно</a>
          </div>
        </motion.div>
      )}

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section className="grid md:grid-cols-2 gap-8 items-center mt-6">
          <div>
            <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold leading-tight">
              Встречаем Новый год красиво — вдохновляйтесь и готовьтесь!
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-white/80">
              Подборки идей, рецептов, чек-листов и полезных советов — всё, чтобы праздник получился ярким, уютным и безопасным.
            </motion.p>

            <div className="mt-6 flex gap-3">
              <a href="#ideas" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-amber-400 shadow-lg text-black font-semibold">
                Начать просматривать
              </a>
              <a href="#countdown" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10">
                Обратный отсчёт
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <StatCard title="Украшения" value="DIY и идеи" />
              <StatCard title="Подарки" value="Идеи и чек-листы" />
              <StatCard title="Рецепты" value="Быстро и вкусно" />
            </div>
          </div>

          <div className="relative">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/5 p-6 rounded-3xl shadow-2xl">
              <CountdownBox timeLeft={timeLeft} target={target} />
            </motion.div>

            {/* small fireworks animation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute -right-10 -top-10">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 to-yellow-400 blur-2xl opacity-40" />
            </motion.div>
          </div>
        </section>

        <section id="ideas" className="mt-12">
          <SectionTitle>Идеи для праздника</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <IdeaCard emoji="🎁" title="Подарки своими руками" text="Сделайте фотоколлаж, набор для уютного вечера или мини-сафари с памятными мелочами." />
            <IdeaCard emoji="✨" title="Украшения из бумаги" text="Красивые гирлянды, снежинки и подвески легко сделать дома — это занятие для всей семьи." />
            <IdeaCard emoji="🎶" title="Плейлист настроения" text="Подготовьте 2-3 тематических плейлиста: ретро-хиты, спокойный вечер и танцевальная программа для гостей." />
          </div>
        </section>

        <section id="recipes" className="mt-12">
          <SectionTitle>Быстрые праздничные рецепты</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <RecipeCard title="Горячий шоколад с маршмеллоу" minutes={10} />
            <RecipeCard title="Запечённые яблоки с корицей" minutes={25} />
            <RecipeCard title="Закуски на шпажках" minutes={15} />
          </div>
        </section>

        <section id="tips" className="mt-12">
          <SectionTitle>Полезные советы</SectionTitle>
          <div className="bg-white/5 rounded-2xl p-6">
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="p-4 rounded-lg bg-white/3">Безопасность: проверьте гирлянды на целостность, не оставляйте свечи без присмотра.</li>
              <li className="p-4 rounded-lg bg-white/3">Экономно: планируйте меню заранее, используйте сезонные продукты.</li>
              <li className="p-4 rounded-lg bg-white/3">Уют: мягкое освещение и пледы создают атмосферу тепла.</li>
              <li className="p-4 rounded-lg bg-white/3">Экология: избегайте одноразовых аксессуаров — выбирайте многоразовые или перерабатываемые материалы.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle>Чек-лист подарков</SectionTitle>
            <div className="bg-white/5 p-6 rounded-2xl">
              <GiftList gifts={gifts} toggleGift={toggleGift} addGift={addGift} />
            </div>
          </div>

          <div>
            <SectionTitle>Планируем мероприятие</SectionTitle>
            <div className="bg-white/5 p-6 rounded-2xl">
              <EventPlanner />
            </div>
          </div>
        </section>

      </main>

      {/* confetti overlay */}
      {confetti && <ConfettiOverlay />}

      <footer className="mt-12 py-8 text-center text-white/70">
        <div>© {new Date().getFullYear()} Праздничный сайт — сделано с любовью ❤️</div>
      </footer>

      {/* Inline styles for snow and small helpers (put in global CSS in production) */}
      <style>{`
        .snowLayer1, .snowLayer2 { position: absolute; inset: 0; background-image: radial-gradient(white 1px, transparent 1px); background-size: 6px 6px; opacity: 0.05; animation: drift 20s linear infinite; }
        .snowLayer2 { background-size: 10px 10px; opacity: 0.03; animation-duration: 35s; }
        @keyframes drift { from { transform: translateY(-10%) translateX(0); } to { transform: translateY(110%) translateX(40%); } }

        /* confetti pieces */
        .confetti-piece { width: 9px; height: 14px; position: absolute; top: -10%; opacity: 0.95; transform: rotate(0deg); }
      `}</style>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-4 rounded-xl bg-white/3 backdrop-blur-sm">
      <div className="text-xs text-white/70">{title}</div>
      <div className="text-lg font-semibold mt-2">{value}</div>
    </div>
  );
}

function CountdownBox({ timeLeft, target }) {
  return (
    <div id="countdown" className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <div className="text-xs text-white/70">До</div>
        <h3 className="text-2xl font-bold">{target.getFullYear()}-01-01</h3>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <TimeBlock label="Дн" value={timeLeft.days} />
        <TimeBlock label="Ч" value={timeLeft.hours} />
        <TimeBlock label="Мин" value={timeLeft.minutes} />
        <TimeBlock label="Сек" value={timeLeft.seconds} />
      </div>

      <div className="mt-2 text-sm text-white/70">Совет: попробуйте приготовить горячий шоколад прямо перед боем курантов — аромат создаст настроение.</div>
    </div>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-gradient-to-tr from-white/6 to-white/3 text-center">
      <div className="text-2xl font-bold tabular-nums">{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 className="text-2xl font-bold mb-4">{children}</h3>;
}

function IdeaCard({ emoji, title, text }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/4"> 
      <div className="text-3xl mb-3">{emoji}</div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm mt-2 text-white/70">{text}</div>
    </motion.article>
  );
}

function RecipeCard({ title, minutes }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-white/4">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-sm text-white/70 mt-2">Время: {minutes} мин</div>
      <div className="mt-4 text-sm">Простой рецепт: ингредиенты под рукой, 3 шага — и готово.</div>
    </motion.div>
  );
}

function GiftList({ gifts, toggleGift, addGift }) {
  const [text, setText] = useState("");
  return (
    <div>
      <ul className="space-y-2">
        {gifts.map(g => (
          <li key={g.id} className={`p-3 rounded-lg flex items-center justify-between ${g.done ? 'bg-green-600/30' : 'bg-white/3'}`}>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={g.done} onChange={() => toggleGift(g.id)} />
              <span className={g.done ? 'line-through text-white/70' : ''}>{g.text}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Добавить идею" className="flex-1 rounded-lg p-2 bg-white/5" />
        <button onClick={() => { addGift(text); setText(""); }} className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold">Добавить</button>
      </div>
    </div>
  );
}

function EventPlanner() {
  const [items, setItems] = useState([
    { id: 1, time: '20:00', title: 'Сбор гостей' },
    { id: 2, time: '21:30', title: 'Игры и конкурсы' },
    { id: 3, time: '23:50', title: 'Подготовка к бою курантов' },
  ]);

  return (
    <div>
      <ul className="space-y-2">
        {items.map(it => (
          <li key={it.id} className="p-3 rounded-lg bg-white/3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-white/70">{it.time}</div>
            </div>
            <div className="text-sm text-white/60">●</div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-white/70">Подсказка: делайте 1–2 активности до полуночи — гости устанут, если перегружать программу.</div>
    </div>
  );
}

function ConfettiOverlay() {
  // CSS-generated confetti (no external libs)
  const pieces = Array.from({ length: 40 });
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const rotate = Math.random() * 360;
        const size = 6 + Math.random() * 12;
        const colorChoices = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'];
        const bg = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        return (
          <div key={i}
            className="confetti-piece"
            style={{ left: `${left}%`, width: size + 'px', height: size * 1.4 + 'px', background: bg, transform: `rotate(${rotate}deg)`, animation: `fall 3s ${delay}s linear forwards` }}
          />
        );
      })}
      <style>{`@keyframes fall { to { transform: translateY(115vh) rotate(200deg); opacity: 0.9; } }`}</style>
    </div>
  );
}
