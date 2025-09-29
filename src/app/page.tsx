import ProjectCard, { Project } from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";

export default function Home() {
  const projects: Project[] = projectsData;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Eba Adisu Kenea
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          I am a software engineer from Ethiopia. While becoming one in an undeveloped country wasn&apos;t easy due to having fewer opportunities to succeed, I was always driven by the belief that adversity can be a motivator. I am committed to pushing the boundaries of software development through continuous learning and embracing emerging technologies.
        </p>
      </section>

      <section id="portfolio" className="my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">My Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="experience" className="my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
        <div className="relative max-w-4xl mx-auto">
          {experienceData.map((item) => (
            <TimelineItem
              key={item.id}
              title={item.role}
              subtitle={item.company}
              date={item.duration}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section id="education" className="my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
        <div className="relative max-w-4xl mx-auto">
          {educationData.map((item) => (
            <TimelineItem
              key={item.id}
              title={item.degree}
              subtitle={item.institution}
              date={String(item.year)}
              description={item.highlights}
            />
          ))}
        </div>
      </section>
    </div>
  );
}