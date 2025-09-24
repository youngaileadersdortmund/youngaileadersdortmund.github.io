import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, Clock, Heart } from "lucide-react";

const JoinUs = () => {
  const benefits = [
    "Zugang zu einem globalen Netzwerk von über 100 Hubs",
    "Teilnahme an innovativen KI-Projekten",
    "Skill-Building Workshops und Events",
    "Mentoring und Karriereunterstützung",
    "Einfluss auf die Zukunft der KI-Entwicklung"
  ];

  const requirements = [
    {
      icon: Users,
      title: "Alter 18-30",
      description: "Jede:r zwischen 18 und 30 Jahren kann sich bewerben"
    },
    {
      icon: Clock,
      title: "4 Jahre",
      description: "Mitgliedschaft für bis zu vier Jahre möglich"
    },
    {
      icon: Heart,
      title: "Leidenschaft",
      description: "Interesse an KI für positive gesellschaftliche Veränderungen"
    }
  ];

  return (
    <section id="join" className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Werde ein Young AI Leader!
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Glaubst du, dass man KI für Gutes einsetzen sollte? Möchtest du dich mit Gleichgesinnten vernetzen 
            und Teil unserer <strong>kollaborativen Community</strong> werden?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Requirements */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Voraussetzungen</h3>
            <div className="space-y-6">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <req.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{req.title}</h4>
                    <p className="text-white/80">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Was du erhältst</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ai-mint flex-shrink-0 mt-1" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/80 text-sm mb-6">
                  <strong>Diversität ist eine zentrale Stärke</strong> unserer Community - 
                  wir sind offen für alle Hintergründe!
                </p>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full group bg-white text-primary hover:bg-white/90 shadow-glow"
                >
                  <a 
                    href="https://aiforgood.itu.int/young-ai-leaders-community/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Jetzt bewerben
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;