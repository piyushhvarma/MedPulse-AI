import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  UserPlus,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePatients } from "@/hooks/usePatients";
import { getSeverityColor, getSeverityLabel } from "@/data/mockData";

interface CheckInResult {
  queueNumber: number;
  estimatedWaitTime: number;
  severityScore: number;
  position: number;
}

const CheckIn = () => {
  const { toast } = useToast();
  const { checkInPatient } = usePatients();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    symptoms: "",
    vitals: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null);

  // Simulate AI triage scoring (mock logic kept same)
  const calculateSeverityScore = (symptoms: string, age: number): number => {
    let score = 20;
    const symptomKeywords = symptoms.toLowerCase();

    if (symptomKeywords.includes("chest pain") ||
      symptomKeywords.includes("difficulty breathing") ||
      symptomKeywords.includes("shortness of breath")) {
      score += 50;
    }

    if (symptomKeywords.includes("headache") ||
      symptomKeywords.includes("nausea") ||
      symptomKeywords.includes("dizziness")) {
      score += 30;
    }

    if (age > 65) score += 15;
    if (age < 5) score += 20;

    score += Math.floor(Math.random() * 15);
    return Math.min(100, Math.max(10, score));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.symptoms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const age = parseInt(formData.age);
      const result = await checkInPatient({
        name: formData.name,
        age,
        symptoms: formData.symptoms,
        vitals: formData.vitals || undefined
      });

      if (result?.success) {
        const patient = result.patient;
        setCheckInResult({
          queueNumber: parseInt(result.queueNumber, 16),
          estimatedWaitTime: patient.estimated_wait_time,
          severityScore: patient.severity_score,
          position: patient.queue_position
        });
      }
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (checkInResult) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full glass-panel p-8 rounded-3xl animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6 animate-pulse-glow">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Check-in Complete!</h2>
            <p className="text-muted-foreground">You are now on the waiting list.</p>
          </div>

          <div className="space-y-8">
            {/* Queue Number */}
            <div className="text-center bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Your Number</div>
              <div className="text-5xl font-bold text-primary tracking-tight">
                #{checkInResult.queueNumber}
              </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-xl text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{checkInResult.estimatedWaitTime}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase">Minutes Wait</div>
              </div>

              <div className="glass-card p-4 rounded-xl text-center">
                <Activity className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{checkInResult.position}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase">Position in Line</div>
              </div>

              <div className="glass-card p-4 rounded-xl text-center">
                <HeartPulse className="h-5 w-5 text-destructive mx-auto mb-2" />
                <Badge
                  className={`mt-1 ${checkInResult.severityScore > 75 ? 'bg-destructive/15 text-destructive border-destructive/20 hover:bg-destructive/25' :
                      checkInResult.severityScore > 50 ? 'bg-warning/15 text-warning-foreground border-warning/20 hover:bg-warning/25' :
                        'bg-success/15 text-success border-success/20 hover:bg-success/25'
                    }`}
                >
                  {getSeverityLabel(checkInResult.severityScore)}
                </Badge>
                <div className="text-xs text-muted-foreground font-medium uppercase mt-2">Priority</div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-warning-foreground mb-1">Important Notice</p>
                <p className="text-muted-foreground">
                  If you feel worse while waiting, please tell the front desk immediately or call for help.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setCheckInResult(null)}
                variant="outline"
                className="flex-1 rounded-full py-6"
              >
                New Check-in
              </Button>
              <Button
                onClick={() => window.location.href = '/queue'}
                className="flex-1 rounded-full py-6 shadow-lg shadow-primary/20"
              >
                View Waiting List
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block space-y-8 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              <Stethoscope className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Fast Check-In</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Patient <br /><span className="gradient-text">Check-In</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our smart system helps doctors understand your needs quickly so you get the right care.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { title: "Quick Assessment", desc: "Immediate understanding of your condition" },
              { title: "Live Updates", desc: "See your spot in line" },
              { title: "Privacy First", desc: "Your health data is safe with us" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="glass-panel p-8 rounded-3xl animate-fade-in-up delay-200">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Patient Check-In</h1>
            <p className="text-muted-foreground">Enter your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-white/50 border-primary/10 focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground/80">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="bg-white/50 border-primary/10 focus:border-primary/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms" className="text-foreground/80">How are you feeling?</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms (e.g. headache, fever, pain)..."
                rows={4}
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                className="bg-white/50 border-primary/10 focus:border-primary/50 transition-colors resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vitals" className="text-foreground/80">Health Stats (Optional)</Label>
              <Input
                id="vitals"
                placeholder="Blood Pressure, Heart Rate, etc."
                value={formData.vitals}
                onChange={(e) => handleInputChange("vitals", e.target.value)}
                className="bg-white/50 border-primary/10 focus:border-primary/50 transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Get Checked In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;