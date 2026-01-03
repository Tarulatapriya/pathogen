import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type-safe interface for WHO indicator
interface WHOIndicator {
  NumericValue: number | string;
  TimeDim: string | number;
  Unit?: string;
}

// Top 5 WHO indicators
const TOP_INDICATORS = [
  { code: "WHOSIS_000001", name: "Life expectancy at birth (years)" },
  { code: "WHS9_86", name: "Infant mortality rate (per 1,000 live births)" },
  { code: "WHS9_88", name: "Under-five mortality rate (per 1,000 live births)" },
  { code: "WHS8_110", name: "Maternal mortality ratio (per 100,000 live births)" },
  { code: "WHS3_50", name: "Immunization coverage (%) – DTP3" },
];

export default function PublicHealth() {
  const [healthData, setHealthData] = useState<Record<string, WHOIndicator>>({});
  const [searchCountryCode, setSearchCountryCode] = useState("IND");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch WHO data using server-side proxy
  const fetchData = async (countryCode: string) => {
    setLoading(true);
    setError(null);
    const newHealthData: Record<string, WHOIndicator> = {};

    try {
      for (const indicator of TOP_INDICATORS) {
        const res = await fetch(`/api-who/api/${indicator.code}?$filter=SpatialDim eq '${countryCode}'`);
        if (!res.ok) {
          console.error(`HTTP error ${res.status} for ${indicator.code}`);
          newHealthData[indicator.code] = { NumericValue: "Error", TimeDim: "N/A" };
          continue; // Skip to the next indicator
        }
        const json = await res.json();
        console.log(`Response for ${indicator.code}:`, json); // Log the full JSON response
        if (json.value?.length) {
          const latest = json.value.sort(
            (a: WHOIndicator, b: WHOIndicator) => Number(b.TimeDim) - Number(a.TimeDim)
          )[0];
          newHealthData[indicator.code] = latest;
        } else {
          newHealthData[indicator.code] = { NumericValue: "N/A", TimeDim: "N/A" };
        }
      }
      return newHealthData;
    } catch (err) {
      console.error("WHO API error:", err);
      setError("⚠️ Failed to fetch data. Please check the country code or try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const doFetch = async () => {
      const data = await fetchData(searchCountryCode);
      if (!isCancelled && data) {
        setHealthData(data);
      }
    };

    doFetch();

    return () => {
      isCancelled = true;
    };
  }, [searchCountryCode]);

  const handleSearch = () => fetchData(searchCountryCode);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-2xl shadow-lg border border-blue-300">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-4">
        🌍 Global Health Insights
      </h2>

      {/* Search */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Input
          placeholder="Enter Country Code (e.g., IND)"
          value={searchCountryCode}
          onChange={(e) => setSearchCountryCode(e.target.value.toUpperCase())}
          className="w-48 border-blue-400 focus-visible:ring-blue-500"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold"
        >
          🔍 Search
        </Button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-blue-800 font-medium animate-pulse">Fetching WHO Data...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Table */}
      {!loading && !error && Object.keys(healthData).length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-inner bg-white/90">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-800 text-white">
                <TableHead className="w-1/2">Indicator</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TOP_INDICATORS.map((indicator, i) => {
                const data = healthData[indicator.code];
                const bg = i % 2 === 0 ? "bg-blue-50/70" : "bg-blue-100/70";
                return (
                  <TableRow key={indicator.code} className={`${bg} hover:bg-blue-200/60 transition-colors`}>
                    <TableCell className="font-semibold text-blue-900">{indicator.name}</TableCell>
                    <TableCell className="text-blue-700">{data?.TimeDim || "N/A"}</TableCell>
                    <TableCell className="text-blue-900 font-medium">
                      {data?.NumericValue !== undefined ? `${data.NumericValue} ${data.Unit || ""}` : "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <small className="block mt-5 text-blue-700/80 italic">
        Source: WHO Global Health Observatory (GHO)
      </small>
    </div>
  );
}
