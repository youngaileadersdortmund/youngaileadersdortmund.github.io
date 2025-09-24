import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, MessageCircle, Instagram, Music } from "lucide-react";

const Community = () => {
  const projects = [
    {
      title: "Dortmunder Kommunalwahl mit KI",
      description: "Derzeit analysieren wir die Dortmunder Kommunalwahl mit KI-Technologie für mehr Transparenz.",
      link: "https://dortmund-wahl-ki.de/",
      status: "Aktiv"
    }
  ];

  const socialLinks = [
    {
      platform: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/young-ai-leaders-dortmund/",
      color: "text-ai-blue"
    },
    {
      platform: "Discord",
      icon: MessageCircle,
      url: "https://discord.gg/QZBnSG7w9z",
      color: "text-ai-purple"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/youngaileaders_dortmund/",
      color: "text-ai-pink"
    },
    {
      platform: "TikTok",
      icon: Music,
      url: "https://www.tiktok.com/@youngaileaders_dortmund/",
      color: "text-ai-mint"
    }
  ];

  return (
    <section id="community" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Unsere Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Folge uns auf unseren Kanälen und werde Teil der Bewegung für verantwortliche KI.
          </p>
        </div>

        {/* Current Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Aktuelle Projekte</h3>
          <div className="max-w-2xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold">{project.title}</h4>
                    <span className="bg-ai-green/20 text-ai-green px-3 py-1 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  <Button asChild variant="outline" className="gap-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      Projekt besuchen
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Vernetze dich mit uns</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                size="lg"
                className="group hover:shadow-glow transition-all duration-300"
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="gap-3">
                  <social.icon className={`h-5 w-5 ${social.color} group-hover:scale-110 transition-transform`} />
                  {social.platform}
                  <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;