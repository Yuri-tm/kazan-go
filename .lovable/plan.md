

## Kazan Landing Page -- Full Refactor Plan

This is a major refactor that transforms the current simple page-flip UI into a cinematic, scroll-driven landing page with 6 distinct sections, Ken Burns background effects, parallax, glassmorphism contact form, and Telegram bot integration.

### Architecture

The current single-component `Index.tsx` with clip-path page flipping will be replaced with a vertical scroll-based layout. Each section is a full-viewport component with its own Ken Burns background animation and content.

```text
src/
  pages/Index.tsx          -- Main page, assembles all sections
  components/sections/
    HeroSection.tsx         -- Split-screen hero (crowded vs Kazan)
    WaterSection.tsx        -- Water recreation with hoverable cards
    MedicalSection.tsx      -- Medical/wellness
    FamilySection.tsx       -- Family attractions carousel
    ServicesSection.tsx     -- Service cards with parallax
    ContactSection.tsx      -- Glassmorphism form + Telegram submit
  components/
    KenBurnsBackground.tsx  -- Reusable animated background component
    ScrollReveal.tsx        -- Intersection Observer wrapper for fade-in
  hooks/
    useIntersectionObserver.ts
  index.css                 -- Ken Burns keyframes, glassmorphism utilities
  supabase/functions/send-telegram/index.ts  -- Edge function
```

### Files to Create/Modify

**1. `src/index.css`** -- Add Kazan color palette, Ken Burns keyframes, glassmorphism classes

- CSS custom properties for Tatar palette (teal `174 60% 35%`, deep red `0 70% 40%`, gold `43 90% 55%`, emerald `150 50% 35%`)
- Ken Burns keyframes: `ken-burns-zoom-in`, `ken-burns-zoom-out`, `ken-burns-pan-left`, `ken-burns-diagonal`
- Glassmorphism utility: `backdrop-blur-xl bg-white/10 border border-white/20`
- Smooth scroll-snap on body

**2. `tailwind.config.ts`** -- Extend with Kazan colors, Ken Burns animations, custom keyframes

**3. `src/components/KenBurnsBackground.tsx`** -- Reusable component
- Props: `image`, `effect` (zoom-in | zoom-out | pan-left | diagonal), `duration`, `overlay` (gradient config)
- Renders `<div>` with background image, CSS animation, and overlay gradient
- Uses `will-change: transform` for GPU acceleration

**4. `src/components/ScrollReveal.tsx`** -- Intersection Observer wrapper
- Wraps children, applies fade-in + translate-y when entering viewport
- Configurable threshold and delay for staggered animations

**5. `src/components/sections/HeroSection.tsx`** -- Section 1
- Full viewport, two halves separated by animated diagonal SVG divider
- Top: `crowded_crop.png` with zoom-in Ken Burns, overlay, title "На переполненный пляж?", subtext "есть места почище"
- Bottom: `rivyera_crop.jpg` with zoom-out Ken Burns, gradient overlay, title "Или культурный отдых в Казани?", subtext "отдых для души и для тела"
- CTA button "айда в Казань" with gold glow hover, scrolls to contact section
- Animated diagonal divider with animated arrow

**6. `src/components/sections/WaterSection.tsx`** -- Section 2
- `kamskoe_crop.jpg` Ken Burns background (diagonal pan + zoom, 10s)
- Dark gradient overlay top-to-bottom
- Title: "Отдых на воде", subtitle text
- 4 floating cards in a 2x2 grid: Riviera, Beach, Tatar Su, Аквазаврия
- Each card: background color/gradient, name, link, hover zoom 1.05x + brightness
- Parallax: background scrolls slower via CSS `background-attachment: fixed` or transform

**7. `src/components/sections/MedicalSection.tsx`** -- Section 3
- `doctors_small.jpg` Ken Burns (zoom-out + horizontal pan)
- Gradient overlay, title, subheading text
- Simple content with scroll-reveal fade-in

**8. `src/components/sections/FamilySection.tsx`** -- Section 4
- `children.jpg` Ken Burns (diagonal pan + zoom-in)
- Title: "Отдых всей семьёй"
- Auto-playing carousel (5s crossfade) with 4 attraction cards: Экият, Елмай, Замбези, Цирк
- Navigation dots, text overlays with fade-in

**9. `src/components/sections/ServicesSection.tsx`** -- Section 5
- `services.jpeg` Ken Burns (zoom-in + left-to-right pan)
- Title: "Ваш персональный помощник в Казани"
- 3 large cards with glassmorphism style: Размещение, Трансфер, Реабилитация
- Cards appear with staggered fade-in + zoom via ScrollReveal

**10. `src/components/sections/ContactSection.tsx`** -- Section 6
- `services.jpeg` or a gradient background, Ken Burns zoom-out
- Title: "Айда в Казань?"
- Glassmorphism form container (backdrop-blur-xl, bg-white/10, border-white/20, rounded-2xl)
- Fields: Name (slide-in left), Phone (slide-in right), Message textarea (fade-in)
- Submit button "Отправить в Telegram" with pulse animation
- Glow effect on input focus
- Form validation with zod, react-hook-form
- On submit: calls Supabase edge function `send-telegram`

**11. `src/pages/Index.tsx`** -- Refactored
- Imports and renders all 6 section components in order
- `scroll-smooth` on container, `snap-y snap-mandatory` for section snapping
- Each section is `min-h-screen snap-start`

**12. Telegram Edge Function: `supabase/functions/send-telegram/index.ts`**
- Validates input with zod (name, phone, message)
- Calls Telegram Bot API via connector gateway
- CORS headers, error handling
- Requires Telegram connector to be linked via `standard_connectors--connect`

### Technical Details

- **Ken Burns**: Pure CSS `@keyframes` with `transform: scale() translate()`, 8-12s duration, infinite alternate
- **Parallax**: CSS `transform: translateZ()` with `perspective` on parent, or `background-attachment: fixed` for simple parallax
- **Scroll animations**: Intersection Observer API with `threshold: 0.1`, adding CSS classes on entry
- **Carousel**: `useState` + `setInterval` for auto-advance, CSS `opacity` transitions for crossfade
- **Glassmorphism**: `backdrop-filter: blur(20px)`, `background: rgba(255,255,255,0.1)`, `border: 1px solid rgba(255,255,255,0.2)`
- **Performance**: `will-change: transform` on Ken Burns elements, `loading="lazy"` on images, CSS transforms only

### Telegram Integration Steps

1. Connect Telegram connector via `standard_connectors--connect`
2. Create edge function that receives form data and sends via gateway
3. Frontend calls `supabase.functions.invoke('send-telegram', { body: formData })`

