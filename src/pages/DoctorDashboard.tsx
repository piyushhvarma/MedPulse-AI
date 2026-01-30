import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Stethoscope,
  Search,
  SortDesc,
  Clock,
  Users,
  AlertTriangle,
  Filter,
  CheckCircle2,
  Activity
} from "lucide-react";
import { usePatients, Patient } from "@/hooks/usePatients";
import { getSeverityColor, getSeverityLabel } from "@/data/mockData";
import { cn } from "@/lib/utils";

const DoctorDashboard = () => {
  const { patients, loading, updatePatientStatus } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'severity' | 'time' | 'age'>('severity');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'moderate' | 'mild'>('all');

  // Filter and sort patients
  const filteredAndSortedPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.symptoms.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity = filterSeverity === 'all' ||
        (filterSeverity === 'critical' && patient.severity_score >= 80) ||
        (filterSeverity === 'moderate' && patient.severity_score >= 60 && patient.severity_score < 80) ||
        (filterSeverity === 'mild' && patient.severity_score < 60);

      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'severity':
          return b.severity_score - a.severity_score;
        case 'time':
          return new Date(a.checked_in_at).getTime() - new Date(b.checked_in_at).getTime();
        case 'age':
          return b.age - a.age;
        default:
          return 0;
      }
    });

  const criticalCount = patients.filter(p => p.severity_score >= 80).length;
  const moderateCount = patients.filter(p => p.severity_score >= 60 && p.severity_score < 80).length;
  const mildCount = patients.filter(p => p.severity_score < 60).length;

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeSinceCheckin = (dateString: string) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  const handleSeePatient = async (patientId: string) => {
    await updatePatientStatus(patientId, 'in-progress');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
                Doctor Dashboard
              </h1>
              <p className="text-muted-foreground">Real-time Triage & Patient Queue</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">System Online • Live Updates</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up delay-100">
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users className="w-24 h-24" />
            </div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Patients</p>
            <div className="text-4xl font-bold text-foreground mb-2">{patients.length}</div>
            <div className="flex items-center text-xs text-primary">
              <Activity className="w-3 h-3 mr-1" />
              <span>Active Queue</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-destructive/20 bg-destructive/5">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertTriangle className="w-24 h-24 text-destructive" />
            </div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Critical</p>
            <div className="text-4xl font-bold text-destructive mb-2">{criticalCount}</div>
            <div className="flex items-center text-xs text-destructive/80">
              <span>Immediate Attention</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-warning/20 bg-warning/5">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Clock className="w-24 h-24 text-warning" />
            </div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Moderate</p>
            <div className="text-4xl font-bold text-warning mb-2">{moderateCount}</div>
            <div className="flex items-center text-xs text-warning/80">
              <span>Standard Triage</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-success/20 bg-success/5">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <CheckCircle2 className="w-24 h-24 text-success" />
            </div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Mild</p>
            <div className="text-4xl font-bold text-success mb-2">{mildCount}</div>
            <div className="flex items-center text-xs text-success/80">
              <span>Stable Condition</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Panel */}
        <div className="glass-panel p-6 rounded-3xl animate-fade-in-up delay-200">

          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-border/50 rounded-xl focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex bg-muted/30 p-1 rounded-lg border border-border/50">
                {(['all', 'critical', 'moderate', 'mild'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterSeverity(filter)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                      filterSeverity === filter
                        ? "bg-white shadow-sm text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                    )}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setSortBy(sortBy === 'severity' ? 'time' : 'severity')}
                className="rounded-xl border-border/50"
              >
                <SortDesc className="h-4 w-4 mr-2" />
                Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-border/50 overflow-hidden bg-white/30 backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground">Pos</TableHead>
                  <TableHead className="font-semibold text-foreground">Patient</TableHead>
                  <TableHead className="font-semibold text-foreground hidden md:table-cell">Symptoms</TableHead>
                  <TableHead className="font-semibold text-foreground">Severity</TableHead>
                  <TableHead className="font-semibold text-foreground hidden sm:table-cell">Wait Time</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-primary/5 transition-colors border-border/50">
                    <TableCell>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {patient.queue_position}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.age} yrs</div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <div className="max-w-[200px] truncate" title={patient.symptoms}>
                        {patient.symptoms}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{patient.vitals}</div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={cn(
                          "uppercase tracking-wider font-semibold",
                          getSeverityColor(patient.severity_score) === 'destructive' ? 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20' :
                            getSeverityColor(patient.severity_score) === 'warning' ? 'bg-warning/15 text-warning-foreground hover:bg-warning/25 border-warning/20' :
                              'bg-success/15 text-success hover:bg-success/25 border-success/20'
                        )}
                        variant="outline"
                      >
                        {patient.severity_score} - {getSeverityLabel(patient.severity_score)}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">~{patient.estimated_wait_time}m</span>
                        <span className="text-xs text-muted-foreground">{getTimeSinceCheckin(patient.checked_in_at)}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="rounded-full shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow bg-primary hover:bg-primary/90"
                        onClick={() => handleSeePatient(patient.id)}
                      >
                        Attend
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAndSortedPatients.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No patients found</h3>
                <p className="text-muted-foreground">Adjust your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;