import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LineageAssignment {
  toolUsed: string;
  result: string;
  confidence: number;
}

interface MutationAnalysis {
  gene: string;
  mutation: string;
  type: string;
  knownEffect: string;
}

interface RiskScore {
  category: string;
  score: number;
  reason: string;
}

interface PredictedMutation {
  potentialFutureMutation: string;
  confidence: number;
  expectedEffect: string;
}

interface GenomeAnalysisResultProps {
  sampleId: string;
  pathogen: string;
  collectionLocation: string;
  detectedVia: string;
  lineageAssignments: LineageAssignment[];
  mutationAnalysis: MutationAnalysis[];
  totalMutationsVsWuhan: number;
  mostFrequentCoMutationPattern: string;
  riskScores: RiskScore[];
  finalRiskTier: string;
  phylogeneticPlacement: string;
  predictedFutureMutations: PredictedMutation[];
  recommendedPublicHealthAction: string;
}

const GenomeAnalysisResult: React.FC<GenomeAnalysisResultProps> = ({
  sampleId,
  pathogen,
  collectionLocation,
  detectedVia,
  lineageAssignments,
  mutationAnalysis,
  totalMutationsVsWuhan,
  mostFrequentCoMutationPattern,
  riskScores,
  finalRiskTier,
  phylogeneticPlacement,
  predictedFutureMutations,
  recommendedPublicHealthAction,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sample Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Sample ID:</strong> {sampleId}</p>
          <p><strong>Pathogen:</strong> {pathogen}</p>
          <p><strong>Collection Location:</strong> {collectionLocation}</p>
          <p><strong>Detected via:</strong> {detectedVia}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🧬 Lineage Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool Used</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineageAssignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>{assignment.toolUsed}</TableCell>
                  <TableCell>{assignment.result}</TableCell>
                  <TableCell>{assignment.confidence.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔍 Mutation Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gene</TableHead>
                <TableHead>Mutation</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Known Effect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mutationAnalysis.map((mutation, index) => (
                <TableRow key={index}>
                  <TableCell>{mutation.gene}</TableCell>
                  <TableCell>{mutation.mutation}</TableCell>
                  <TableCell>{mutation.type}</TableCell>
                  <TableCell>{mutation.knownEffect}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4"><strong>Total Mutations vs Wuhan Reference (NC_045512.2):</strong> {totalMutationsVsWuhan}</p>
          <p><strong>Most Frequent Co-Mutation Pattern:</strong> {mostFrequentCoMutationPattern}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>⚠ Risk Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Score (0-5)</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskScores.map((score, index) => (
                <TableRow key={index}>
                  <TableCell>{score.category}</TableCell>
                  <TableCell>{score.score.toFixed(1)}</TableCell>
                  <TableCell>{score.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4"><strong>Final Risk Tier:</strong> <Badge variant="destructive">{finalRiskTier}</Badge></p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🌳 Phylogenetic Placement</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{phylogeneticPlacement}</p>
          <p className="text-sm text-muted-foreground mt-2">(Shown live on tree dashboard as a glowing node)</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔮 Predicted Future Mutations (AI Forecast)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Potential Future Mutation</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Expected Effect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictedFutureMutations.map((prediction, index) => (
                <TableRow key={index}>
                  <TableCell>{prediction.potentialFutureMutation}</TableCell>
                  <TableCell>{prediction.confidence.toFixed(2)}</TableCell>
                  <TableCell>{prediction.expectedEffect}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>✅ Recommended Public Health Action</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{recommendedPublicHealthAction}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenomeAnalysisResult;
