export type Lang = "en" | "el"

export const ICON: Record<string, string> = {
  All: "🧺", Fashion: "👗", Sneakers: "👟", Beauty: "💄", Perfume: "🧴", Home: "🛋️",
  Electronics: "📱", Sports: "⚽", General: "🛍️", Health: "💊", Forwarding: "📦",
}

export interface Meme { top: string; bottom: string; cy?: boolean; en?: string; el?: string }

// Cypriot-dialect memes: edit/add here (top, bottom, explanation in both languages)
export const CY_MEMES: Meme[] = [
  { top: "Εν να δω μόνο…", bottom: "Καλάθι: 14 προϊόντα", cy: true,
    en: "“Εν να δω μόνο” (en na do mono) is Cypriot Greek for “I'm only going to look”. In Cypriot, εν (en) means “is”, and εν να works as the future “will” (standard Greek: θα). The joke: nobody who says this leaves with an empty cart.",
    el: "Το «Εν να δω μόνο» στα κυπριακά σημαίνει «Θα δω μόνο». Το «εν» είναι το «είναι» και το «εν να» λειτουργεί ως μέλλοντας (στα κοινά ελληνικά: «θα»). Το αστείο: κανείς που το λέει δεν φεύγει με άδειο καλάθι." },
  { top: "Έσιει δωρεάν μεταφορικά;", bottom: "Εν να πάρω τζαι άλλα τρία τότε", cy: true,
    en: "“Έσιει” (esiei) is Cypriot for “has” (standard: έχει) and “τζαι” (tzai) means “and/also” (standard: και). “Does it have free shipping? Then I'll take three more.” The joke is the free-shipping threshold: spend more to save on delivery.",
    el: "Το «έσιει» είναι το «έχει» και το «τζαι» το «και». «Έχει δωρεάν μεταφορικά; Τότε θα πάρω τζαι άλλα τρία». Το αστείο είναι το όριο για δωρεάν μεταφορικά: ξοδεύεις περισσότερα για να γλιτώσεις τα μεταφορικά." },
  { top: "Εν τζαι κακόν να το πάρω", bottom: "(στο καλάθι: τζαι τα τρία χρώματα)", cy: true,
    en: "“Εν τζαι κακόν” (en tzai kakon) literally means “it's not bad either”, a very Cypriot way of talking yourself into something: “it wouldn't hurt to get it”. Then you get all three colours.",
    el: "Το «Εν τζαι κακόν» σημαίνει κυριολεκτικά «δεν είναι κι άσχημο», ο κυπριακός τρόπος να δικαιολογείς στον εαυτό σου μια αγορά. Και μετά παίρνεις και τα τρία χρώματα." },
  { top: "Ίντα κάμνεις;", bottom: "Ψάχνω ποιο μαγαζί έσιει δωρεάν μεταφορικά", cy: true,
    en: "“Ίντα κάμνεις;” (inta kamnis) is Cypriot for “What are you doing?” (standard: Τι κάνεις;). The answer is what every visitor to this website is doing.",
    el: "Το «Ίντα κάμνεις;» είναι το «Τι κάνεις;» στα κυπριακά. Η απάντηση είναι ό,τι κάνει κάθε επισκέπτης αυτού του site." },
]

const MEMES: Record<Lang, Meme[]> = {
  en: [
    { top: "Not responsible for encouraging consumerism", bottom: "Your wallet said \"free shipping over €49\" and you listened" },
    { top: "We list the shops. You press \"Buy\".", bottom: "Not responsible for your cart, your wallet or your regrets" },
    { top: "Just checking the shipping price", bottom: "Proceeds to add 14 things to reach free delivery" },
    { top: "Disclaimer: this site does not encourage consumerism", bottom: "The free-shipping threshold does, though" },
  ],
  el: [
    { top: "Δεν ευθυνόμαστε για την ενθάρρυνση του καταναλωτισμού", bottom: "Το πορτοφόλι σου είπε «δωρεάν μεταφορικά άνω των 49€» και το άκουσες" },
    { top: "Εμείς βάζουμε τα μαγαζιά. Εσύ πατάς «Αγορά».", bottom: "Δεν ευθυνόμαστε για το καλάθι, το πορτοφόλι ή τις τύψεις σου" },
    { top: "Απλά κοιτάω τα μεταφορικά", bottom: "Προσθέτει 14 πράγματα για να φτάσει στα δωρεάν" },
    { top: "Αποποίηση: το site δεν ενθαρρύνει τον καταναλωτισμό", bottom: "Το όριο για δωρεάν μεταφορικά όμως, ναι" },
  ],
}
export const memesFor = (lang: Lang): Meme[] => [...MEMES[lang], ...CY_MEMES]

const CATS: Record<Lang, Record<string, string>> = {
  en: { All: "All", Fashion: "Fashion", Sneakers: "Sneakers", Beauty: "Beauty", Perfume: "Perfume", Home: "Home",
    Electronics: "Electronics", Sports: "Sports", General: "General", Health: "Health", Forwarding: "Forwarding" },
  el: { All: "Όλα", Fashion: "Μόδα", Sneakers: "Sneakers", Beauty: "Ομορφιά", Perfume: "Αρώματα", Home: "Σπίτι",
    Electronics: "Ηλεκτρονικά", Sports: "Αθλητικά", General: "Γενικά", Health: "Υγεία", Forwarding: "Προώθηση δεμάτων" },
}
export const catLabel = (lang: Lang, c: string) => CATS[lang][c] ?? c

export const T = {
  en: {
    title: "Shop to Cyprus", sub: "Online shops that deliver to Cyprus: what shipping costs and when it's free.",
    search: "Search shops…", basket: "Basket € (optional)", sort: "Sort",
    sortName: "Name", sortFree: "Lowest free-shipping threshold", sortCost: "Cheapest for my basket",
    empty: "No shops match.", cost: "Shipping cost", free: "Free shipping", over: "Over", unknown: "Not confirmed",
    alwaysFree: "Always free", pickup: "Pickup", needs: "with", freeNow: "Free for your basket", pay: "You'd pay",
    add: "add", toFree: "to get free shipping", unk: "Cost unknown for your basket",
    verified: "Verified", partial: "Partly verified", unverified: "Unverified", source: "source", checkout: "checkout", cart: "cart",
    ios: "iOS", android: "Android", shuffle: "tap for another", why: "Explain the joke", hide: "Hide explanation", cy: "🇨🇾 Cypriot",
    shown: (n: number, total: number) => `${n} of ${total} shops`,
    footer: "Prices and thresholds change often. Always confirm at checkout with Cyprus selected. “Unverified” entries haven't been checked yet.",
  },
  el: {
    title: "Αγορές για Κύπρο", sub: "Ηλεκτρονικά καταστήματα που στέλνουν στην Κύπρο: κόστος αποστολής και δωρεάν μεταφορικά.",
    search: "Αναζήτηση…", basket: "Καλάθι € (προαιρετικό)", sort: "Ταξινόμηση",
    sortName: "Όνομα", sortFree: "Χαμηλότερο όριο δωρεάν", sortCost: "Φθηνότερο για το καλάθι μου",
    empty: "Δεν βρέθηκαν καταστήματα.", cost: "Κόστος αποστολής", free: "Δωρεάν μεταφορικά", over: "Άνω των", unknown: "Δεν επιβεβαιώθηκε",
    alwaysFree: "Πάντα δωρεάν", pickup: "Παραλαβή", needs: "με", freeNow: "Δωρεάν για το καλάθι σας", pay: "Θα πληρώσετε",
    add: "προσθέστε", toFree: "για δωρεάν αποστολή", unk: "Άγνωστο κόστος για το καλάθι σας",
    verified: "Επαληθευμένο", partial: "Μερικώς επαληθευμένο", unverified: "Μη επαληθευμένο", source: "πηγή", checkout: "checkout", cart: "καλάθι",
    ios: "iOS", android: "Android", shuffle: "πάτα για άλλο", why: "Εξήγηση του αστείου", hide: "Απόκρυψη εξήγησης", cy: "🇨🇾 Κυπριακά",
    shown: (n: number, total: number) => `${n} από ${total} καταστήματα`,
    footer: "Οι τιμές αλλάζουν συχνά. Επιβεβαιώστε στο checkout με επιλεγμένη την Κύπρο. Τα «μη επαληθευμένα» δεν έχουν ελεγχθεί ακόμη.",
  },
} as const
