// Options for the strategy builder. Values are what the backtest API expects.

export const UNIVERSES = [
  { value: "is_nse_750", label: "Nifty 750" },
  { value: "is_nse_500", label: "Nifty 500" },
  { value: "is_nse_large_mid_250", label: "Nifty LargeMidcap 250" },
  { value: "is_nse_200", label: "Nifty 200" },
  { value: "is_nse_100", label: "Nifty 100" },
  { value: "is_nse_50", label: "Nifty 50" },
  { value: "is_nse_next_50", label: "Nifty Next 50" },
  { value: "is_nse_midcap_150", label: "Nifty Midcap 150" },
  { value: "is_nse_smallcap_250", label: "Nifty Smallcap 250" },
  { value: "is_nse_mid_small_400", label: "Nifty MidSmallcap 400" },
  { value: "is_nse_microcap_250", label: "Nifty Microcap 250" },
  { value: "is_nse_fno", label: "Nifty F&O stocks" },
  { value: "is_nse_allcap", label: "All NSE-listed stocks" },
];

export const MEDIAN_VOLUMES = [
  { value: "100000", label: "₹1 lakh" },
  { value: "1000000", label: "₹10 lakh" },
  { value: "2500000", label: "₹25 lakh" },
  { value: "10000000", label: "₹1 crore" },
  { value: "20000000", label: "₹2 crore" },
  { value: "40000000", label: "₹4 crore" },
  { value: "50000000", label: "₹5 crore" },
  { value: "80000000", label: "₹8 crore" },
  { value: "100000000", label: "₹10 crore" },
];

export const AWAY_FROM_HIGH = [
  { value: "-10", label: "Within 10%" },
  { value: "-20", label: "Within 20%" },
  { value: "-25", label: "Within 25%" },
  { value: "-30", label: "Within 30%" },
  { value: "-40", label: "Within 40%" },
  { value: "-50", label: "Within 50%" },
  { value: "-100", label: "No filter" },
];

export const SORT_BY = [
  { value: "return_one_year", label: "Absolute return, 1 year" },
  { value: "return_twelve_one", label: "12M ROC minus 1M ROC" },
  { value: "sharpe_return", label: "Sharpe return, 1 year" },
  { value: "sharpe_return_nine_months", label: "Sharpe return, 9 months" },
  { value: "sharpe_return_six_months", label: "Sharpe return, 6 months" },
  { value: "sharpe_return_three_months", label: "Sharpe return, 3 months" },
  { value: "sharpe_return_one_months", label: "Sharpe return, 1 month" },
  { value: "sharpe_return_twelve_six_months", label: "Average Sharpe, 12 and 6 months" },
  { value: "sharpe_return_twelve_six_three_months", label: "Average Sharpe, 12, 6 and 3 months" },
  { value: "sharpe_return_twelve_nine_six_three_months", label: "Average Sharpe, 12, 9, 6 and 3 months" },
  { value: "return_nine_months", label: "Absolute return, 9 months" },
  { value: "return_six_months", label: "Absolute return, 6 months" },
  { value: "return_three_months", label: "Absolute return, 3 months" },
  { value: "return_one_months", label: "Absolute return, 1 month" },
  { value: "volatility", label: "Annual volatility" },
  { value: "beta", label: "Annual beta to Nifty 50" },
  { value: "away_from_all_time_high", label: "Distance from all-time high" },
  { value: "sharpe_beta_return", label: "Sharpe return, 1 year ÷ beta" },
  { value: "sharpe_twelve_six_months_beta_return", label: "Average Sharpe, 12 and 6 months ÷ beta" },
  { value: "sharpe_twelve_six_three_months_beta_return", label: "Average Sharpe, 12, 6 and 3 months ÷ beta" },
  { value: "sharpe_twelve_nine_six_three_months_beta_return", label: "Average Sharpe, 12, 9, 6 and 3 months ÷ beta" },
];

// Historical data on the platform covers the last two years
export const DATA_YEARS = 2;

export const labelFor = (list, value) => list.find((o) => o.value === value)?.label ?? "—";

const iso = (d) => d.toISOString().slice(0, 10);
export const today = () => iso(new Date());
export const earliestDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - DATA_YEARS);
  return iso(d);
};

// Defaults match the first option of each list, as the original form did
export const emptyStrategy = () => ({
  name: "",
  from: earliestDate(),
  till: today(),
  index: UNIVERSES[0].value,
  median_volume: MEDIAN_VOLUMES[0].value,
  away_from_high: AWAY_FROM_HIGH[0].value,
  sort_by: SORT_BY[0].value,
});
