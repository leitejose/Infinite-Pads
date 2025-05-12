import { Button } from "@/components/ui/button";

const patches = ["warm", "bright", "ambient", "deep", "soft"];

export function PatchSelector({ patch, onChange }: { patch: string; onChange: (p: string) => void }) {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-5 gap-4 p-2 w-[50vw] h-auto">
        {patches.map((p) => (
          <Button
            key={p}
            variant={p === patch ? "default" : "outline"}
            onClick={() => onChange(p)}
            className="text-2xl rounded-lg p-2 flex items-center justify-center w-full h-full bg-gradient-to-b from-[#eb214e] to-[#eb214e] hover:bg-gradient-to-b hover:from-[#f53e67] hover:to-[#f53e67] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus-visible:ring-slate-600 dark:data-[state=open]:bg-slate-100"
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}