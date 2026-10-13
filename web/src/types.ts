export type Status = "verified" | "partial" | "unverified"

export interface Shop {
  name: string
  url: string
  categories: string[]
  /** home-delivery fee below the free threshold (0 = always free, null = unknown) */
  shippingFee: number | null
  /** order value for free home delivery (0 = always free, null = unknown) */
  freeOver: number | null
  /** condition for the free tier, e.g. a paid subscription */
  freeCond?: string
  status: Status
  pickup?: string
  note: string
  source: string
  sourceLabel?: "checkout" | "cart"
  checked: string | null
  apps?: { ios?: string; android?: string }
}
