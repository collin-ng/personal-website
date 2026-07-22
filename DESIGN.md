# DESIGN.md — Personal Portfolio

> **Source of truth for visual design.**  
> When Cursor (or any skill) conflicts with this file, **this file wins**.

---

## 1. Product vibe (one sentence)

A **macOS Finder-style personal OS**: clean, airy, slightly playful — not corporate, not dark-cyber, not “AI purple gradient.”

Think: **Finder’s structure + Apple’s softness + a light sky-blue tint.**

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
| Dark charcoal sidebar | **Light** surface with **blue tint** |
| White icons on dark | Soft dark text on light blue-gray |
| Medium rounded corners | **Rounder** corners everywhere |
| System blue selection on dark | Soft blue selection pill on light |

**Do not** copy the dark theme. The screenshot is for **layout language only**.

---

## 3. Color system — light blue tint

Use a cool, airy palette. Prefer CSS variables (or Tailwind theme tokens mapped to these).

### Core tokens

| Token | Role | Suggested value |
|-------|------|-----------------|
| `--bg-app` | Page / window background | `#E8F1FA` (very light blue-gray) |
| `--bg-sidebar` | Sidebar fill | `#F2F7FC` (lighter than app, still blue-tinted) |
| `--bg-content` | Main pane card / content surface | `#FFFFFF` with slight blue hint `#FBFDFF` |
| `--bg-hover` | Row hover | `rgba(37, 99, 235, 0.06)` |
| `--bg-selected` | Active nav item | `rgba(37, 99, 235, 0.12)` |
| `--text-primary` | Body / labels | `#1C2430` (soft near-black, not pure black) |
| `--text-secondary` | Muted labels / section headers | `#5B6B7C` |
| `--text-active` | Selected nav label | `#1D4ED8` (clear blue, like Finder’s “Pictures”) |
| `--border-subtle` | Dividers, sidebar edge | `rgba(28, 55, 90, 0.08)` |
| `--accent` | Links, focus, primary actions | `#2563EB` |
| `--accent-soft` | Chips, badges | `#DBEAFE` |
| `--icon` | Default icons | `#64748B` |
| `--icon-active` | Selected icons | `#2563EB` |
| `--shadow` | Soft elevation | `0 8px 30px rgba(37, 99, 235, 0.08)` |

### Rules
- Backgrounds should read as **“morning sky / ice blue”**, not gray and not saturated baby-blue.
- Never pure `#000` text or pure neon blue.
- No purple/pink AI gradients.
- No heavy glassmorphism (blur stacks). A little translucency is OK; keep it simple.
- Selection = **rounded pill**, blue-tinted fill, blue label — similar energy to Finder’s selected “Pictures,” but on light UI.

### Optional traffic lights (decorative)
If used in a window chrome bar:
- Close `#FF5F57`
- Minimize `#FEBC2E`
- Zoom `#28C840`  
These are **visual only** (not real window controls).

---

## 4. Shape & radius — rounder than stock Finder

| Element | Radius |
|---------|--------|
| App shell / outer window | `20px`–`24px` |
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

### Desktop (≥ 1024px)
```
┌──────────────────────────────────────────────────────────┐
│  optional thin top bar / traffic lights + title          │
├────────────────┬─────────────────────────────────────────┤
│                │  Path: For Recruiters / Projects          │
│   SIDEBAR      │─────────────────────────────────────────│
│   ~260–280px   │                                         │
│                │           MAIN CONTENT                  │
│  folders…      │           (scrollable)                  │
│                │                                         │
└────────────────┴─────────────────────────────────────────┘
```

- **Sidebar width:** `260px`–`280px`, fixed
- **App padding:** outer margin so the “window” floats slightly on `--bg-app` (e.g. `12px`–`16px` on large screens)
- **Sidebar | content split:** 1px subtle border or soft shadow, not a harsh line
- **Main pane:** padded content (`24px`–`32px`); max readable width for text ~ `680px`–`720px` where it helps; cards can be wider

### Mobile (< 768px)
- Sidebar hidden by default
- Hamburger / “Browse” opens drawer (same Finder list)
- Main content full width
- No tiny permanent left rail

### Tablet (768–1023px)
- Collapsible sidebar or narrower `220px` rail — pick one and stay consistent

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
- Content area can sit as a raised white/blue-white card on the tinted app background
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

### Main path bar
- Shows current location: `For Recruiters / Projects`
- Muted text; acts like Finder’s title/path, not a second nav

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
- `src/layouts/AppShell.tsx` — window chrome, radii, split layout
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
