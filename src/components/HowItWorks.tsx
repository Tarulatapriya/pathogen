import { Database, Microscope, Brain, Bell, CheckCircle2, Workflow } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Fetch",
    description: "Collect global genomic sequences from public repositories",
    color: "primary",
  },
  {
    icon: CheckCircle2,
    title: "Quality Control",
    description: "Validate and filter sequences for accuracy",
    color: "secondary",
  },
  {
    icon: Workflow,
    title: "Variant Calling",
    description: "Identify mutations and genetic variations",
    color: "primary",
  },
  {
    icon: Microscope,
    title: "Lineage Assignment",
    description: "Classify variants into evolutionary lineages",
    color: "secondary",
  },
  {
    icon: Brain,
    title: "AI Prediction",
    description: "Forecast emerging mutations using machine learning",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Public Health Alerts",
    description: "Generate actionable insights and early warnings",
    color: "secondary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-primary">It Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered pipeline processes millions of genomic sequences in real-time
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 hidden lg:block" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="relative p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-${step.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`h-6 w-6 text-${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>

                {/* Flowing data animation on hover */}
                <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent animate-data-flow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-sm">Processing data in real-time across 195+ countries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;