# DESIGN.md — Personal Portfolio

> **Source of truth for visual design.**  
> When Cursor (or any skill) conflicts with this file, **this file wins**.

---

## 1. Product vibe (one sentence)

A **macOS Finder-style personal OS**: calm, a little moody, slightly playful — not sterile white SaaS, not dark-cyber, not “AI purple gradient.”

Think: **Finder’s structure + Apple’s softness + a deeper sky / dusk-blue tint** (still clearly a *light* theme).

---

## 2. Visual reference

### Steal from Finder (structure & interaction)
- Left sidebar navigation with hierarchical folders
- Clear **selected row** (pill / rounded highlight)
- Icons + labels aligned in a list
- Section hierarchy (top-level folders expand to children)
- Traffic-light style chrome is optional (can be decorative only; not required for a11y)
- Comfortable row height, not cramped

### Change from the user’s dark Finder screenshot
| Finder screenshot | This site |
|-------------------|-----------|
| Dark charcoal sidebar | **Light-but-deeper** blue-tinted surfaces |
| White icons on dark | Soft dark text on dusty blue-gray |
| Medium rounded corners | **Rounder** corners everywhere |
| System blue selection on dark | Soft blue selection pill on light |

**Do not** copy the full dark theme. The screenshot is for **layout language only**.

---

## 3. Color system — deeper light blue tint (anti-sterile)

Still a **light** theme — just less icy / hospital-white. Aim for **overcast sky / soft denim paper**, not pure white UI.

### Core tokens (current target)

| Token | Role | Suggested value |
|-------|------|-----------------|
| `--bg-app` | Page / outer wash | `#C9D9EC` (deeper sky blue-gray) |
| `--bg-sidebar` | Sidebar fill | `#D7E4F2` (mid-light blue tint) |
| `--bg-content` | Main pane surface | `#EAF1F8` (content is *not* pure white) |
| `--bg-elevated` | Cards / raised panels | `#F4F8FC` (slightly lighter than content, still tinted) |
| `--bg-hover` | Row hover | `rgba(30, 64, 175, 0.10)` |
| `--bg-selected` | Active nav item | `rgba(30, 64, 175, 0.16)` |
| `--text-primary` | Body / labels | `#152033` |
| `--text-secondary` | Muted labels / path | `#4A5D73` |
| `--text-active` | Selected nav label | `#1E40AF` |
| `--border-subtle` | Dividers, edges | `rgba(21, 40, 72, 0.12)` |
| `--accent` | Links, focus, primary actions | `#1D4ED8` |
| `--accent-soft` | Chips, badges | `#C7D7F0` |
| `--icon` | Default icons | `#5A6F88` |
| `--icon-active` | Selected icons | `#1D4ED8` |
| `--shadow` | Soft elevation | `0 10px 36px rgba(30, 58, 110, 0.14)` |

### Previous (too pale / sterile) — do not regress to these
| Token | Old value |
|-------|-----------|
| `--bg-app` | `#E8F1FA` |
| `--bg-sidebar` | `#F2F7FC` |
| `--bg-content` | `#FBFDFF` / near-white |

### Rules
- Backgrounds should read as **“soft dusk sky / denim wash”**, not white dashboard, not navy dark mode.
- **Content pane is tinted** — avoid pure `#FFFFFF` large surfaces; use `--bg-content` / `--bg-elevated`.
- Slightly stronger borders + shadow than the pale version so the window feels grounded.
- Never pure `#000` text or neon blue.
- No purple/pink AI gradients.
- No heavy glassmorphism.
- Selection = **rounded pill**, blue-tinted fill, blue label — Finder energy on a light UI.

### Making it feel less sterile (beyond hex codes)
Palette depth alone helps, but sterility also comes from empty UI. Layer these when ready:
1. **Contrast hierarchy** — outer app darker than sidebar; sidebar slightly different from content; cards elevated.
2. **Texture (optional, subtle)** — very light noise or soft radial wash on `--bg-app` only; opacity ~2–4%, never busy.
3. **One warm accent** (optional) — e.g. soft amber for “WIP” chips only (`#F5E6C8` bg / `#8A6A2F` text) so everything isn’t monochrome blue.
4. **Real content** — photos, project screenshots, short voicey copy beat any color tweak.
5. **Do not** fix sterility with more gradients, blobs, or random illustrations.

### Optional traffic lights (decorative)
If used in a window chrome bar:
- Close `#FF5F57`
- Minimize `#FEBC2E`
- Zoom `#28C840`  
These are **visual only** (not real window controls).

### Dark mode tokens (class: `html.dark`)
Still blue-tinted — **night sky / blue charcoal**, not pure black or generic gray dark mode.

| Token | Dark value |
|-------|------------|
| `--bg-app` | `#0F1724` |
| `--bg-sidebar` | `#152033` |
| `--bg-content` | `#1A2740` |
| `--bg-elevated` | `#22314D` |
| `--bg-hover` | `rgba(96, 165, 250, 0.10)` |
| `--bg-selected` | `rgba(96, 165, 250, 0.18)` |
| `--text-primary` | `#E8EEF8` |
| `--text-secondary` | `#9AADC4` |
| `--text-active` | `#93C5FD` |
| `--border-subtle` | `rgba(148, 180, 220, 0.14)` |
| `--accent` | `#60A5FA` |
| `--accent-soft` | `#1E3A5F` |
| `--icon` | `#8FA3BB` |
| `--icon-active` | `#93C5FD` |
| `--shadow` | `0 12px 40px rgba(0, 0, 0, 0.45)` |

### Theme toggle (chrome bar)
- **Control:** iOS-style switch (pill track + white thumb) with static label **“Dark Mode”** (title case, two words — system-settings style, not “Darkmode”)
- **Label style:** `12px`, medium weight, `--text-secondary`; sits to the **left** of the switch
- **Placement (all breakpoints):** left cluster = traffic lights + (mobile: Browse toggle) + “Portfolio”; right = Dark Mode control
- **Behavior:** toggles `light` / `dark`; persists in `localStorage` (`portfolio-theme`); respects `prefers-color-scheme` on first visit
- **On (dark):** track `#34C759` (iOS green); thumb slides right
- **Off (light):** track `#D1D5DB` (light) / slightly darker gray in dark UI; thumb slides left
- **A11y:** whole control is one `role="switch"` button; `aria-label="Dark Mode"`; `aria-checked` reflects state
- Implementation: `ThemeProvider` + `ThemeToggle`; tokens switch via `html.dark` CSS variables

### When to use DESIGN.md vs chat (for features like this)

| Change type | Where it goes | Then |
|-------------|---------------|------|
| Colors, radii, toggle look, placement | **`DESIGN.md`** (spec) | Prompt or code to implement |
| Working toggle, routing, RAG, data | **Code** (chat/agent OK) | Optional note in DESIGN.md if visual |
| One-off copy tweak | Chat is fine | — |

**Rule:** Visual system → DESIGN.md. Interactive feature → implement in code (chat is fine for *how*, doc for *look*).

---

## 4. Shape & radius — rounder than stock Finder

| Element | Radius |
|---------|--------|
| App shell / outer window | `20px`–`24px` |
| Inner content window | `18px`–`20px` (slightly smaller than outer) |
| Sidebar container (if inset) | `16px`–`20px` |
| Main content card | `16px`–`20px` |
| Nav row (hover/selected pill) | `10px`–`12px` (full pill feel) |
| Buttons / chips | `9999px` (pill) or `12px` |
| Inputs (chat later) | `12px`–`14px` |
| Project cards | `16px` |
| Images / screenshots | `12px`–`16px` |

**Rule of thumb:** if it feels boxy like a default admin dashboard, increase radius.

---

## 5. Layout

### Nested windows (core structure)

```
Outer window (Portfolio + Dark Mode)
├─ Sidebar
└─ Content “desk”
   └─ Inner window (traffic lights + path/title)
      └─ Page content (scrollable)
```

The outer shell is the Portfolio “app.” The right column is a soft **desk** (not a flat content fill). Page content lives in a raised **inner content window** that reuses the same chrome language (decorative traffic lights, thin title bar, rounded corners).

### Desktop (≥ 1024px)
```
┌────────────────────────────────────────────────────────────┐
│  traffic lights + Portfolio                    Dark Mode    │
├────────────────┬───────────────────────────────────────────┤
│                │  desk (inset padding)                     │
│   SIDEBAR      │  ┌─────────────────────────────────────┐  │
│   ~260–280px   │  │ ● ● ●  For Recruiters / Projects    │  │
│                │  ├─────────────────────────────────────┤  │
│  folders…      │  │                                     │  │
│                │  │         INNER CONTENT WINDOW        │  │
│                │  │         (scrollable body)           │  │
│                │  │                                     │  │
│                │  └─────────────────────────────────────┘  │
└────────────────┴───────────────────────────────────────────┘
```

- **Sidebar width:** `260px`–`280px`, fixed
- **App padding:** outer margin so the “window” floats slightly on `--bg-app` (`8px` mobile → `12px`–`16px` large)
- **Sidebar | content split:** 1px subtle border or soft shadow, not a harsh line
- **Content desk:** `--bg-sidebar` (or matching desk tint), modest inset padding (`12px`–`16px`)
- **Inner window body:** padded content (`24px`–`32px`); max readable width for text ~ `680px`–`720px` where it helps; cards can be wider
- **Scroll:** lives **inside** the inner window body, not on the desk

### Mobile (< 768px)
- Same floating rounded outer window + traffic-light chrome as desktop (tighter outer padding)
- Sidebar hidden by default
- Hamburger / “Browse” in the **outer** chrome bar opens drawer (same Finder list), constrained inside the outer window
- Inner content window fills the desk (full width within the outer window)
- No tiny permanent left rail

### Tablet (768–1023px)
- Same window chrome as mobile/desktop; collapsible drawer sidebar (same as mobile)

---

## 6. Sidebar (Finder language)

### Structure (already in `src/data/nav.ts`)
Top-level folders only:
1. **For Recruiters**
2. **For Curious Humans**
3. **Talk to my consciousness**

Children expand/collapse like Finder folders.

### Visual behavior
| State | Look |
|-------|------|
| Default row | Icon + label, `--text-primary`, comfortable padding |
| Hover | `--bg-hover`, cursor pointer |
| Selected leaf | `--bg-selected`, `--text-active`, `--icon-active` |
| Folder (parent) | Chevron or disclosure; slightly stronger weight optional |
| Section feel | Top-level folders act as the main “Favourites”-style list — no need for extra section labels unless useful |

### Row metrics
- Height: ~`32px`–`36px`
- Horizontal padding: `8px`–`12px` inside the pill
- Icon size: `16px`–`18px`
- Gap icon→label: `8px`–`10px`
- Font size: `13px`–`14px` (Finder-like density, not huge marketing type)

### Icons
- Simple line icons (stroke), not colorful skeuomorphic folder art
- Consistent stroke width
- Optional: folder icon for parents, file/doc/chat icons for leaves

---

## 7. Typography

### Font stack
```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
Optional later: **Inter** if system stack feels too plain — only one sans family.

### Scale
| Role | Size | Weight |
|------|------|--------|
| Page title (main pane) | `22px`–`28px` | 600–650 |
| Section heading | `16px`–`18px` | 600 |
| Body | `15px`–`16px` | 400 |
| Sidebar / meta / path | `12px`–`14px` | 400–500 |
| Path bar (“For Recruiters / Work”) | `13px` | 500, `--text-secondary` |

### Line length & spacing
- Body line-height: `1.55`–`1.65`
- Avoid walls of text; short paragraphs, cards, lists
- Fun tone in copy is OK; visual chrome stays calm

---

## 8. Spacing system (8px grid)

Use multiples of **4/8**:
`4, 8, 12, 16, 20, 24, 32, 40, 48`

Avoid random values like `17px`, `13px` unless optical alignment needs 1–2px.

---

## 9. Elevation & borders

- Prefer **soft shadow + light border** over heavy drop shadows
- **Outer window** floats on `--bg-app` with soft shadow
- **Inner content window** sits elevated on the desk (`--bg-elevated` surface, `--border-subtle`, soft shadow) — same elevation language as the outer shell, one level nested
- Sidebar can be flat on the tinted ground or a slightly different tint — keep contrast low and elegant
- No double borders, no thick outlines

---

## 10. Motion

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover background | `120ms`–`160ms` | ease-out |
| Sidebar expand/collapse | `180ms`–`220ms` | ease |
| Page content fade (optional) | `150ms`–`200ms` | ease-out |
| Mobile drawer | `200ms`–`250ms` | ease |

**Do not:** bounce, springy overshoot on every element, parallax, cursor particle storms in v1.

One signature delight later is fine; default UI stays quiet.

---

## 11. Components (visual contract)

### Buttons
- Primary: filled `--accent`, white text, pill or `12px` radius
- Secondary: transparent / soft blue fill, blue text
- Height ~`36px`–`40px`

### Cards (projects, notes)
- White / `--bg-content`
- Radius `16px`
- Border `--border-subtle`
- Optional soft shadow
- Clear title + 2–4 line description + status chip (Shipped / Client / WIP)

### Chips / status
- Soft blue background (`--accent-soft`), blue text, pill radius

### Outer window chrome
- Traffic lights (decorative) + “Portfolio” title + Dark Mode toggle
- Radius `20px`–`24px`; border + soft shadow on `--bg-content`

### Inner content window (`ContentWindow`)
- **Chrome:** decorative traffic lights (same hex as outer; `aria-hidden`) + title
- **Title:** full breadcrumb path, e.g. `For Recruiters / Contact` — replaces a separate PathBar strip
- **Surface:** `--bg-elevated`, border `--border-subtle`, soft shadow
- **Radius:** `18px`–`20px` (slightly smaller than outer)
- **Chrome bar:** ~`h-10`–`h-11`; title `13px`, medium, `--text-secondary`, truncate
- **Body:** scrollable; page content (`Outlet`) only — no second Dark Mode control
- Applies to **all** routes under the shell (including Chat)

### Chat UI (later — Consciousness)
- Same radius language
- Message bubbles: user = soft blue fill; assistant = white card
- Recommended prompts = pill chips
- Must not invent a second visual system

---

## 12. Content tone (design-adjacent)

- Fun, human, not try-hard
- Recruiters path: clear and scannable
- Curious path: warmer, more personality
- Consciousness: calm product UI + honesty about RAG

No fake metrics. No “10x engineer” energy.

---

## 13. Accessibility

- Focus rings: visible blue outline (`2px` accent), never remove focus styles
- Contrast: body text on light backgrounds must stay readable (WCAG AA target)
- Sidebar selected state must not rely on color alone (weight or icon change OK)
- Hit targets ≥ ~`32px` tall in nav
- Reduced motion: respect `prefers-reduced-motion`

---

## 14. Explicit anti-patterns (“vibe-coded” tells)

**Do not ship:**
- Purple/pink mesh gradients as the brand
- Glass blur on every panel
- 5 fonts or display fonts in the sidebar
- Rainbow icons
- Skill bars at “90%”
- Autoplay motion / heavy 3D
- Dark mode first (this product is **light blue-tint first**)
- Crowded sidebar with 20 items
- Generic Inter + gray SaaS dashboard with no concept

---

## 15. Implementation notes for Cursor

### Priority when refactoring UI
1. Apply color tokens (light blue tint) globally  
2. Increase border radii (rounder shell + pills)  
3. Refine sidebar selected/hover to Finder-like pills  
4. Float the app shell on tinted background with soft shadow  
5. Typography + spacing cleanup  
6. Only then polish individual pages  

### File touch targets (typical)
- `src/index.css` — tokens, base body background
- `src/layouts/AppShell.tsx` — outer window chrome, desk, split layout
- `src/components/TrafficLights.tsx` — shared decorative traffic lights
- `src/components/ContentWindow.tsx` — inner nested content window
- `src/components/Sidebar.tsx` / `SidebarItem.tsx` — row states
- Page components — cards and content only after shell is right

### Prompt snippet (paste into Cursor)

```text
Refactor the UI to strictly follow DESIGN.md.

Goals:
- Light blue-tinted surfaces (not dark Finder, not gray SaaS)
- Rounder corners on shell, content, and nav pills
- Sidebar selected state like macOS Finder (soft blue pill + blue label)
- Soft shadows, subtle borders, system font stack
- No new dependencies
- No purple gradients or glassmorphism

DESIGN.md is the source of truth. Summarize what you changed after.
```

---

## 16. Skills policy (read this)

| Skill / tool | Use? | When |
|--------------|------|------|
| **This DESIGN.md** | **Always** | Every visual change |
| UI/UX Pro Max (or similar) | **Optional** | Only as a helper for spacing/a11y *after* this file exists |
| Framer Motion skill / library | **Not yet (v1)** | Add only when shell is done and you want 1–2 intentional animations |
| Generic “make it beautiful” skills | **Avoid alone** | They fight the Finder concept and reintroduce vibe-coded defaults |

**Rule:** Skills assist. **DESIGN.md decides.**  
If a skill suggests dark glass or purple AI chrome, ignore it.

---

## 17. Definition of done (Step 2)

Step 2 is complete when:
- [ ] App background is clearly **light blue-tinted**
- [ ] Outer shell / cards / nav pills feel **noticeably round**
- [ ] Selected sidebar item matches Finder energy (pill + blue text) on **light** UI
- [ ] Layout still reads as Finder (left nav, main pane, path)
- [ ] No dark theme, no purple gradient, no new random libraries
- [ ] Looks intentional on mobile (drawer works)

Content can still be placeholder. **Shell quality is the goal of Step 2.**
