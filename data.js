// Edit this file to add/update shops.
// status: "verified" = read from shop's own page, "partial" = from a news article / incomplete, "unverified" = not confirmed yet
window.SHOPS = [
  {
    name: "About You", url: "https://www.aboutyou.com.cy", categories: ["Fashion", "Beauty"],
    shippingFee: 2.90, freeOver: 24.90, status: "verified",
    note: "€2.90 shipping & service fee below €24.90.",
    source: "https://www.aboutyou.com.cy/c/help/shipping", checked: "2026-10-13"
  },
  {
    name: "Jinius", url: "https://www.jinius.com.cy", categories: ["Fashion", "Home", "Beauty"],
    shippingFee: null, freeOver: 85, status: "partial",
    note: "Free delivery over €85; free pickup from ACS lockers/stores. Fee under €85 not confirmed.",
    source: "https://www.jinius.com.cy", checked: "2026-10-13"
  },
  {
    name: "Skroutz", url: "https://www.skroutz.gr", categories: ["Electronics", "Home", "Fashion", "Beauty", "General"],
    shippingFee: 5, freeOver: 60, status: "partial",
    freeCond: "Skroutz Plus", note: "Marketplace, so fees vary by seller (~€5 average). Free only with Skroutz Plus (€9.99/mo): to a Skroutz Point on €40+, to your door on €60+.",
    source: "https://cyprus-mail.com/2026/07/06/skroutz-plus-in-cyprus-more-online-shopping-lower-shipping-costs", checked: "2026-10-13"
  },
  {
    name: "ASOS", url: "https://www.asos.com", categories: ["Fashion", "Beauty"],
    shippingFee: null, freeOver: null, status: "unverified",
    note: "Rates load dynamically and couldn't be read automatically. Select Cyprus at checkout to see them.",
    source: "https://www.asos.com/discover/delivery/", checked: null
  },
  {
    name: "Answear", url: "https://answear.com.cy", categories: ["Fashion", "Beauty"],
    shippingFee: null, freeOver: 70, status: "partial",
    note: "Free deliveries and returns over €70 (stated on their homepage). Fee below €70 not confirmed. Ships within 24h.",
    source: "https://answear.com.cy", checked: "2026-10-13"
  },
  {
    name: "Best Secret", url: "https://www.bestsecret.com", categories: ["Fashion"],
    shippingFee: null, freeOver: null, status: "unverified",
    note: "Members-only outlet behind a login, so terms couldn't be read without an account.",
    source: "https://www.bestsecret.com", checked: null
  },
  {
    name: "AWOL (Adventure Without Limits)", url: "https://www.awol.com.cy", categories: ["Sports"],
    shippingFee: null, freeOver: null, status: "partial",
    note: "Cycling retailer, ships within Cyprus only. Shipping cost not confirmed. Is this the AWOL you meant?",
    source: "https://www.awol.com.cy", checked: "2026-10-13"
  }
];
