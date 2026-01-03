import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeGenome } from '@/lib/gemini';

const VirusBacteriaSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    try {
      const analysisResults = await analyzeGenome(searchTerm);
      setResults(analysisResults);
    } catch (err) {
      setError('Failed to analyze genome. Please check the sample ID and your API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Virus/Bacteria Genome Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter Virus/Bacteria Name or Sample ID (e.g., EPI_ISL_1704655)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Genome'}
            </Button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {results && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Sample ID:</strong> {results.sampleId}</div>
                <div><strong>Pathogen:</strong> {results.pathogen}</div>
                <div><strong>Collection Location:</strong> {results.collectionLocation}</div>
                <div><strong>Detected via:</strong> {results.detectedVia}</div>
              </div>

              <Card>
                <CardHeader><CardTitle>Lineage Assignment</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 font-semibold">
                    <div>Tool Used</div><div>Result</div><div>Confidence</div>
                  </div>
                  {results.lineageAssignment.map((lineage, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <div>{lineage.tool}</div><div>{lineage.result}</div><div>{lineage.confidence}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Mutation Analysis</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 font-semibold">
                    <div>Gene</div><div>Mutation</div><div>Type</div><div>Known Effect</div>
                  </div>
                  {results.mutationAnalysis.map((mutation, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2">
                      <div>{mutation.gene}</div><div>{mutation.mutation}</div><div>{mutation.type}</div><div>{mutation.knownEffect}</div>
                    </div>
                  ))}
                   <p className="mt-2"><strong>Total Mutations vs Wuhan Reference:</strong> {results.totalMutations}</p>
                   <p><strong>Most Frequent Co-Mutation Pattern:</strong> {results.coMutationPattern}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Risk Scores</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2 font-semibold">
                        <div>Category</div><div>Score (0-5)</div><div>Reason</div>
                    </div>
                    {results.riskScores.map((score, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2">
                        <div>{score.category}</div><div>{score.score}</div><div>{score.reason}</div>
                        </div>
                    ))}
                    <p className="mt-2 text-lg"><strong>Final Risk Tier:</strong> {results.finalRiskTier}</p>
                </CardContent>
              </Card>

                <div>
                    <h3 className="font-bold text-lg">Phylogenetic Placement</h3>
                    <p>{results.phylogeneticPlacement}</p>
                </div>

                 <Card>
                    <CardHeader><CardTitle>Predicted Future Mutations (AI Forecast)</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-2 font-semibold">
                            <div>Potential Future Mutation</div><div>Confidence</div><div>Expected Effect</div>
                        </div>
                        {results.predictedFutureMutations.map((prediction, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2">
                            <div>{prediction.mutation}</div><div>{prediction.confidence}</div><div>{prediction.effect}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="p-4 bg-green-100 rounded-md">
                    <h3 className="font-bold text-lg text-green-800">Recommended Public Health Action</h3>
                    <p className="text-green-700">{results.recommendedAction}</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VirusBacteriaSearch;
