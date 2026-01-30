import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Activity,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  BrainCircuit
} from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Landing = () => {
  const stats = [
    { value: "30%", label: "Less Waiting Time", icon: Clock },
    { value: "99.9%", label: "Assessment Accuracy", icon: Activity },
    { value: "24/7", label: "Always Available", icon: Shield },
    { value: "500+", label: "Trusted Hospitals", icon: Users },
  ];

  const features = [
    {
      icon: BrainCircuit,
      title: "Smart Health Check",
      description: "Our smart system understands your symptoms to help doctors see you faster."
    },
    {
      icon: Clock,
      title: "Live Wait Times",
      description: "See exactly how long you might wait before you even arrive."
    },
    {
      icon: Users,
      title: "Doctor's Dashboard",
      description: "A clear view for medical staff to manage patient care efficiently."
    },
    {
      icon: TrendingUp,
      title: "Better Care",
      description: "Helping hospitals work smoother so you get the attention you need."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] animate-pulse-glow delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-8 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase">Smart Healthcare For Everyone</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Faster Care <br />
              <span className="gradient-text">When You Need It</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              MedPulse helps you check in quickly and get the right care at the right time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/check-in">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                  Check In Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card p-4 rounded-2xl text-center group hover:-translate-y-1 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Simple & <span className="text-primary">Reliable</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We use advanced technology to make your hospital visit smoother and faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-3xl relative overflow-hidden group border-l-4 border-l-transparent hover:border-l-primary transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 group-hover:bg-primary/5 transition-all duration-500 rounded-bl-3xl">
                  <feature.icon className="w-24 h-24 text-primary" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-12 rounded-[2.5rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience the Future Today</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join over 500+ hospitals transforming their emergency response experience.
              </p>
              <Link to="/check-in">
                <Button size="lg" className="rounded-full px-10 py-7 text-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105">
                  Check In Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
