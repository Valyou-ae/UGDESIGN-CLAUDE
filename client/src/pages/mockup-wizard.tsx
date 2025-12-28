import { Sidebar } from "@/components/sidebar";
import { MockupWizard } from "@/components/mockup-wizard";

export default function MockupWizardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-16">
        <MockupWizard />
      </main>
    </div>
  );
}
