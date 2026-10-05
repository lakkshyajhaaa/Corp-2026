import EventPage from '@/components/EventPage';

export default function InnoventiaPage() {
  return (
    <EventPage
      day="Day 01"
      tone="Startup Fair"
      title="INNOVENTIA"
      lead="Where capital meets unproven technology."
      body={[
        'Participants operate in a high-stakes environment where traditional metrics fail. The objective is not merely evaluation, but the identification of asymmetrical upside.',
        'Present your concept, face the panel and compete for seed funding and mentorship from people who have charted these waters before.',
      ]}
      points={[
        { title: 'Exposition', text: 'Primary analysis of disruptive architectures.' },
        { title: 'Negotiation', text: 'Formation of early-stage strategic alliances.' },
        { title: 'Mentorship', text: 'Seed funding and guidance for standout ventures.' },
      ]}
      cta={{ href: '/innoventia/startup-registration', label: 'Register your startup' }}
      next={{ href: '/hr-conclave', label: 'HR Conclave' }}
    />
  );
}
