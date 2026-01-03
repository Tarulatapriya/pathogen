import { Brain, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import proteinModel from "@/assets/protein-model.jpg";

const AIPredictor = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-card/50 backdrop-blur-sm">
              <Brain className="h-4 w-4 text-secondary" />
              <span className="text-sm">AI-Powered Evolution Forecasting</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Predicting the Future of{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Evolution
              </span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Our advanced machine learning models analyze millions of genomic sequences to forecast the next mutations before they emerge. By understanding evolutionary patterns, we help public health officials stay ahead of emerging threats.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/20">
                <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Deep Learning Architecture</div>
                  <div className="text-sm text-muted-foreground">
                    Transformer-based models trained on global sequence databases
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-secondary/20">
                <TrendingUp className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Mutation Trajectory Analysis</div>
                  <div className="text-sm text-muted-foreground">
                    Predict likely mutation pathways with confidence scoring
                  </div>
                </div>
              </div>
            </div>

            <Button variant="cyber" size="lg">
              Explore AI Models
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-primary/30 bg-card/20 backdrop-blur-sm">
              <img 
                src={proteinModel} 
                alt="3D Protein Model" 
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Overlay info cards */}
              <div className="absolute top-4 right-4 p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-primary/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                <div className="text-xs text-muted-foreground mb-1">Prediction Accuracy</div>
                <div className="text-2xl font-bold text-primary">96.8%</div>
              </div>

              <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-secondary/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <div className="text-xs text-muted-foreground mb-1">Next Mutation ETA</div>
                <div className="text-2xl font-bold text-secondary">14 days</div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/50 animate-float"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${4 + i}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPredictor;