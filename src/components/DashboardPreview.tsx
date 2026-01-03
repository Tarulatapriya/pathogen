import { Activity, TrendingUp, AlertTriangle, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getEmergingVariants, getDashboardMetrics, DashboardMetrics } from "@/lib/ncbi";

interface NcbiVariant {
  name: string;
  risk: string;
  confidence: string;
  color: string;
}

const DashboardPreview = () => {
  const [variants, setVariants] = useState<NcbiVariant[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeSequences: "-",
    newVariants: "-",
    highRiskAlerts: "-",
    countries: "-",
    sequencesAnalyzed: "-",
    aiConfidenceScore: "-",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedVariants = await getEmergingVariants();
        setVariants(fetchedVariants);
        const fetchedMetrics = await getDashboardMetrics();
        setMetrics(fetchedMetrics);
      } catch (error) {
        console.error("Failed to fetch NCBI data:", error);
        // Set default/error state
        setVariants([]);
        setMetrics({
          activeSequences: "-",
          newVariants: "-",
          highRiskAlerts: "-",
          countries: "-",
          sequencesAnalyzed: "-",
          aiConfidenceScore: "-",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-card/30">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-radial opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-Time <span className="text-primary">Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Live surveillance and intelligence at your fingertips
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-6xl mx-auto">
          {/* Top metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Active Sequences", value: metrics.activeSequences || "-", change: "+12.5%", icon: Activity, color: "primary" },
              { label: "New Variants", value: metrics.newVariants || "-", change: "+8", icon: TrendingUp, color: "secondary" },
              { label: "High Risk Alerts", value: metrics.highRiskAlerts || "-", change: "+2", icon: AlertTriangle, color: "destructive" },
              { label: "Countries", value: metrics.countries || "-", change: "100%", icon: MapPin, color: "primary" },
            ].map((metric, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`h-5 w-5 text-${metric.color}`} />
                  <span className="text-xs text-muted-foreground">{metric.change}</span>
                </div>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Main dashboard area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Phylogenetic tree mockup */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Phylogenetic Tree</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
              
              {/* Nextstrain Phylogenetic Tree Embed */}
              <div className="h-80 rounded-lg bg-background/50 border border-primary/20 relative overflow-hidden">
                <iframe
                  src="https://nextstrain.org/ncov/gisaid/global/6m?f_country=North%20America&label=id:node_2023-06-20_node_100"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Nextstrain Phylogenetic Tree"
                ></iframe>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 text-xs">
                  {metrics.sequencesAnalyzed || "-"} sequences analyzed (via Nextstrain)
                </div>
              </div>
            </div>

            {/* Variant alerts */}
            <div className="p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border">
              <h3 className="text-lg font-semibold mb-4">Emerging Variants</h3>
              
              <div className="space-y-3">
                {variants.length > 0 ? (
                  variants.map((variant, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{variant.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full bg-${variant.color}/20 text-${variant.color}`}>
                          {variant.risk}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: variant.confidence }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{variant.confidence}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-muted-foreground">No emerging variants data available.</div>
                )}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-gradient-cyber border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">AI Confidence Score</div>
                <div className="text-2xl font-bold text-primary">{metrics.aiConfidenceScore || "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
