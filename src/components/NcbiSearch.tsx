import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { searchNcbiPathogens, NcbiSearchResult } from "@/lib/ncbi"; // Import NcbiSearchResult from lib

interface NcbiSearchProps {
  onSearch?: (searchTerm: string, resultId?: string) => void;
}

const NcbiSearch: React.FC<NcbiSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<NcbiSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await searchNcbiPathogens(searchTerm);
      setSearchResults(results);
      if (onSearch) {
        onSearch(searchTerm);
      }
    } catch (err) {
      console.error("Error searching NCBI:", err);
      setError("Failed to fetch search results. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for pathogen, gene, or mutation (e.g., 'SARS-CoV-2 Spike', 'L452R')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 bg-card/50 backdrop-blur-sm border border-primary/30 focus-visible:ring-primary"
        />
        <Button onClick={handleSearch} disabled={loading} variant="cyber">
          {loading ? "Searching..." : <Search className="h-5 w-5" />}
        </Button>
      </div>

      {error && <p className="text-destructive mt-2">{error}</p>}

      {searchResults.length > 0 && (
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
          <h4 className="font-semibold text-lg">Search Results:</h4>
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="p-3 rounded-md bg-background/50 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => onSearch && onSearch(result.accession, result.id)}
            >
              <p className="font-medium text-primary">{result.title}</p>
              <p className="text-sm text-muted-foreground">Accession: {result.accession}</p>
              <p className="text-sm text-muted-foreground">Organism: {result.organism}</p>
              <p className="text-sm text-muted-foreground">Length: {result.length} bp</p>
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && !loading && searchTerm.trim() && !error && (
        <p className="text-muted-foreground mt-4 text-center">No results found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default NcbiSearch;
