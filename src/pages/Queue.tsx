import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Activity,
  RefreshCw,
  Heart,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { getSeverityColor, getSeverityLabel } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Queue = () => {
  const { patients, loading, fetchPatients } = usePatients();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Use the first patient as the current patient for demo (in real app, this would be based on user session)
  const currentPatient = patients[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPatients();
    setTimeout(() => setRefreshing(false), 500); // Minimum spin time
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getWaitProgress = (position: number) => {
    return Math.max(0, 100 - (position * 20));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading wait list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow delay-700" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 border border-white/10 shadow-lg">
            <Users className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Patient <span className="gradient-text">Waiting List</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 dark:bg-black/20 border border-white/10 backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              {formatTime(currentTime)}
            </span>
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors gap-2"
              disabled={refreshing}
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              {refreshing ? "Updating..." : "Refresh"}
            </Button>
          </div>
        </div>

        {currentPatient ? (
          /* Current Patient Status */
          <div className="glass-panel p-1 rounded-3xl animate-fade-in-up delay-100 overflow-hidden">
            <div className="relative p-6 sm:p-10">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Your Status
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-primary tracking-tighter">
                      #{currentPatient.queue_position}
                    </span>
                    <span className="text-lg text-muted-foreground font-medium">
                      in line
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 max-w-sm">
                    {currentPatient.queue_position === 1 ? 'You are next!' : `You are ${currentPatient.queue_position === 2 ? '2nd' : `${currentPatient.queue_position}th`} in line.`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-border/50 min-w-[140px]">
                    <div className="text-sm text-muted-foreground mb-1">Estimated Wait</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      {currentPatient.estimated_wait_time}<span className="text-sm font-normal text-muted-foreground">min</span>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-border/50 min-w-[140px]">
                    <div className="text-sm text-muted-foreground mb-1">Urgency Level</div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "px-2.5 py-0.5 rounded-lg text-sm font-semibold capitalize shadow-none",
                          currentPatient.severity_score >= 80 ? "bg-destructive/10 text-destructive border-destructive/20" :
                            currentPatient.severity_score >= 60 ? "bg-warning/10 text-warning-foreground border-warning/20" :
                              "bg-success/10 text-success border-success/20"
                        )}
                      >
                        {getSeverityLabel(currentPatient.severity_score)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-muted/20 p-6 rounded-2xl border border-border/40">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Progress to Seeing Doctor</span>
                  <span className="text-primary">{getWaitProgress(currentPatient.queue_position)}%</span>
                </div>
                <Progress
                  value={getWaitProgress(currentPatient.queue_position)}
                  className="h-3 rounded-full bg-muted/50"
                  indicatorClassName={cn(
                    "bg-gradient-to-r from-primary to-accent transition-all duration-1000",
                    currentPatient.queue_position === 1 && "animate-pulse"
                  )}
                />
                <div className="flex justify-between text-xs text-muted-foreground pt-1">
                  <span>Checked In</span>
                  <span>Ready for Doctor</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-3xl animate-fade-in-up">
            <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Line is Empty</h3>
            <p className="text-muted-foreground">There is currently no one waiting.</p>
          </div>
        )}

        {/* Queue List */}
        <div className="glass-panel p-6 rounded-3xl animate-fade-in-up delay-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Current Line
            </h3>
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
              {patients.length} Waiting
            </span>
          </div>

          <div className="space-y-3">
            {patients.slice(0, 5).map((patient, index) => (
              <div
                key={patient.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                  patient.id === currentPatient?.id
                    ? "bg-primary/5 border-primary/30 shadow-sm"
                    : "bg-white/40 dark:bg-white/5 border-transparent hover:border-border/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm",
                    patient.id === currentPatient?.id
                      ? "bg-primary text-primary-foreground shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-foreground flex items-center gap-2">
                      {patient.id === currentPatient?.id ? (
                        <>
                          You
                          <Badge variant="outline" className="text-[10px] h-4 px-1 py-0 border-primary/20 text-primary">me</Badge>
                        </>
                      ) : (
                        `Patient ${patient.id.slice(0, 4)}...`
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Wait: ~{patient.estimated_wait_time}m
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    getSeverityColor(patient.severity_score) === 'destructive' ? "bg-destructive" :
                      getSeverityColor(patient.severity_score) === 'warning' ? "bg-warning" :
                        "bg-success"
                  )} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 text-xs text-muted-foreground border border-border/30">
              <AlertCircle className="w-3.5 h-3.5" />
              Times are estimates. Patients with urgent needs may be seen first.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;