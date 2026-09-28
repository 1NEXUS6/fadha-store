import { useState, useEffect } from 'react'

const products = [
  { id: 1, name: 'خاتم الماس الفضي', category: 'rings', price: 450, oldPrice: 600, img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600', rating: 4.8, size: 'large' },
  { id: 2, name: 'سوار الفضة الملكي', category: 'bracelets', price: 320, oldPrice: 400, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', rating: 4.9, size: 'small' },
  { id: 3, name: 'عقد القمر الفضي', category: 'necklaces', price: 580, oldPrice: 750, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', rating: 5.0, size: 'tall' },
  { id: 4, name: 'أقراط اللؤلؤ', category: 'earrings', price: 280, oldPrice: 350, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', rating: 4.7, size: 'small' },
  { id: 5, name: 'خاتم الفضة النقي', category: 'rings', price: 390, oldPrice: 500, img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600', rating: 4.6, size: 'small' },
  { id: 6, name: 'سوار الحظ', category: 'bracelets', price: 260, oldPrice: 340, img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600', rating: 4.9, size: 'large' },
]

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'rings', name: 'خواتم' },
  { id: 'bracelets', name: 'أساور' },
  { id: 'necklaces', name: 'عقود' },
  { id: 'earrings', name: 'أقراط' },
]

const heroRings = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
]

function App() {
  const [filter, setFilter] = useState('all')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [tilt, setTilt] = useState({})

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(`✦ أُضيف "${product.name}"`)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id))

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const handleTilt = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 25
    const y = (e.clientY - rect.top - rect.height / 2) / 25
    setTilt(prev => ({ ...prev, [id]: { x, y } }))
  }

  const resetTilt = (id) => setTilt(prev => ({ ...prev, [id]: { x: 0, y: 0 } }))

  return (
    <div className="min-h-screen bg-[#17171a] text-white overflow-x-hidden relative">

      {/* Pearl Gradient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-white/10 via-gray-300/5 to-transparent rounded-full filter blur-[150px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-gray-400/8 to-transparent rounded-full filter blur-[130px] animate-float-delayed"></div>
      </div>

      {/* Grain */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-6 py-3.5 rounded-2xl bg-[#1e1e22] border border-white/15 text-white text-sm font-medium shadow-2xl animate-slide-up flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          {toast}
        </div>
      )}

      {/* ===== Navbar ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#17171a]/80 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white via-gray-200 to-gray-500 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-white/10">
                <span className="text-black font-serif font-bold text-xl">ف</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif text-xl tracking-[0.2em] bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                FADHA
              </h1>
              <p className="text-[8px] tracking-[0.5em] text-gray-500 -mt-0.5">PURE · 925</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1.5">
            {['الرئيسية', 'المتجر', 'المجموعات', 'عنّا'].map((l, i) => (
              <a key={i} href="#" className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO — Centered with Orbit Gallery ===== */}
      <section className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] tracking-[0.4em] uppercase mb-10 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            New Collection 2025
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-8 animate-fade-up">
            <span className="block bg-gradient-to-br from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
              أناقة
            </span>
            <span className="block italic text-gray-500 text-5xl md:text-7xl lg:text-8xl my-2">بلمسة</span>
            <span className="block bg-gradient-to-br from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
              فضية
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            مجموعة فاخرة من الفضة الإسترليني عيار 925، مصممة بحرفية عالية لتروي قصة أناقتك.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <a href="#shop" className="group px-8 py-4 rounded-full bg-gradient-to-r from-white to-gray-200 text-black font-bold hover:shadow-2xl hover:shadow-white/20 transition-all hover:scale-105">
              تسوق الآن <span className="inline-block group-hover:translate-x-1 transition">→</span>
            </a>
            <a href="#" className="px-8 py-4 rounded-full border border-white/15 hover:bg-white/[0.04] transition font-medium text-gray-300">
              استكشف المجموعات
            </a>
          </div>

          {/* Orbit Gallery */}
          <div className="relative h-[200px] md:h-[280px] hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {heroRings.map((img, i) => {
                const total = heroRings.length
                const angle = (360 / total) * i
                const radius = 260
                const rad = (angle * Math.PI) / 180
                const x = Math.cos(rad) * radius
                const y = Math.sin(rad) * radius * 0.35
                return (
                  <div
                    key={i}
                    className="absolute w-24 h-24 lg:w-28 lg:h-28 rounded-3xl overflow-hidden border border-white/[0.08] shadow-xl shadow-black/50 hover:scale-125 hover:z-20 transition-all duration-500 animate-fade-up"
                    style={{
                      transform: `translate(${x}px, ${y}px) rotate(${angle * 0.05}deg)`,
                      animationDelay: `${0.5 + i * 0.1}s`,
                    }}
                  >
                    <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-16 mt-16 border-t border-white/[0.06] animate-fade-up" style={{ animationDelay: '0.6s' }}>
            {[
              { n: '925', l: 'عيار الفضة' },
              { n: '100%', l: 'فضة أصلية' },
              { n: '24/7', l: 'خدمة العملاء' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-serif text-3xl md:text-4xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section id="shop" className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-3">Browse Collection</p>
            <h2 className="font-serif text-4xl md:text-5xl">تصفح المجموعات</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all border ${
                  filter === c.id
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Products — Bento Grid ===== */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((p, i) => {
            const spanClass = p.size === 'large' ? 'col-span-2 md:col-span-2 md:row-span-2' :
                              p.size === 'tall' ? 'row-span-2' : ''
            const aspectClass = p.size === 'large' ? 'aspect-square md:aspect-auto md:h-full' :
                                p.size === 'tall' ? 'aspect-[3/4] md:h-full' : 'aspect-square'

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => { setHoveredId(null); resetTilt(p.id) }}
                onMouseMove={(e) => handleTilt(e, p.id)}
                className={`group relative rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all duration-500 ${spanClass}`}
                style={{
                  animation: `fadeUp 0.7s ease-out ${i * 0.08}s both`,
                  transform: hoveredId === p.id ? `perspective(1000px) rotateX(${-(tilt[p.id]?.y || 0)}deg) rotateY(${tilt[p.id]?.x || 0}deg) scale(1.02)` : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${aspectClass}`}>
                  <img
                    src={p.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale-[30%] group-hover:grayscale-0"
                    alt={p.name}
                  />

                  {/* Shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Discount */}
                  {p.oldPrice && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#17171a]/90 backdrop-blur border border-white/20 text-[10px] uppercase tracking-widest text-white font-semibold">
                      -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                    </div>
                  )}

                  {/* Quick add - floating circle */}
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(p) }}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-xl"
                  >
                    +
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-white text-xs">★</span>
                    <span className="text-[11px] text-gray-400">{p.rating}</span>
                  </div>
                  <h3 className="font-medium text-sm md:text-base text-white mb-2 leading-snug">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl md:text-2xl">{p.price}</span>
                    <span className="text-[10px] text-gray-500">ر.س</span>
                    {p.oldPrice && (
                      <span className="text-xs text-gray-600 line-through mr-auto">{p.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ===== Features — Editorial Row ===== */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="border-t border-white/[0.06] pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: '01', title: 'شحن مجاني', desc: 'للطلبات فوق 500 ر.س' },
              { num: '02', title: 'فضة أصلية', desc: 'عيار 925 مضمون' },
              { num: '03', title: 'استبدال مجاني', desc: 'خلال 30 يوم' },
              { num: '04', title: 'ضمان مدى الحياة', desc: 'على جميع القطع' },
            ].map((f, i) => (
              <div key={i} className="group">
                <p className="font-serif text-5xl text-white/[0.08] mb-3 group-hover:text-white/20 transition">{f.num}</p>
                <h3 className="font-medium mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white via-gray-200 to-gray-500 flex items-center justify-center">
                  <span className="text-black font-serif font-bold">ف</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-widest">FADHA</h3>
                  <p className="text-[8px] tracking-[0.4em] text-gray-500">PURE SILVER</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                فضة إسترليني أصلية بلمسة حرفية راقية. مصنوعة بحب، مُصممة لتدوم.
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-5">المتجر</p>
              <div className="space-y-3 text-sm text-gray-400">
                <p className="hover:text-white transition cursor-pointer">خواتم</p>
                <p className="hover:text-white transition cursor-pointer">أساور</p>
                <p className="hover:text-white transition cursor-pointer">عقود</p>
                <p className="hover:text-white transition cursor-pointer">أقراط</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-5">المساعدة</p>
              <div className="space-y-3 text-sm text-gray-400">
                <p className="hover:text-white transition cursor-pointer">الشحن</p>
                <p className="hover:text-white transition cursor-pointer">الإرجاع</p>
                <p className="hover:text-white transition cursor-pointer">الضمان</p>
                <p className="hover:text-white transition cursor-pointer">تواصل</p>
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-5">تواصل</p>
              <div className="space-y-3 text-sm text-gray-400">
                <p>hello@fadha.sa</p>
                <p>+966 500 000 000</p>
                <p>الرياض، السعودية</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-gray-500">
            <span>© 2025 FADHA · جميع الحقوق محفوظة</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Cart Drawer ===== */}
      {cartOpen && (
        <div onClick={() => setCartOpen(false)} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md animate-fade-in">
          <div
            onClick={e => e.stopPropagation()}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#1e1e22] border-l border-white/10 shadow-2xl flex flex-col animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div>
                <h3 className="font-serif text-2xl">سلة التسوق</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{cartCount} قطع</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-4xl opacity-40">🛍️</div>
                  <p className="text-gray-400 mb-2">السلة فارغة</p>
                  <p className="text-xs text-gray-600">ابدأ بإضافة قطعك المفضلة</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition group">
                    <img src={item.img} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.qty} × {item.price} ر.س</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg">{item.qty * item.price} ر.س</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-gray-500 hover:text-red-400 transition">
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/[0.06] bg-white/[0.01]">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs uppercase tracking-widest text-gray-500">الإجمالي</span>
                  <span className="font-serif text-3xl">{total} <span className="text-sm text-gray-500">ر.س</span></span>
                </div>
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-white to-gray-200 text-black font-bold hover:shadow-2xl hover:shadow-white/20 transition-all hover:scale-[1.02]">
                  إتمام الشراء →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default App