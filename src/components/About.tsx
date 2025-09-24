import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Globe, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Kollaborative Community",
      description: "Vernetze dich mit Gleichgesinnten und werde Teil einer globalen Bewegung für verantwortliche KI."
    },
    {
      icon: Target,
      title: "AI for Good",
      description: "Nutze KI-Technologie für positive gesellschaftliche Veränderungen und nachhaltige Entwicklung."
    },
    {
      icon: Globe,
      title: "Globales Netzwerk",
      description: "Als einer von über 100 Hubs weltweit sind wir Teil einer internationalen Gemeinschaft."
    },
    {
      icon: Heart,
      title: "Diversität & Inklusion",
      description: "Wir sind offen für alle Hintergründe - Diversität ist eine zentrale Stärke unserer Community."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Über uns
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Durch Initiativen wie die Young AI Leaders stellt AI for Good sicher, 
            dass junge Menschen die Fähigkeiten, Plattformen und Unterstützung erhalten, 
            um eine <strong>inklusive und nachhaltige</strong> digitale Zukunft zu gestalten.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;