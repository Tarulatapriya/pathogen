import PublicHealth from "@/components/PublicHealth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PublicHealthPage() {
  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">Public Health Intelligence</h1>
      <PublicHealth />
    </div>
  );
}
