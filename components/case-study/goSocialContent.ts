// Copy for the Go Social case study page — kept separate from app/content.ts
// since this is one tightly-coupled, one-off long-form layout rather than
// site-wide copy.

export const meta = {
  tags: ['Mobile App', 'Maps & AR', 'Social Discovery', 'UX Design'],
  role: 'Product Designer',
  timeline: '6 months',
  team: 'Solo',
  sectionRange: '01–11',
  year: '2026',
}

export const hero = {
  sectionLabel: '01 / What is GoSocial?',
  headline: ['A social app that helps people find their ', 'next conversation', '.'],
  paragraph:
    'People in shared spaces struggle to discover and connect with those around them, causing missed opportunities for friendships, collaboration, and community engagement.',
  qa: [
    { q: 'What is it?', a: 'A location-based social app for discovering people, events, and things happening nearby.' },
    { q: 'Who is it for?', a: 'Anyone who wants to meet people and find things to do close to home, without the usual planning overhead.' },
    { q: 'Why does it exist?', a: 'Most social apps organize around followers and feeds. GoSocial organizes around place — proximity is a stronger basis for real connection.' },
  ],
  feedCaption: 'Your surroundings become the feed.',
}

export const vision = '“To make every city feel like a neighbourhood where everyone knows what’s happening around them.”'
export const visionContext =
  'That line came out of research, not a brainstorm — it\'s close to a direct quote from three separate participants who, unprompted, described wanting their neighborhood to feel smaller. Everything below is the path from that observation to a shipped product decision.'

export const problemIntro = {
  label: '02 / The problem',
  headline: 'People are surrounded by opportunities to connect, yet rarely do.',
  paragraph:
    'Shared spaces should make connection easy — coworking spaces, events, entire cities full of people living minutes apart. Instead, most of that proximity goes to waste, especially for college students and young employees still building a social circle in a new place. People stay physically close and socially distant, passing dozens of potential friendships and conversations every single day.',
}

export const problems = [
  {
    title: 'Discovering what\'s happening nearby',
    body: 'Making spontaneous real-world connection feel discoverable and approachable.',
  },
  {
    title: 'Finding people with shared interests',
    body: 'Someone may want to play tennis, go cycling, attend an event, or meet new people — but not know who nearby wants the same thing.',
  },
  {
    title: 'Lack of context in traditional social feeds',
    body: 'Most feeds are organized around who you follow, rather than what\'s happening around you right now.',
  },
]

export const myRole = {
  label: '04 / What I owned',
  headline: 'I owned this end to end — from the first interview to the final interface.',
  paragraph:
    'I was the only designer on GoSocial, so every decision below is mine. I led the research, shaped the product strategy, and designed the interaction details on every screen. No handoffs between roles, no diffusion of ownership — if it\'s in this case study, I made the call.',
  disciplines: [
    { label: 'Research & synthesis' },
    { label: 'Product strategy' },
    { label: 'Information architecture' },
    { label: 'User flows' },
    { label: 'Wireframes → high-fidelity UI' },
    { label: 'Interaction & motion design' },
    { label: 'AR interaction design', highlight: true },
    { label: 'Visual direction' },
    { label: 'Prototyping' },
  ],
}

export const decisionsIntro = {
  label: '07 / Key design decisions',
  headline: 'The important decisions I made.',
  paragraph:
    'Four questions shaped GoSocial more than any single feature did. Each one started as a real tension from research, and the screens below are the answer.',
}

export const decisions = [
  {
    n: '01',
    question: 'How do we make meeting strangers feel safe?',
    problem:
      'In interviews, most women said they\'d only join or host an activity if they could control who saw it — often by gender specifically. Some activities are gender-based by nature, which made that control a necessity, not just a preference.',
    thinking: '',
    solution:
      'Creators choose exactly who can see a plan — including gender-based visibility — right when they create it. Attendees can use that same visibility to choose which events to join.',
    ui: [
      { mock: 'visibility' as const },
    ],
  },
  {
    n: '02',
    question: 'How do we make physical spaces feel alive?',
    problem:
      'Coworking spaces, events, entire cities — full of people, and none of it shows up anywhere. The space itself gives no sign of who\'s around or what\'s happening.',
    thinking: '',
    solution:
      'AR-anchored presence turns a coworking space or event into something you can actually see and interact with — a layer on the place itself, not a separate screen.',
    ui: [
      {
        src: '/case-studies/go-social/screen-ar-consoleya.jpg',
        alt: 'AR view of Consoleya, a Downtown coworking space, with anchored questions about a yoga session',
        width: 640,
        height: 1622,
      },
      {
        src: '/case-studies/go-social/screen-ar-qr-projector.jpg',
        alt: 'AR camera view of an event, with a shareable GoSocial QR code projected on screen',
        width: 640,
        height: 1387,
      },
    ],
  },
  {
    n: '03',
    question: 'How do we make a stranger feel less like a stranger?',
    problem:
      'Trust came up as the real blocker in research, more than a lack of things to do — people could usually find an event, what they lacked was a reason to feel safe showing up to it.',
    thinking: '',
    solution:
      'If you and someone else share a mutual friend, that shows up automatically on their profile — a small, automatic label rather than something either person has to dig for.',
    ui: [
      {
        src: '/case-studies/go-social/screen-add-participants.jpg',
        alt: 'Add participants modal with suggested friends',
        width: 640,
        height: 1383,
      },
    ],
  },
  {
    n: '04',
    question: 'How do we make sharing a passing thought feel effortless?',
    problem:
      'Not everything worth sharing is a full event. Sometimes it\'s just a question or a passing thought, and most apps make you choose between a heavyweight post or nothing at all.',
    thinking: '',
    solution:
      '"Ask the world" lets someone drop a quick question or thought that\'s visible to people nearby, with replies that thread directly to it instead of disappearing into a general feed.',
    ui: [
      {
        src: '/case-studies/go-social/screen-ask-the-world.jpg',
        alt: 'Ask the world composer for sharing a quick thought or question with people nearby',
        width: 640,
        height: 1387,
      },
      {
        src: '/case-studies/go-social/screen-ar-reply-chat.jpg',
        alt: 'Replying to a nearby thought through AR, keyboard open',
        width: 640,
        height: 1607,
      },
    ],
  },
]

export const research = {
  method: '3 in-depth conversations with people who\'d recently moved to a new area, plus informal chats with about 10 friends and classmates',
  participants: 'Ages 18–29 · a mix of close contacts and friends-of-friends, mostly in New Cairo and Zamalek',
  clusters: [
    { label: 'Discovery is scattered', detail: '3/3 interviews' },
    { label: 'Trust is the real blocker', detail: '2/3 interviews' },
    { label: 'Planning kills spontaneity', detail: '2/3 interviews' },
    { label: 'Solo attendance is desired, rarely acted on', detail: '2/3 interviews' },
  ],
  personaNote:
    'Hana is a composite built from the 3 people I interviewed in depth, all with near-identical patterns (new to the area, wants low-stakes ways to meet people, distrusts generic "nearby" features) — not a single real interviewee.',
}

export const persona = {
  name: 'Hana',
  age: 18,
  role: 'college student · composite of 3 interviews',
  summary: 'An enthusiastic first-year psychology student who recently moved to a university far from her hometown.',
  goals: ['Make new friends', 'Join local activities'],
  frustrations: ['Pressure to make friends quickly', 'Overcoming shyness with strangers'],
  body: 'Hana, a motivated first-year college student pursuing psychology, faces the challenge of building meaningful friendships and a support network in a new and unfamiliar environment.',
  insights: [
    'Users struggle to discover activities near them',
    'Existing platforms feel disconnected from place',
    'People want spontaneity without planning overhead',
    'Trust is built through shared physical context',
  ],
}

export const structure = {
  columns: [
    { label: 'Discover', tone: 'sage', items: ['Map view', 'Category filters', 'AR mode in specific areas', 'Nearby people'], principle: 'Proximity, not popularity' },
    { label: 'Create', tone: 'accent', items: ['Create a Buzz', 'Ask the world', 'Sell items', 'Schedule events'], principle: 'Near-zero friction' },
    { label: 'Connect', tone: 'ink', items: ['Join activities', 'Reply to thoughts', 'Buy products', 'See what’s nearby'], principle: 'Trust before commitment' },
  ],
}

export const coreLoop = {
  headline: ['From “', "what's happening around me?", '” to “', "let's do this again.", '”'],
  steps: ['Discover', 'Join', 'Create', 'Ask', 'Connect'],
  tags: ['Explore more', 'Stories', 'AR', 'Local marketplace'],
  rationale: 'Every loop step ends by re-opening Discover — a joined event surfaces the people in it, who each have their own nearby activity, compounding density instead of just logging a single interaction.',
}

// ── Feature deep-dives ──────────────────────────────────────────────

export const createFeature = {
  label: 'Feature 02 · Create',
  title: 'If it doesn’t exist, start it.',
  problem: 'Typical "create event" flows average 6+ discrete fields before publish — too much overhead for a spontaneous plan.',
  goal: 'Cut creation to near-zero friction while still capturing enough structure to be discoverable and trustworthy.',
  constraints: [
    'Needs to fit sports, social, and marketplace activities without a form explosion',
    'Visibility control has to feel core, not like an extra step',
    'Needs spam/rate-limit protection without adding friction for real users',
  ],
  alternatives: [
    { name: 'Multi-field form', verdict: 'Rejected', note: 'Felt like too many steps before you could actually publish something.' },
    { name: 'Voice-only quick create', verdict: 'Rejected', note: 'Too unpredictable for structured data like time and location.' },
    { name: 'Sentence builder', verdict: 'Chosen', note: 'Same structured data as a form, phrased as one sentence instead of six fields.' },
  ],
  why: 'The sentence builder hides a form inside natural language — "I\'m [activity] in [place] at [time]" — cutting time-to-publish while keeping the underlying data structured and searchable.',
  body: 'GoSocial turns spontaneous plans into opportunities to connect. Users define what they want to do, choose where and when it happens, control who can discover it, and invite others to join.',
  sentence: { verb: "I'm", activity: 'Playing Tennis', place: 'Shooting Club', time: '4:00 PM' },
  steps: ['Choose intent', 'Add activity', 'Location & time', 'Audience', 'Invite', 'Publish'],
  annotations: [
    { n: 1, text: 'Category chip sets audience expectations before anything else is typed.' },
    { n: 2, text: 'Sentence pills keep the data machine-readable while reading as conversational.' },
    { n: 3, text: '"Manage who views this" sits above the fold — visibility is a first-class decision, not a settings toggle.' },
    { n: 4, text: 'A participant cap stops a 2-person hangout from being surfaced to 40 strangers.' },
  ],
  edgeCases: [
    { title: 'Spam / duplicate Buzz', body: 'Rate-limited creation; near-duplicate time+place+activity gets flagged for review.' },
    { title: 'No location permission', body: 'Manual pin-drop fallback instead of blocking creation.' },
    { title: '"Everyone" + first-time creator', body: 'A soft nudge suggests narrowing visibility before first publish.' },
  ],
  hypothesis: 'Reducing creation from 6 fields to 1 sentence increases completed Buzz publishes.',
  metric: 'Create-start → Publish completion rate',
}

export const outcome = {
  label: '08 / The outcome',
  headline: 'What a shared space turning into a real connection actually looks like.',
  paragraph: 'Two complete journeys through the finished product, start to finish — the product coming together, not isolated screens.',
  journeys: [
    {
      title: 'Finding your people',
      steps: ['Discover nearby', 'Join an activity', 'Meet people', 'Interact', 'Build a connection'],
      moments: [
        {
          caption: 'Discover nearby',
          ui: [
            {
              src: '/case-studies/go-social/screen-map-dokki.jpg',
              alt: 'GoSocial map view of Dokki, filtered to Friendships, with activity pins scattered around',
              width: 640,
              height: 1387,
            },
          ],
        },
        {
          caption: 'Discover & join',
          ui: [
            {
              src: '/case-studies/go-social/screen-map-madinty.jpg',
              alt: 'Map view of Madinty with a joinable sports club event card',
              width: 640,
              height: 1387,
            },
          ],
        },
        {
          caption: 'Interact',
          layout: 'narrative' as const,
          ui: [
            {
              src: '/case-studies/go-social/screen-ar-layer.png',
              alt: 'AR interaction layer overlaid on a physical space',
              width: 1179,
              height: 2556,
            },
            {
              src: '/case-studies/go-social/screen-reply-question-a.png',
              alt: 'Replying to a question anchored to the space, first step',
              width: 786,
              height: 1704,
            },
            {
              src: '/case-studies/go-social/screen-reply-question-b.png',
              alt: 'Replying to a question anchored to the space, reply sent',
              width: 1179,
              height: 2556,
            },
          ],
        },
      ],
    },
  ],
}

export const metrics = {
  northStar: {
    title: 'Weekly Connections Made',
    body: 'A Buzz joined, a reply sent, or an AR interaction had.',
  },
}

export const retrospective = {
  lessons: [
    'Simplify "Buzz" and "Ask the World" into one universal Create action, where the user taps and selects the type of action they want to start — usability testing showed these read as duplicates.',
    'Consider privacy more deeply in the AR features earlier — the visibility toggle should have been core to the first AR prototype, not added after testing exposed it.',
  ],
  mvpScoping: 'If shipping today, I\'d cut AR entirely from v1. It was the highest-risk, least-validated feature at the two-week mark, and Discover + Create alone already answered the core research problem.',
  thinkingShift: 'I started designing this as a dating-adjacent app. Research redirected it toward proximity and shared interest (sports, study, events) as a safer, more inclusive wedge than romantic framing — that pivot happened around week 3, after the "nearby = unsafe" pattern showed up in most of the conversations I had.',
}
