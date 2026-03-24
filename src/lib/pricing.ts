export type CountryPricing = {
  country: string;
  currency: string;
  symbol: string;
  explorers: string;
  builders: string;
  innovators: string;
};

export const PRICING: Record<string, CountryPricing> = {
  IN: { country: "India", currency: "INR", symbol: "₹",
    explorers: "18,999", builders: "20,999", innovators: "28,999" },
  AU: { country: "Australia", currency: "AUD", symbol: "A$",
    explorers: "349", builders: "389", innovators: "529" },
  SG: { country: "Singapore", currency: "SGD", symbol: "S$",
    explorers: "279", builders: "309", innovators: "419" },
  AE: { country: "UAE", currency: "AED", symbol: "AED ",
    explorers: "999", builders: "1,099", innovators: "1,499" },
  CA: { country: "Canada", currency: "CAD", symbol: "C$",
    explorers: "319", builders: "349", innovators: "479" },
  DEFAULT: { country: "International", currency: "USD", symbol: "$",
    explorers: "249", builders: "279", innovators: "379" },
};

export const DEFAULT_PRICING = PRICING.DEFAULT;

export async function detectCountryPricing(): Promise<CountryPricing> {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    const code = data.country_code as string;
    return PRICING[code] ?? PRICING.DEFAULT;
  } catch {
    return PRICING.DEFAULT;
  }
}
