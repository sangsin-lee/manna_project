import { decodeEntry } from "./soban-live";
import type { SobanStore } from "./soban-store";

export type SobanCohort = {
  product: "class" | "local_trip"; region: string; date: string;
  slot: "morning" | "afternoon" | "evening"; language: "ko" | "en";
  amount: number; people: number;
};
export type SobanOperations = {
  checkedAt: string; threshold: number; applicants: number; eligible: number;
  offers: number; verifiedOffers: number; suggested: number; waiting: number; connected: number;
  sources: { source: string; people: number }[]; groups: SobanCohort[]; additionalGroups: number;
};

export async function getSobanOperations(store: SobanStore, now = Date.now()): Promise<SobanOperations> {
  const [requestRows, offerRows] = await Promise.all([store.list("soban:request"),store.list("soban:offer")]);
  const offers = new Map(offerRows.flatMap(row => {
    const e = decodeEntry(row,now);
    return e?.kind === "offer" ? [[row.id, e] as const] : [];
  }));
  const applicants = new Set<string>(), eligible = new Set<string>();
  const sources = new Map<string, Set<string>>();
  const groups = new Map<string,{ group: SobanCohort; contacts: Set<string> }>();
  let suggested = 0, waiting = 0, connected = 0;
  for (const row of requestRows) {
    const e = decodeEntry(row, now);
    if (e?.kind !== "request") continue;
    const email = e.email.trim().toLowerCase();
    applicants.add(email);
    const source = ["direct","instagram","youtube","referral"].includes(e.source) ? e.source : "other";
    const audience = sources.get(source) ?? new Set<string>();
    audience.add(email);
    sources.set(source, audience);
    if (!e.verified) continue;
    if (e.paidIntent && e.amount > 0) {
      eligible.add(email);
      const {product,region,date,slot,language,amount} = e;
      const conditions = { product, region, date, slot, language, amount };
      const key = JSON.stringify(conditions);
      const group = groups.get(key) ?? { group: {...conditions,people: 0}, contacts: new Set<string>() };
      group.contacts.add(email);
      group.group.people = group.contacts.size;
      groups.set(key,group);
    }
    if (!e.matching) continue;
    for (const pair of e.pairs) {
      const offer = offers.get(pair.offer);
      if (pair.declined || !offer?.verified || !offer.matching) continue;
      if (pair.requestAccepted && pair.offerAccepted) connected++;
      else if (pair.requestAccepted || pair.offerAccepted) waiting++;
      else suggested++;
    }
  }
  const ordered = Array.from(groups.values(),g => g.group).sort((a,b) =>
    b.people - a.people || a.date.localeCompare(b.date) || a.region.localeCompare(b.region,"ko") ||
    a.slot.localeCompare(b.slot) || a.product.localeCompare(b.product) || a.language.localeCompare(b.language) || a.amount - b.amount);
  return {
    checkedAt: new Date(now).toISOString(), threshold: 6,
    applicants: applicants.size, eligible: eligible.size, offers: offers.size,
    verifiedOffers: Array.from(offers.values()).filter(o => o.verified).length,
    suggested, waiting, connected,
    groups: ordered.slice(0,50), additionalGroups: Math.max(0,ordered.length - 50),
    sources: Array.from(sources,([source,contacts]) => ({source,people:contacts.size})).sort((a,b) => b.people - a.people || a.source.localeCompare(b.source)),
  };
}
