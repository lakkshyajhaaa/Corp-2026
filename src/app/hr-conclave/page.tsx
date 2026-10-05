import EventPage from '@/components/EventPage';

export default function HRConclavePage() {
  return (
    <EventPage
      day="Day 02"
      tone="Leadership Symposium"
      title="HR CONCLAVE"
      lead="Human capital, at the helm."
      body={[
        'Navigate shifting paradigms in organisational architecture. This symposium examines the structural integrity of corporate leadership under sustained pressure.',
        'Take part in intricate case studies, panel discussions and advanced HR strategy simulations alongside leaders who steer organisations through changing tides.',
      ]}
      points={[
        { title: 'Panel A: Structural Integrity', text: 'Maintaining corporate culture during rapid scaling.' },
        { title: 'Keynote: The Talent Market', text: 'Acquisition strategies in highly competitive sectors.' },
        { title: 'Case Studies', text: 'Hands-on HR strategy simulations.' },
      ]}
      cta={{ href: '/register', label: 'Register now' }}
      prev={{ href: '/innoventia', label: 'Innoventia' }}
      next={{ href: '/corpeureka', label: 'CorpEureka' }}
    />
  );
}
