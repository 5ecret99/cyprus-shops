import { useEffect, useMemo, useState } from "react"
import { Info, ExternalLink, ShoppingCart, Smartphone, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SHOPS } from "@/data/shops"
import { ICON, T, catLabel, memesFor, type Lang } from "@/i18n"
import type { Shop, Status } from "@/types"

type Sort = "name" | "free" | "cost"
const eur = (n: number) => "€" + n.toFixed(2).replace(/\.00$/, "")

function estimate(s: Shop, b: number) {
  if (s.freeOver != null && b >= s.freeOver) return { kind: "free" as const }
  const gap = s.freeOver != null ? s.freeOver - b : null
  if (s.shippingFee != null) return { kind: "pay" as const, amount: s.shippingFee, gap }
  return { kind: "unknown" as const, gap }
}
const costKey = (s: Shop, b: number) => {
  const e = estimate(s, b)
  return e.kind === "free" ? 0 : e.kind === "pay" ? e.amount : Infinity
}
const shuffled = (n: number) => {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const statusStyle: Record<Status, string> = {
  verified: "text-emerald-600 dark:text-emerald-400",
  partial: "text-amber-600 dark:text-amber-400",
  unverified: "text-amber-600 dark:text-amber-400",
}
const statusIcon: Record<Status, string> = { verified: "✓", partial: "◐", unverified: "?" }

function loadLang(): Lang {
  try {
    const l = localStorage.getItem("lang")
    if (l === "en" || l === "el") return l
  } catch { /* ignore */ }
  return navigator.language?.startsWith("el") ? "el" : "en"
}

export default function App() {
  const [lang, setLang] = useState<Lang>(loadLang)
  const [cat, setCat] = useState("All")
  const [q, setQ] = useState("")
  const [basket, setBasket] = useState("")
  const [sort, setSort] = useState<Sort>("name")
  const [memeStep, setMemeStep] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const t = T[lang]

  // follow the system dark-mode setting
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = () => document.documentElement.classList.toggle("dark", mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const memes = useMemo(() => memesFor(lang), [lang])
  const deck = useMemo(() => shuffled(memes.length), [memes.length]) // new random order every visit
  const meme = memes[deck[memeStep % deck.length]]

  const cats = useMemo(() => ["All", ...[...new Set(SHOPS.flatMap(s => s.categories))].sort()], [])
  const b = parseFloat(basket)
  const hasB = Number.isFinite(b) && b > 0

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const out = SHOPS.filter(s =>
      (cat === "All" || s.categories.includes(cat)) &&
      (!needle || (s.name + " " + s.categories.map(c => catLabel(lang, c)).join(" ")).toLowerCase().includes(needle)))
    const byName = (a: Shop, c: Shop) => a.name.localeCompare(c.name)
    if (sort === "free") out.sort((a, c) => (a.freeOver ?? Infinity) - (c.freeOver ?? Infinity) || byName(a, c))
    else if (sort === "cost" && hasB) out.sort((a, c) => costKey(a, b) - costKey(c, b) || byName(a, c))
    else out.sort(byName)
    return out
  }, [q, cat, sort, hasB, b, lang])

  const sortItems = [
    { value: "name", label: t.sortName },
    { value: "free", label: t.sortFree },
    { value: "cost", label: t.sortCost },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <header className="flex items-start justify-between gap-3 py-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">🛒 {t.title}</h1>
            <p className="mt-1 text-muted-foreground">{t.sub}</p>
          </div>
          <ToggleGroup
            variant="outline"
            value={[lang]}
            onValueChange={v => {
              const next = v[0] as Lang | undefined
              if (!next) return
              setLang(next)
              try { localStorage.setItem("lang", next) } catch { /* ignore */ }
            }}
          >
            <ToggleGroupItem value="en">EN</ToggleGroupItem>
            <ToggleGroupItem value="el">ΕΛ</ToggleGroupItem>
          </ToggleGroup>
        </header>

        {/* Meme banner */}
        <div className="mb-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => { setMemeStep(s => s + 1); setShowInfo(false) }}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { setMemeStep(s => s + 1); setShowInfo(false) } }}
            className="relative flex min-h-40 cursor-pointer select-none flex-col items-center justify-between gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 via-rose-500 to-purple-800 px-4 py-4 text-center ring-1 ring-foreground/10"
          >
            {meme.cy && <Badge variant="secondary" className="absolute left-2 top-2">{t.cy}</Badge>}
            <span className="meme-text mt-4">{meme.top}</span>
            <span className="text-5xl leading-none">🛒💸</span>
            <span className="meme-text">{meme.bottom}</span>
            {meme.en && (
              <button
                type="button"
                aria-label={t.why}
                title={t.why}
                onClick={e => { e.stopPropagation(); setShowInfo(v => !v) }}
                className="absolute bottom-2 left-2 flex size-8 items-center justify-center rounded-full border-2 border-white bg-black/60 text-white"
              >
                <Info className="size-4" />
              </button>
            )}
            <small className="absolute bottom-1 right-2 text-[11px] text-white/70">{t.shuffle}</small>
          </div>
          {meme.en && showInfo && (
            <Alert className="mt-2">
              <Info />
              <AlertDescription>
                <b className="block text-foreground">{t.why}</b>
                {meme[lang]}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Controls */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Input className="min-w-48 flex-1" type="search" placeholder={t.search} value={q} onChange={e => setQ(e.target.value)} />
          <Input className="w-44" type="number" min={0} placeholder={t.basket} value={basket} onChange={e => setBasket(e.target.value)} />
          <Select items={sortItems} value={sort} onValueChange={v => setSort(v as Sort)}>
            <SelectTrigger className="w-60" aria-label={t.sort}><SelectValue /></SelectTrigger>
            <SelectContent>
              {sortItems.map(i => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <ToggleGroup
          className="mb-2 flex-wrap"
          variant="outline"
          value={[cat]}
          onValueChange={v => v[0] && setCat(v[0])}
        >
          {cats.map(c => (
            <ToggleGroupItem key={c} value={c}>{ICON[c] ?? ""} {catLabel(lang, c)}</ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="mb-4 text-sm text-muted-foreground">{t.shown(list.length, SHOPS.length)}</p>

        {list.length === 0 && <p className="py-12 text-center text-muted-foreground">{t.empty}</p>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(s => <ShopCard key={s.name} s={s} lang={lang} basket={hasB ? b : null} />)}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">{t.footer}</p>
      </div>
    </div>
  )
}

function ShopCard({ s, lang, basket }: { s: Shop; lang: Lang; basket: number | null }) {
  const t = T[lang]
  const est = basket != null ? estimate(s, basket) : null
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-base">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
            {s.name} <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        </CardTitle>
        <div className="flex flex-wrap gap-1">
          {s.categories.map(c => <Badge key={c} variant="outline">{ICON[c] ?? ""} {catLabel(lang, c)}</Badge>)}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 text-sm">
        <Row label={t.cost}>
          {s.shippingFee === 0 ? t.alwaysFree : s.shippingFee != null ? eur(s.shippingFee) : <span className="text-muted-foreground">{t.unknown}</span>}
        </Row>
        <Row label={t.free}>
          {s.freeOver === 0 ? <b className="text-emerald-600 dark:text-emerald-400">{t.alwaysFree}</b>
            : s.freeOver != null ? <b className="text-emerald-600 dark:text-emerald-400">{t.over} {eur(s.freeOver)}</b>
            : <span className="text-muted-foreground">{t.unknown}</span>}
        </Row>
        {s.pickup && <Row label={t.pickup}><span className="text-right">{s.pickup}</span></Row>}
        {est && (
          <div className="rounded-lg bg-muted px-3 py-2">
            {est.kind === "free" ? (
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {t.freeNow}{s.freeCond ? ` (${t.needs} ${s.freeCond})` : ""}
              </span>
            ) : (
              <>
                {est.kind === "pay" ? <>{t.pay} <b>{eur(est.amount)}</b></> : t.unk}
                {est.gap != null && est.gap > 0 && <> · {t.add} {eur(est.gap)} {t.toFree}</>}
              </>
            )}
          </div>
        )}
        <p className="text-muted-foreground">{s.note}</p>
        {s.apps && (
          <div className="flex flex-wrap gap-2 pt-1">
            {s.apps.ios && (
              <a href={s.apps.ios} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-muted">
                <Smartphone className="size-3.5" /> {t.ios}
              </a>
            )}
            {s.apps.android && (
              <a href={s.apps.android} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-muted">
                <Play className="size-3.5" /> {t.android}
              </a>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between text-xs">
        <span className={statusStyle[s.status]}>
          {statusIcon[s.status]} {t[s.status]}{s.checked ? ` · ${s.checked}` : ""}
        </span>
        <a href={s.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
          <ShoppingCart className="size-3" /> {s.sourceLabel ? t[s.sourceLabel] : t.source}
        </a>
      </CardFooter>
    </Card>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span>{children}</span>
    </div>
  )
}
