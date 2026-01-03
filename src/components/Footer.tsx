import { Github, Mail, FileText, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border overflow-hidden">
      {/* Animated network background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 200">
          {/* Network lines */}
          {[
            { x1: 0, y1: 100, x2: 200, y2: 50 },
            { x1: 200, y1: 50, x2: 400, y2: 80 },
            { x1: 400, y1: 80, x2: 600, y2: 120 },
            { x1: 600, y1: 120, x2: 800, y2: 60 },
            { x1: 100, y1: 150, x2: 300, y2: 140 },
            { x1: 300, y1: 140, x2: 500, y2: 160 },
            { x1: 500, y1: 160, x2: 700, y2: 130 },
          ].map((line, i) => (
            <g key={i}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="hsl(180 100% 50%)"
                strokeWidth="2"
                className="animate-data-flow"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <circle cx={line.x1} cy={line.y1} r="3" fill="hsl(270 70% 65%)" />
              <circle cx={line.x2} cy={line.y2} r="3" fill="hsl(180 100% 50%)" />
            </g>
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* CTA Section */}
          <div className="text-center mb-12 p-8 rounded-2xl bg-gradient-cyber border border-primary/30 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-3">
              Join the <span className="text-primary">Genomic Revolution</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of the global effort to track and predict pathogen evolution in real-time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary/50 hover:bg-card/50 transition-all"
              >
                Request Demo
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-primary">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Data Sources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Github className="h-3 w-3" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Research Papers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Data Usage
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold">PS</span>
              </div>
              <span className="font-semibold">PathoScope AI</span>
            </div>

            <div className="text-sm text-muted-foreground">
              © 2025 PathoScope AI. Real-time genomic surveillance platform.
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span className="text-xs text-muted-foreground">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;