// src/lib/ncbi.ts

const NCBI_API_KEY = "d04630666325386b9440cb4bd7019ae39107"; // Provided by the user
const EUTILS_BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

interface NcbiVariant {
  name: string;
  risk: string; // e.g., "High", "Medium", "Low"
  confidence: string; // e.g., "96%"
  color: string; // e.g., "destructive", "secondary", "primary"
}

export interface NcbiSearchResult {
  id: string;
  accession: string;
  title: string;
  organism: string;
  length: number;
  // Add other relevant fields as needed from ESummary
}

/**
 * Fetches emerging variant data from NCBI.
 * This is a placeholder function. Actual implementation would involve
 * making requests to NCBI's E-utilities (e.g., ESearch, EFetch, ESummary)
 * and parsing the XML/JSON responses.
 *
 * For demonstration, it returns mock data.
 */
export async function getEmergingVariants(): Promise<NcbiVariant[]> {
  // In a real scenario, you would construct NCBI API requests here.
  // Example: Fetching SARS-CoV-2 variants and their metadata.
  // This would involve using the NCBI_API_KEY for authenticated requests.

  // For now, return mock data to simulate API response.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Omicron (B.1.1.529)", risk: "High", confidence: "98%", color: "destructive" },
        { name: "Delta (B.1.617.2)", risk: "Medium", confidence: "92%", color: "secondary" },
        { name: "Alpha (B.1.1.7)", risk: "Low", confidence: "85%", color: "primary" },
        { name: "L452R", risk: "High", confidence: "90%", color: "destructive" }, // Example mutation
        { name: "P681R", risk: "Medium", confidence: "80%", color: "secondary" }, // Example mutation
      ]);
    }, 1000); // Simulate network delay
  });
}

export async function searchNcbiPathogens(query: string): Promise<NcbiSearchResult[]> {
  try {
    // Step 1: Use ESearch to find relevant UIDs (Unique Identifiers)
    const esearchUrl = `${EUTILS_BASE_URL}/esearch.fcgi?db=nuccore&term=${encodeURIComponent(query)}&retmode=json&api_key=${NCBI_API_KEY}`;
    const esearchResponse = await fetch(esearchUrl);
    const esearchData = await esearchResponse.json();

    if (!esearchData.esearchresult || !esearchData.esearchresult.idlist || esearchData.esearchresult.idlist.length === 0) {
      return [];
    }

    const idList = esearchData.esearchresult.idlist.join(',');

    // Step 2: Use ESummary to get detailed summaries for the UIDs
    const esummaryUrl = `${EUTILS_BASE_URL}/esummary.fcgi?db=nuccore&id=${idList}&retmode=json&api_key=${NCBI_API_KEY}`;
    const esummaryResponse = await fetch(esummaryUrl);
    const esummaryData = await esummaryResponse.json();

    const results: NcbiSearchResult[] = [];
    if (esummaryData.result && esummaryData.result.uids) {
      for (const uid of esummaryData.result.uids) {
        const doc = esummaryData.result[uid];
        if (doc) {
          results.push({
            id: uid,
            accession: doc.accessionversion || 'N/A',
            title: doc.title || 'No title',
            organism: doc.organism || 'Unknown organism',
            length: doc.slen || 0,
          });
        }
      }
    }
    return results;
  } catch (error) {
    console.error("Error fetching from NCBI E-utilities:", error);
    throw new Error("Failed to fetch search results from NCBI.");
  }
}

/**
 * Fetches general dashboard metrics from NCBI.
 * This is a placeholder function.
 */
export interface DashboardMetrics {
  activeSequences: string;
  newVariants: string;
  highRiskAlerts: string;
  countries: string;
  sequencesAnalyzed: string;
  aiConfidenceScore: string;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeSequences: "2,500,000",
        newVariants: "55",
        highRiskAlerts: "9",
        countries: "200",
        sequencesAnalyzed: "15,000",
        aiConfidenceScore: "95.5%",
      });
    }, 1200);
  });
}
