import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CloudUpload,
  FileCheck2,
  Save,
  Search,
  ShieldCheck,
  History,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { recentVisitors } from "@/lib/mock-data";

export const Route = createFileRoute("/requests/new")({
  head: () => ({ meta: [{ title: "New Visitor Request · Sentry-Ops" }] }),
  component: NewRequest,
});

const steps = [
  { n: 1, label: "Visitor identity" },
  { n: 2, label: "Visit details" },
  { n: 3, label: "Documents" },
  { n: 4, label: "Review & submit" },
];

function NewRequest() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [upload, setUpload] = useState<{ name: string; size: string; progress: number } | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    org: "",
    email: "",
    phone: "",
    idType: "",
    idNumber: "",
    purpose: "",
    department: "",
    visitDate: "",
    duration: "",
    notes: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (file: File) => {
    setUpload({ name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, progress: 0 });
    let p = 0;
    const t = setInterval(() => {
      p += 12;
      setUpload((u) => (u ? { ...u, progress: Math.min(p, 100) } : u));
      if (p >= 100) {
        clearInterval(t);
        toast.success("Document encrypted & uploaded", { description: file.name });
      }
    }, 120);
  };

  const reuseVisitor = (v: typeof recentVisitors[number]) => {
    setForm((f) => ({
      ...f,
      fullName: v.name,
      org: v.org,
      phone: v.phone,
      email: `${v.name.split(" ")[0].toLowerCase()}@${v.org.toLowerCase().replace(/\s+/g, "")}.in`,
    }));
    setSearchOpen(false);
    toast.success(`Profile loaded · ${v.id}`, {
      description: `${v.visits} prior visits · last on ${v.lastVisit}`,
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-2">
            <ArrowLeft className="h-3 w-3" /> Operations
          </Link>
          <div className="stencil mb-1">Form · VP-NEW</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Raise visitor pass request</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Drafts autosave to encrypted operator cache every 30 seconds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border bg-card" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4" /> Lookup repeat visitor
          </Button>
          <Button variant="ghost" onClick={() => toast.success("Draft saved", { description: "Operator cache · 09:42 IST" })}>
            <Save className="h-4 w-4" /> Save draft
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Stepper rail */}
        <aside className="space-y-1">
          <Card className="bg-card border-border p-2">
            {steps.map((s, idx) => {
              const done = s.n < step;
              const active = s.n === step;
              return (
                <button
                  key={s.n}
                  onClick={() => setStep(s.n)}
                  className={cn(
                    "w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors",
                    active && "bg-secondary",
                    !active && "hover:bg-secondary/50",
                  )}
                >
                  <div
                    className={cn(
                      "h-7 w-7 rounded-sm grid place-items-center text-xs mono font-semibold border",
                      done && "bg-success text-success-foreground border-success",
                      active && !done && "bg-accent text-accent-foreground border-accent",
                      !done && !active && "border-border text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : `0${s.n}`}
                  </div>
                  <div>
                    <div className="stencil text-[9px]">Step {s.n}</div>
                    <div className="text-xs font-medium">{s.label}</div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="ml-auto text-muted-foreground text-xs mono">{idx + 1}/{steps.length}</div>
                  )}
                </button>
              );
            })}
          </Card>
          <Card className="bg-card border-border p-3 mt-3">
            <div className="stencil mb-1.5">Clearance reminder</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All visitor data is classified <span className="text-accent mono">RESTRICTED</span>.
              Cross-verify government ID against physical document at gate.
            </p>
          </Card>
        </aside>

        {/* Form body */}
        <Card className="bg-card border-border">
          {/* Progress */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="stencil">Step {step} of {steps.length}</div>
              <div className="mono text-[10px] text-muted-foreground">{Math.round((step / steps.length) * 100)}%</div>
            </div>
            <Progress value={(step / steps.length) * 100} className="h-1 bg-secondary" />
          </div>

          <div className="p-6 space-y-5">
            {step === 1 && (
              <>
                <SectionTitle title="Visitor identity" subtitle="Personal & contact details" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full name" required>
                    <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Ramesh Mehta" />
                  </Field>
                  <Field label="Organization / company" required>
                    <Input value={form.org} onChange={(e) => update("org", e.target.value)} placeholder="e.g. Tata Advanced Systems" />
                  </Field>
                  <Field label="Email address" required>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="visitor@org.in" />
                  </Field>
                  <Field label="Mobile number" required>
                    <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 …" />
                  </Field>
                  <Field label="Government ID type" required>
                    <Select value={form.idType} onValueChange={(v) => update("idType", v)}>
                      <SelectTrigger><SelectValue placeholder="Select ID type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aadhaar">Aadhaar</SelectItem>
                        <SelectItem value="pan">PAN Card</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="driving">Driving License</SelectItem>
                        <SelectItem value="govt">Govt. service ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Government ID number" required>
                    <Input value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} placeholder="XXXX XXXX 0000" className="mono" />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <SectionTitle title="Visit details" subtitle="Purpose, destination & timing" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Purpose of visit" required className="md:col-span-2">
                    <Input value={form.purpose} onChange={(e) => update("purpose", e.target.value)} placeholder="e.g. Avionics maintenance" />
                  </Field>
                  <Field label="Department to visit" required>
                    <Select value={form.department} onValueChange={(v) => update("department", v)}>
                      <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hangar4">Hangar 4 · Engineering</SelectItem>
                        <SelectItem value="rnd">R&D · Wing C</SelectItem>
                        <SelectItem value="admin">Admin Block</SelectItem>
                        <SelectItem value="logistics">Logistics · Gate B</SelectItem>
                        <SelectItem value="hr">HR · Recruitment</SelectItem>
                        <SelectItem value="public">Public Affairs</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Expected duration" required>
                    <Select value={form.duration} onValueChange={(v) => update("duration", v)}>
                      <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="2h">2 hours</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                        <SelectItem value="full">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Intended visit date & time" required className="md:col-span-2">
                    <Input type="datetime-local" value={form.visitDate} onChange={(e) => update("visitDate", e.target.value)} />
                  </Field>
                  <Field label="Additional notes" className="md:col-span-2">
                    <Textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Equipment being carried, escort requirements, prior coordination…"
                      rows={4}
                    />
                  </Field>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <SectionTitle title="Identity documents" subtitle="Scan or upload government ID (PDF/JPG · max 8 MB)" />
                <label
                  htmlFor="id-upload"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleFile(f);
                  }}
                  className="block border border-dashed border-border rounded-sm p-10 text-center cursor-pointer hover:border-accent/60 hover:bg-secondary/30 transition-colors"
                >
                  <CloudUpload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <div className="text-sm font-medium">Drop government ID here</div>
                  <div className="text-xs text-muted-foreground mt-1 mono">or click to browse · encrypted in transit</div>
                  <input
                    id="id-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </label>

                {upload && (
                  <Card className="p-4 bg-background border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-sm bg-secondary grid place-items-center">
                        <FileCheck2 className={cn("h-5 w-5", upload.progress === 100 ? "text-success" : "text-accent")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{upload.name}</div>
                        <div className="flex items-center justify-between text-[11px] mono text-muted-foreground">
                          <span>{upload.size}</span>
                          <span>{upload.progress}%</span>
                        </div>
                        <Progress value={upload.progress} className="h-1 mt-1.5 bg-secondary" />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setUpload(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <SectionTitle title="Review & submit" subtitle="Verify before forwarding to HR clearance desk" />
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    ["Visitor", form.fullName || "—"],
                    ["Organization", form.org || "—"],
                    ["Phone", form.phone || "—"],
                    ["Email", form.email || "—"],
                    ["ID", `${form.idType || "—"} · ${form.idNumber || "—"}`],
                    ["Purpose", form.purpose || "—"],
                    ["Department", form.department || "—"],
                    ["Visit time", form.visitDate || "—"],
                    ["Duration", form.duration || "—"],
                    ["Document", upload?.name || "Not attached"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-sm bg-background border border-border p-3">
                      <div className="stencil">{k}</div>
                      <div className="text-sm mt-1 truncate">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-sm border border-accent/30 bg-accent/5 p-3 flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Submitting forwards this request to <span className="text-foreground">HR Clearance Desk · Maj. P. Iyer</span>.
                    Expected decision SLA: <span className="mono text-accent">45 minutes</span>.
                  </p>
                </div>
              </>
            )}
          </div>

          <Separator className="bg-border" />
          <div className="p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            {step < steps.length ? (
              <Button className="bg-primary hover:brightness-110" onClick={() => setStep((s) => s + 1)}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-accent text-accent-foreground hover:brightness-110" onClick={() => setOpen(true)}>
                <ShieldCheck className="h-4 w-4" /> Submit to HR clearance
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Repeat visitor search modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <div className="stencil">Lookup · Visitor archive</div>
            <DialogTitle>Find an existing visitor</DialogTitle>
            <DialogDescription>
              Search by phone number, visitor ID, or name to autofill the form.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="+91 98214… or VIS-1042" className="pl-9 bg-background" autoFocus />
          </div>
          <div>
            <div className="stencil mb-2">Recent suggestions</div>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {recentVisitors.map((v) => (
                <button
                  key={v.id}
                  onClick={() => reuseVisitor(v)}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-sm hover:bg-secondary/60 border border-transparent hover:border-border transition-colors"
                >
                  <div className="h-9 w-9 rounded-sm bg-secondary grid place-items-center text-xs font-semibold">
                    {v.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{v.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{v.org} · {v.phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-[10px] text-muted-foreground">{v.id}</div>
                    <div className="text-[11px] flex items-center gap-1 text-muted-foreground">
                      <History className="h-3 w-3" /> {v.visits} visits · {v.lastVisit}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success confirmation */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <div className="mx-auto h-14 w-14 rounded-sm bg-success/15 text-success grid place-items-center mb-2">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <DialogTitle className="text-center">Request forwarded to HR</DialogTitle>
            <DialogDescription className="text-center">
              Pass <span className="mono text-accent">VP-3048</span> has been generated and is awaiting clearance.
              You will be notified when a decision is logged.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-sm border border-border bg-background p-3 grid grid-cols-3 gap-2 text-center">
            <div><div className="stencil">SLA</div><div className="mono text-sm mt-0.5">45m</div></div>
            <div><div className="stencil">Routed to</div><div className="text-xs mt-0.5">Maj. P. Iyer</div></div>
            <div><div className="stencil">Priority</div><div className="text-xs mt-0.5 text-accent">Standard</div></div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-border" onClick={() => setOpen(false)}>Raise another</Button>
            <Button asChild className="bg-accent text-accent-foreground hover:brightness-110">
              <Link to="/requests">Track request</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs text-muted-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-accent">*</span>}
      </Label>
      {children}
    </div>
  );
}
