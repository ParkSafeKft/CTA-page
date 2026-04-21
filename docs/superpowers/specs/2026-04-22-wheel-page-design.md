# `/wheel` — ParkSafe event szerencsekerék

**Date:** 2026-04-22
**Context:** ParkSafe promóciós event holnap. Regisztrált userek pörgethetnek egy kereket a ParkSafe standján. Nyeremények: 4× karra rakható telefontartó, 4× 50% kedvezmény Dom-látogatásra (Szeged), valamint XP az appban, illetve "sajnos nem nyert" vigaszág.

## Cél

Egy új `/wheel` Next.js route a meglévő CTA oldal mellé, ami egy látványos "wheel of fortune"-t tartalmaz. Event alatt a ParkSafe csapat mobil/tablet böngészőjében fut. Admin panelen keresztül beállítható, hogy mennyi fizikai ajándék van még raktáron; amikor valami elfogy, a kerék automatikusan vigaszdíjra vált arra a slice-ra.

## Nem-célok

- Nincs user autentikáció vagy regisztráció-ellenőrzés (a csapat kézzel ellenőrzi az appban).
- Nincs szerveroldali perzisztencia, adatbázis vagy API — minden localStorage.
- Nincs nyereménylog vagy analytics.
- Nincs jelszó / admin hitelesítés.

## Route és fájl-struktúra

Új route: **`app/wheel/page.tsx`** (App Router, client component).

```
app/
  wheel/
    page.tsx                    // 'use client' — fő container, title + Wheel + AdminPanel + ResultModal
    components/
      Wheel.tsx                 // SVG kerék + spin animáció és slice rendering
      ResultModal.tsx           // nyeremény-modal, "KIOSZTVA ✓" / "OK" / "BEZÁR" gombokkal
      AdminPanel.tsx            // fogaskerék ikon + stock-vezérlők
    hooks/
      useWheelStock.ts          // localStorage-backed stock state (SSR-safe)
    wheel.module.css            // page-specifikus stílusok (Tailwind 4 van a projekten, de CSS module marad konzisztens a többi komponensel)
```

A `/wheel` oldal **nem örökli** a Nav-ot / Footer-t — a projektben ezek page-szinten vannak behúzva, nem a root layoutban, így a wheel route tiszta fókuszált képernyő lesz.

## Slice kiosztás (8 slice, 45° minden)

Óramutató járása szerint 12 óra pozíciótól:

| # | Szög | Felirat | Háttér | Szöveg | Típus |
|---|------|---------|--------|--------|-------|
| 1 | 0°   | TELEFONTARTÓ | `--green` | `--ink` | physical (phoneHolder) |
| 2 | 45°  | +50 XP | `--cream` | `--ink` | xp50 |
| 3 | 90°  | SAJNOS NEM | `--ink` | `--paper` | nothing |
| 4 | 135° | +100 XP | `--paper-2` | `--ink` | xp100 |
| 5 | 180° | DOM 50% | `--pink` | `--ink` | physical (dom) |
| 6 | 225° | +50 XP | `--cream` | `--ink` | xp50 |
| 7 | 270° | SAJNOS NEM | `--ink` | `--paper` | nothing |
| 8 | 315° | +100 XP | `--paper-2` | `--ink` | xp100 |

A két fizikai díj szemben van (0°/180°), a két "semmi" is (90°/270°), az XP 50/100 is szimmetrikus. Kiegyensúlyozott kinézet, nem látszik megbundázva.

Valószínűségek (amíg van fizikai stock): 12.5% telefontartó, 12.5% Dom, 25% +50 XP, 25% +100 XP, 25% semmi.

## State modell

**`WheelState` — localStorage kulcs: `parksafe-wheel-v1`**

```ts
type WheelState = {
  phoneHolderStock: number;  // 0..4, default 4
  domStock: number;          // 0..4, default 4
};
```

Nincs log, nincs user-tracking.

## Stock fogyása és slice-felirat átváltása

A slice-kiosztás statikus SZÖG és SZÍN szerint, de a **felirat és a típus dinamikus**, stock-függő:

- Ha `phoneHolderStock === 0`:
  - Az 1. slice (0°) felirata: **"ELKELT  +50 XP"** (kisebb betűmérettel).
  - Háttér halványul `--paper-2`-re (a zöld kiesik).
  - Típusa `xp50` — ha ide pörög a kerék, +50 XP-t nyer a user.
- Ugyanez `domStock === 0` esetén az 5. slice-ra.

Mindig van mit nyerni, a kerék 8 slice marad, a méret és a pörgés-animáció konzisztens.

## Spin flow

1. Kerék-szekció betöltődik, olvasunk localStorage-ból (useEffect-ben a hydration mismatch elkerülésére), stock default 4/4 ha üres.
2. A kerék közepén nagy kör **PÖRGESS!** gomb (`.btn` design system, `.big`, zöld háttér, hard shadow).
3. Kattintás:
   - `isSpinning = true`, gomb disabled.
   - Random target szög: `currentAngle + (5..8) * 360° + Math.random() * 360°`.
   - State-ben tartott `rotationDeg` értéket erre állítjuk; a kerék SVG CSS transition-nel forog: `transition: transform 4.5s cubic-bezier(0.17, 0.67, 0.24, 1);`.
4. `onTransitionEnd`:
   - A végső `rotationDeg % 360`-ból számoljuk, a mutató (12 óra felé irányuló fekete háromszög) melyik slice felett áll.
   - A slice aktuális típusa (stock-függő) → nyeremény meghatározva.
   - `ResultModal` megnyílik.
   - `isSpinning = false`.
5. Modal a nyeremény alapján:
   - **physical (phoneHolder / dom)** → "NYERTÉL EGY TELEFONTARTÓT!" / "50% DOM KUPONT NYERTÉL!" + ikonos szöveg + `[KIOSZTVA ✓]` gomb. **Csak a gomb lenyomása csökkenti a stockot** (biztonsági megoldás: ha a user elmegy anélkül hogy átvenné, nem veszítünk ajándékot a könyvelésből).
   - **xp50 / xp100** → "+50 XP AZ APPBAN!" vagy "+100 XP AZ APPBAN! Szólj a standnál a felhasználóneveddel." + `[OK]` gomb. Stock nincs érintve.
   - **nothing** → "SAJNOS NEM NYERTÉL. Legközelebb több szerencsét!" + `[BEZÁR]` gomb. Stock nincs érintve.
6. Modal zárás után a pörgés-gomb újra aktív, kerék maradhat az aktuális szögén (a következő pörgés a jelenlegi szögből indul).

## Admin panel

- **Trigger:** fixed bottom-right fogaskerék SVG ikon, 44×44 px kattintható terület, 20 px padding a page-szélektől. `--paper-2` háttér, 2.5 px `--ink` border, `--shadow-sm`. Hover: `--cream` háttér.
- **Megnyitáskor** közvetlenül fölötte kinyílik egy kártya (accordion, nem full modal), a fogaskerék helyén marad, fogaskerék "×" ikonra vált.
- **Tartalom:**
  ```
  § STOCK
  
  Telefontartó     4 / 4
    [ – ]    [ + ]
  
  Dom 50%          4 / 4
    [ – ]    [ + ]
  
  [ RESET 4 / 4 ]
  ```
- **+/–:** 0 és 4 közé clampolva. Az aktuális érték félkövér, nagy betűkkel.
- **RESET gomb:** mindkét értéket 4-re állítja megerősítés nélkül (a csapatnak bizonyhat eszköz, nem end-user felület).
- A panel **azonnal** írja a localStorage-t minden változáskor; a kerék-slice feliratok reaktív módon frissülnek (ugyanazt a state-et olvassák).

## Vizuális design (design system match)

A projekt stílusa **neobrutalist** — vastag `--ink` borderek, hard shadow (`--shadow-lg` = `8px 8px 0 0 var(--ink)`), a `--green` / `--pink` / `--cream` / `--paper-2` színpaletta, Archivo Black (`.hx` class) fő címre, JetBrains Mono (`.mono`) mellék szöveghez.

- **Page háttér:** `.grid-bg` util class (meglévő globals.css-ben), ami a Hero-val egyezik.
- **Felül:** `.sec-num` "§ WHEEL / PARKSAFE EVENT" + `h1.hx` "PÖRGESS ÉS NYERJ!" (clamp font-size ~56-96px). Opcionális mono pill alatta: "● REGISZTRÁLT FELHASZNÁLÓK / HUN EVENT".
- **Kerék konténer:** 480 px átmérő desktopon, 380 px tableten (<900px), 300 px mobilon (<640px). Középre igazítva. Kerek SVG, `drop-shadow(8px 8px 0 var(--ink))`.
- **Kerék border:** 4 px `--ink` stroke a körön, 2.5 px `--ink` osztóvonalak a slice-ok között.
- **Mutató:** fekete háromszög, 12 óra pozícióban, a körbe 8 px-t belelóg, 3 px `--ink` stroke.
- **Középső gomb:** 100 px átmérőjű kör, `.btn` design system-je szerint zöld háttér + `--ink` border + hard shadow, benne `.hx` "PÖRGESS!" felirat. Disabled állapotban `--paper-2` háttér és csökkentett opacity.
- **Modal:** középre fixelt kártya, `.card-lg` stílus (3px border, 8 shadow), max-width 440 px, padding 32 px, a nyeremény ikonosan + felirat + gomb.

## Reszponzivitás

Breakpointok megegyeznek a meglévőkkel (900 / 640).

- ≥ 900 px: kerék 480 px, címsor teljes méretben, admin panel jobb alul 20 px margin.
- < 900 px: kerék 380 px, címsor kisebb.
- < 640 px: kerék 300 px, admin panel jobb alul 14 px margin, fogaskerék 40×40 px.

## Edge case-ek

- **Dupla kattintás pörgés közben:** `disabled={isSpinning}` a gombon, defensive.
- **localStorage nem elérhető (Safari private mode, régi böngésző):** a `useWheelStock` hook try/catch, hibánál in-memory state-re esik vissza, `console.warn`, felhasználónak észrevehetetlen.
- **SSR hidration mismatch:** a wheel page `'use client'`, a localStorage-olvasás `useEffect`-ben történik első mount után — a kezdeti render 4/4 default stock, majd hydrate.
- **Szög precíz visszaolvasás:** `rotationDeg` React state-ben, nem DOM-ból olvassuk — `onTransitionEnd` után pontos a slice-döntés.
- **Stock fogytán spin közben:** ha admin a pörgés alatt nyomja −-t, a `rotationDeg` érintetlen, csak a landing-kor olvasódik a friss stock. Ha pontosan akkor csökken 0-ra, a slice már ELKELT-ként landol — korrekt viselkedés.
- **Reset a stock panelen:** azonnal visszaállít 4/4-re, a kerék slice-feliratok azonnal frissülnek.

## Tesztelés

Manuális teszt az event előtt (a csapat):

1. `/wheel` megnyitása asztali és mobil böngészőben.
2. Pörgetés 10×, minden nyeremény-típusra lenni kell legalább egyszer.
3. "KIOSZTVA ✓" csökkenti a stockot.
4. Ha stock = 0, a slice ELKELT-ként jelenik meg; pörgés ide +50 XP-t ad.
5. Admin panel +/− /RESET működik.
6. Page reload után a stock megmarad (localStorage).

Nincs automata teszt (esemény-eszköz, egyszer használatos, ROI nem éri meg).

## Implementációs jegyzetek

- Next.js **16.2.4** + React **19.2.4** — új verzió, az AGENTS.md figyelmeztet, hogy az API-k eltérhetnek a tréning adattól. Implementációkor a `node_modules/next/dist/docs/` mappában kell megnézni az App Router konvenciókat (client component deklaráció, dynamic imports, metadata export) mielőtt kódot írok.
- Tailwind 4 van a projekten, de a meglévő komponensek inline style-t és globals.css utility classokat használnak — konzisztencia miatt ugyanezt követem.
- Nincs új csomag, nincs extra dependency.
