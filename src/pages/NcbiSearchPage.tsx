import React, { useState } from "react";
import NcbiSearch from "@/components/NcbiSearch";
import GenomeAnalysisResult from "@/components/GenomeAnalysisResult";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NcbiSearchResult, searchNcbiPathogens } from "@/lib/ncbi";

const NcbiSearchPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [searchResults, setSearchResults] = useState<NcbiSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysisResult = (accessionId: string) => {
    // This function would ideally make an API call to a backend
    // that performs the actual bioinformatics analysis.
    // For now, we'll simulate a detailed analysis based on the accessionId.
    setAnalysisResult({
      sampleId: accessionId,
      pathogen: 'SARS-CoV-2', // This would be determined by analysis
      collectionLocation: 'Global', // This would be determined by analysis
      detectedVia: 'Simulated Analysis',
      lineageAssignments: [
        { toolUsed: 'PANGO', result: 'B.1.1.529 (Omicron)', confidence: 0.95 },
        { toolUsed: 'Nextclade', result: '21K (Omicron)', confidence: 0.93 },
      ],
      mutationAnalysis: [
        { gene: 'Spike', mutation: 'K417N', type: 'Immune Escape', knownEffect: '↑ Antibody Resistance' },
        { gene: 'Spike', mutation: 'N501Y', type: 'Increased Binding', knownEffect: '↑ Infectivity' },
        { gene: 'ORF1a', mutation: 'P3395H', type: 'Replication Change', knownEffect: 'Neutral' },
        { gene: 'Nucleocapsid', mutation: 'R203K', type: 'Stability Change', knownEffect: 'Unknown' },
      ],
      totalMutationsVsWuhan: 55,
      mostFrequentCoMutationPattern: '{K417N + N501Y + D614G} — Seen in 80% of current global samples.',
      riskScores: [
        { category: 'Transmissibility', score: 4.5, reason: 'High receptor binding domain affinity' },
        { category: 'Immune Escape', score: 4.0, reason: 'Multiple immune escape mutations' },
        { category: 'Structural Impact', score: 3.0, reason: 'Minor structural changes' },
      ],
      finalRiskTier: '🟡 Moderate Concern Variant',
      phylogeneticPlacement: `Positioned in Omicron Cluster near recent global clades. Distance to nearest Delta sample: 25 SNPs.`,
      predictedFutureMutations: [
        { potentialFutureMutation: 'Spike R346T', confidence: 0.70, expectedEffect: 'Further immune escape' },
        { potentialFutureMutation: 'ORF1b L100F', confidence: 0.50, expectedEffect: 'Replication advantage' },
        { potentialFutureMutation: 'NSP5 T135I', confidence: 0.35, expectedEffect: 'Unknown' },
      ],
      recommendedPublicHealthAction: 'Continue genomic surveillance and vaccine efficacy monitoring.',
    });
  };

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null); // Clear previous analysis result

    try {
      const results = await searchNcbiPathogens(searchTerm);
      setSearchResults(results);
    } catch (err) {
      console.error("Error searching NCBI:", err);
      setError("Failed to fetch search results from NCBI. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultSelect = (accession: string, id: string) => {
    // When a search result is selected, trigger the detailed analysis
    fetchAnalysisResult(accession);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">PathoScope AI</div>
          <div className="flex gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/search" className="text-primary hover:text-primary transition-colors">Search NCBI</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto text-center mt-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          NCBI <span className="text-primary">Pathogen Search</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Search for pathogen genomes, genes, mutations, and more from the NCBI database.
        </p>
        <NcbiSearch onSearch={handleResultSelect} /> {/* Pass handleResultSelect for item clicks */}
        {loading && <p className="mt-4">Loading search results...</p>}
        {error && <p className="text-destructive mt-2">{error}</p>}

        {searchResults.length > 0 && !analysisResult && (
          <div className="mt-8 w-full max-w-md mx-auto">
            <h4 className="font-semibold text-lg text-left mb-2">NCBI Search Results:</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 rounded-md bg-background/50 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors text-left"
                  onClick={() => handleResultSelect(result.accession, result.id)}
                >
                  <p className="font-medium text-primary">{result.title}</p>
                  <p className="text-sm text-muted-foreground">Accession: {result.accession}</p>
                  <p className="text-sm text-muted-foreground">Organism: {result.organism}</p>
                  <p className="text-sm text-muted-foreground">Length: {result.length} bp</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="mt-12 w-full max-w-4xl mx-auto">
            <GenomeAnalysisResult {...analysisResult} />
          </div>
        )}
      </div>
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NcbiSearchPage;
