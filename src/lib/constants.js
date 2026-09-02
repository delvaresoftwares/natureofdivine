// ─────────────────────────────────────────────────────────────────────────────
//  SITE CONTENT — edit everything about the site from this single file.
//  Plain JavaScript on purpose, so you can change any word without touching code.
// ─────────────────────────────────────────────────────────────────────────────

// ── Site identity ───────────────────────────────────────────────────────────
export const SITE = {
  name: 'Nature of the Divine',
  domain: 'natureofthedivine.com',
  email: 'natureofthedivine@gmail.com',
  phone: '8606281125',
  author: 'Alfas B',
  tagline: 'A spiritual philosophy book that explores the nature of God, the soul journey, the role of religion, and how to align with the divine through meditation and mindful living.',
};

// ── The book ────────────────────────────────────────────────────────────────
export const BOOK = {
  id: 'nature-of-the-divine',
  title: 'Nature of the Divine',
  author: 'Alfas B',
  price: 199,
  currency: 'INR',
  coverImage: 'https://res.cloudinary.com/dj2w2phri/image/upload/v1751279827/1_3_qzfmjp.png',
  description:
    'Nature of the Divine is a spiritual philosophy book by Alfas B that explores the nature of God, the soul journey, the role of religion as a guiding force, and how to align with the divine through meditation, knowledge, and mindful living.',
  category: 'Spiritual Philosophy',
};

// ── Synopsis ────────────────────────────────────────────────────────────────
export const synopsis = `
<p class="mb-4 py-2 px-4 border-l-2 border-primary/20 italic text-xl md:text-2xl font-garamond leading-relaxed">
  "The essence of existence is Intelligence."
</p>

<p class="mb-4">What if the cosmos, life, and the human mind all follow the same divine pattern — from a singularity to infinite complexity? What if the answers you seek about God, your soul, and the meaning of life are already within you, waiting beneath the noise of everyday thoughts? <i>Nature of the Divine</i> begins with these questions and follows them across cosmology, biology, philosophy, and the inner life.</p>

<p class="mb-4"><i class="font-garamond">Nature of the Divine</i> by Alfas B is a spiritual philosophy book that explores the nature of God, the journey of the soul, the role of religion as a guiding force, and how to align with the divine through meditation and mindful living. Written for the thinking seeker who wants to understand religious values and spiritual truth, the book walks through nine interconnected chapters — from the Big Bang to the soul's journey, from the mind as a vessel to the sacred role of society and religion.</p>

<p class="mb-4">The book does not dismiss religion. It explains why religion emerged as a divine companion for humanity — a guiding force that awakened civilisation and continues to point toward God. Through honest reflections on consciousness, the observer within, the habits of a divine life, and the fundamental force of love, Alfas B offers a grounded path to understanding the divine nature of existence.</p>

<p class="mb-4">Whether you are exploring meditation for the first time, seeking to understand the connection between science and spirituality, or wanting a deeper relationship with God that goes beyond belief into direct experience, this book meets you where you are. It is not abstract philosophy — it is a practical guide to living in the nature of the divine, one still morning, one clear thought, one divine action at a time.</p>

<p>If you have been searching for something real — a spiritual philosophy that honours both reason and faith, both the cosmos and the soul — this book is an invitation to begin. Turn the page, sit in stillness, and discover what has been waiting underneath your own thoughts all along.</p>
`;

// ── Author bio ───────────────────────────────────────────────────────────────
export const authorBio = `
<p class="mb-4"><strong>Alfas B</strong> is an engineer by training and a student of the inner life by calling. Over many years he studied the great spiritual traditions — from eastern meditation practices to the contemplative wisdom of the west — and kept asking one honest question: <em>why does spiritual wisdom so often feel far away from everyday living?</em></p>

<p class="mb-4">His answer is <i>Nature of the Divine</i>. The book explores the nature of God through cosmology and consciousness, explains how religion emerged as a divine guiding force for humanity, and offers a practical path of meditation and mindful living for anyone who wants to align with the divine. Alfas writes in a warm, grounded voice, speaking to the reader as a fellow traveller on the soul journey rather than a teacher standing above them.</p>

<p>His work is built on the belief that spiritual awakening is not reserved for monks and mystics — it belongs to everyone willing to look inward. Through <i class="font-garamond">Nature of the Divine</i>, he hopes to help you understand the divine nature of existence, deepen your relationship with God, and live with a little more peace, clarity, and purpose.</p>
`;

// ── Sample / full chapters ──────────────────────────────────────────────────
// Every chapter drives a dedicated /chapters/[id] page for SEO.
export const allChapters = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'God',
    slug: 'god',
    tagline: 'From the infinite intelligence of God, manifested the cosmos — everything divine in nature.',
    content: `Chapter one opens with the foundational truth of the book: from the infinite intelligence of God, the cosmos manifested from the void. It explores how the same divine intelligence that created the universe also created life and the human mind — and what that means for our relationship with God.`,
    body: `
## In the beginning

The book begins where all creation begins — with God. From the infinite void where nothing exists, the Big Bang manifested as the first act of God: a singularity containing all energy, which unfolded into particles, galaxies, stars, and eventually life on Earth.

> "In the beginning there was nothing, except him and his infinite intelligence. Then there was everything."

## Three acts of creation

God's creation unfolds in three divine acts: the cosmos, biological life, and the human mind. Each follows the same sacred pattern — from a singularity to infinite complexity. The human mind, the book argues, is the most complex creation in the known world — God's own child.

## God is everywhere

The concept of God is not a myth but a living reality that reflects through an awakened and undistracted mind. God is everywhere — outside and inside your mind. Our subconscious is described as a reincarnation of God, which gave birth to us, the self.

> "Always remember that God is everywhere outside and inside your mind."

## Free will and alignment

God gave humans free will and placed them at the top of intelligence for a divine purpose. A mind that aligns with the nature of the divine witnesses the divinity God has hidden in everything. Everything exists with the divine blessing of God.
`,
    locked: false,
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'Man',
    slug: 'man',
    tagline: 'The mind is a temple. Clear it from all kinds of thoughts, everyday.',
    content: `Chapter two is the heart of the book. It explains that man is not one entity but a society of soul, body, and mind — and that the only challenge in this lifetime is to preserve the vessel of the mind without chaos. Through meditation, stillness, and the habit of clearing thoughts, one aligns with the nature of the divine.`,
    body: `
## God made man in his image

From the infinite intelligence of God, humans manifested from a biological singularity. The divine pattern of creation — from singularity to identity — exists in everything, including the human mind. The soul made a body, and in it manifested an empty vessel: our mind.

> "The mind is a temple. Clear it from all kinds of thoughts, everyday."

## A society of soul, body, and mind

Man is not one entity, but a society of soul, body, and mind. His identity is determined by the thoughts he fills in the vessel of his mind. The only challenge is to preserve the vessel without chaos — to empty it so the divine spirit of God can shine through.

## Human consciousness as illusion

Human consciousness is described as an illusion crafted by God, the greatest illusionist. To a human, the world feels real and God seems an illusion. But to God, everything He created is an illusion, and He alone is the only true reality. Yet within these illusions, we find meaning, purpose, and joy.

## The habit of stillness

The chapter introduces the sacred daily practice: rise before the sun, meditate in stillness, remove thoughts layer by breath layer, and submit to the soul. As the vessel becomes still and empty, God shines His divine spirit in us and through us.

> "As the vessel that is our mind is still and empty, God will shine his divine spirit in us, through us."

## Living in the nature of the divine

Each day becomes better than yesterday. The night brings deeper sleep, the morning shines brighter, meditations become more focused, and even the loneliest moments become joyful. This is the nature of the divine life.
`,
    locked: false,
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'Actions',
    slug: 'actions',
    tagline: 'Everything beyond cosmos is beyond causality. Everything in the cosmos is causality.',
    content: `Chapter three explores how actions determine reality. The actions of the soul — from the Big Bang to the birth of consciousness — are divine. When the mind is aligned with the soul, every action becomes divine. A relaxed mind that serves God manifests divine actions for a better future.`,
    body: `
## The divine origin of action

Everything in the cosmos began with divine actions — God's actions in the infinite intelligence that manifested the cosmos, life, and the human soul. The same pattern of creation from singularity to identity reflects in every action we take.

> "Every action the soul makes from the Big Bang to the manifestation of a mind made of thoughts are indeed divine."

## Soul actions versus thought actions

The mind perceives and interacts for the will of the self. The self that is dual in nature is of good and bad. A mind close to God always remembers and will be on the good side. A mind that serves God shines brighter by spreading divinity.

## Actions determine the next state

Every perception and action shapes reality for the future, similar to how actions determine the next state of matter in the cosmos. From a single action — keeping the mind in a meditated and focused state — one achieves mastery.

## The mastery of divine action

By relaxing the mind, silencing thoughts, and becoming aware of the void within, one invites a single thought to arise naturally — the thought of God. From this stillness, guidance flows, answers emerge, and with them the power to manifest abundance.

> "A mind in void always aligns with the nature of the divine. A mind that is aligned with the nature of the divine becomes divine. A divine mind manifests divine actions."
`,
    locked: true,
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'Journey',
    slug: 'journey',
    tagline: 'From the infinite intelligence of God, manifested the soul assigned on a journey destined by God.',
    content: `Chapter four traces the soul's epic journey — from the cosmos to biological life, through reincarnation across time. The soul is eternal, unlike the body and mind, and transcends into the future. Our journey as a self ends with death, while the soul continues.`,
    body: `
## The divine journey

The divine journey that started before the Big Bang continues through us into the future as something greater than our own existence — as our Soul. Everything in the cosmos moves from order to disorder, exactly as in a simulation that even God won't disrupt.

> "The soul that is eternal, unlike the body and mind, transcends into the future over evolution."

## The soul's evolution

Every creation contains a soul that finds its way to transcend into the future to be reborn again. The soul evolves from a singularity to an identity, later known as an individual human being, sharing the exact patterns of the birth of a cosmos.

## One soul, many lives

The same spirit lives in everyone — One at the beginning, One till now, and One in the future. Though each person seems unique, the soul within is the same: a piece of the divine living in us all.

> "It is unknown whether the soul is the same as God or just another creation of God. Either way, the soul is the greatest divine being to man."

## The self's role

Our journey as a self ends with death, while the soul transcends to the future in a new body. The self is born as a companion for the soul — to preserve it, to guide it, and to let it shine through a clear mind.
`,
    locked: true,
  },
  {
    id: 'chapter-5',
    number: 5,
    title: 'Knowledge',
    slug: 'knowledge',
    tagline: 'All knowledge in all books are from simple laws of the divine.',
    content: `Chapter five explores how all knowledge — in every book, every science, every art — originates from the simple divine laws of the universe. Knowledge transcends over time through the soul's journey, and a mind aligned with the divine learns everything it needs from nature itself.`,
    body: `
## Knowledge as divine reflection

From the infinite intelligence of God, knowledge manifested as a reflection of the outside world in our mind. The sense of consciousness gives us the ability to perceive information and spread wisdom that helps us transcend knowledge over time.

> "All knowledge in all books are from simple laws of the divine."

## Knowledge transcends through the soul

The soul only transcends what is necessary to the offspring. What defines a self and the world outside will be lost in time, but the knowledge shared about God, the soul, society, planets, and the cosmos will remain.

## The mind as a vessel of knowledge

One of the main functions of the mind is to contain knowledge, which when fed with repetitive training, helps in more advanced perceptions and actions. A mind with God upfront is more powerful than one that isn't.

## Nature as the greatest teacher

One who knows the sacred patterns of existence holds the ability to obtain the rest of knowledge without any books, if the mind is relaxed and aware. By aligning with the nature of the divine, one learns all knowledge from everything and everywhere.

> "Nature is the greatest teacher of all and holds everything the mind needs to know."
`,
    locked: true,
  },
  {
    id: 'chapter-6',
    number: 6,
    title: 'Society',
    slug: 'society',
    tagline: 'Nothing God made stands on its own. In Divine Unity, all is known.',
    content: `Chapter six reveals society as a sacred structure — not just a practical arrangement but a divine force that guides humanity. From villages to thoughts to microbes, everything supports each other. A society close to God evolves at its best and for good.`,
    body: `
## Society as a divine structure

From the infinite intelligence of God, society manifested as an invisible force that guides humanity together into the future. More than a system to control, society is a divine structure made by the soul as part of the divine journey.

> "Nothing God made stands on its own. In Divine Unity, all is known."

## The interconnection of all things

From atoms forming matter to people shaping communities to stars forming galaxies — no existence stands alone. True strength lies in unity, where every part contributes to the harmony of the whole.

## Leading and being led

Both the ones that govern and those being governed should learn all wisdom from their own souls by clearing their minds from thoughts, practising meditation, and observing the nature of the divine.

## A society of God

There will be heaven and no hell for a society of God. For that, God is real and powerful — and will always protect those who seek the divine presence that lies in the absence of thoughts with purity and relaxation.
`,
    locked: true,
  },
  {
    id: 'chapter-7',
    number: 7,
    title: 'Religion',
    slug: 'religion',
    tagline: 'Man\'s reach for the Divine — a mirror of truth, shaped by time.',
    content: `Chapter seven explains religion as a divine guiding force — not a cage of dogma but a companion that awakens humanity. It traces how religion emerged to free enslaved minds, how scriptures carry divine truth, and how an undistracted mind can understand any religion in its purest form.`,
    body: `
## Religion as a guiding force

From the infinite intelligence of God, religion manifested as a guiding force — awakening humanity with their higher self and aligning them with the nature of the divine. This connection gave rise to a harmonious social structure rooted in peace, order, and inner truth.

> "Religion as a guiding force — awakening humanity with the divine wisdom."

## The purpose of religion

Religion is not merely belief; it is the divine companion of the soul and self, manifested to walk alongside us on the sacred journey, ensuring that the forces of corruption — the devil who seeks to blind and devour — are cast out and defeated.

## Freedom, not control

The seeds of religion are movements that appeared to free human minds enslaved by those who controlled in the name of God. Religion manifested for freeing man to rebuild a new form of society, offering peace and the presence of the Real God.

## All religions carry truth

An awakened and undistracted mind can and will understand any religion and scripture about God in its purest form. The ability to understand religion resides in mastering the skill of controlling one's own mind from random thoughts through relaxation and awareness.

> "All holy religions are true and the truth lies in proper understanding of its message."
`,
    locked: true,
  },
  {
    id: 'chapter-8',
    number: 8,
    title: 'Love',
    slug: 'love',
    tagline: 'Love is Divine, Love must be Divine.',
    content: `Chapter eight reveals love as the fundamental force of nature — the interconnection between two entities where they coexist. When processed by thoughts, love becomes chained to emotions. But love in the absence of thoughts shines the divine essence of God and becomes divine.`,
    body: `
## Love as the fundamental force

From the infinite intelligence of God, everything manifested into existence in its divine form. Love is the fundamental force of nature that acts as an interconnection between two entities where they coexist.

> "Love is the fundamental force of nature."

## Divine love versus emotional love

Love is not naturally made of thoughts but is divine. When processed by thoughts, love becomes chained to emotions. But love in the absence of validation by thoughts shines the divine essence of God and becomes divine.

## Two souls aligned

Two souls connect by nature and realise the connection they already share, only when they are aligned with the nature of the divine. The cue for them to be in love is the recognition of divinity in the other.

> "A mind close to God, evolves at its best and for good. A love close to God, evolves at its best and for good."

## Love as a creation of God

Like any other creation, love evolves from a connection between two souls nurturing into its identity. The mind needs to be with God all the time for love to evolve as commanded by nature.
`,
    locked: true,
  },
  {
    id: 'chapter-9',
    number: 9,
    title: 'Farewell',
    slug: 'farewell',
    tagline: 'After the journey, we fade into the void — where we never lived, nor remembered.',
    content: `The final chapter addresses death not as an end but as an awakening from a dream. The self is an illusion that ceases to exist, while the soul — eternal and divine — returns to the singularity of pure energy. All we are turns into dust and light.`,
    body: `
## The self as a dream

The self is an illusion of the soul, body, and mind — a construction of thoughts. Before the self existed, the soul and body journeyed a long way without us, yet for us. The self is the dream of the soul, the mind, the family, the society, the humanity, and above all, the dream of God.

> "The self is illusionary and does not exist during the birth of our soul but exists as a construction of thoughts."

## Death as awakening

Death is inevitable. One must say goodbye to every creation. A man who knows his soul always remembers that death is not a farewell but an awakening from a dream. The self will not know the end of the soul, just as it doesn't know their beginning.

> "A man who knows his soul always remembers that death isn't a farewell but an awakening from a dream."

## Dust and light

All we are will turn into dust and light. The body returns to cosmic dust. The soul joins its home in the singularity of pure energy — without the self, the body, or consciousness. Nothing sacred is lost.

## The "I" beyond the self

There is an "I" beyond the self — not the identity made of thoughts, but the silent presence within. We are the thoughts we possess, yes — but we are also the light that shines through the soul when thought falls away. That light is still us.

> "When the mind is silent, the Divine speaks. And in that silence, our soul whispers who we truly are."
`,
    locked: true,
  },
];

// Keep `sampleChapters` for backwards compatibility on the homepage (first two chapters).
export const sampleChapters = allChapters.filter((c) => c.locked === false).map(({ body, ...rest }) => rest);

// ── Buy links ────────────────────────────────────────────────────────────────
export const buyLinks = [
  { name: 'Amazon', url: 'https://amzn.in/d/iPmewQL', visible: true },
  {
    name: 'Flipkart',
    url: 'https://www.flipkart.com/nature-divine-align/p/itm2433ecc20ab88?pid=9789334306514',
    visible: true,
  },
];

// ── Home / landing page ─────────────────────────────────────────────────────
export const HOME = {
  hero: {
    badge: 'A spiritual philosophy book for the thinking seeker',
    headlineTop: 'Nature of',
    headlineHighlight: 'the Divine',
    paragraph:
      'A spiritual philosophy book about God, the soul journey, the role of religion, and how to align with the divine through meditation and mindful living. Written by',
    byline: 'Alfas B',
    buyButton: 'Buy the Book',
    exploreButton: 'Explore the Wisdom',
    priceSuffix: 'Paperback · Free shipping, everywhere',
    features: [
      { icon: 'star', label: 'For the thinking seeker' },
      { icon: 'truck', label: 'Free shipping, worldwide' },
      { icon: 'shield', label: 'Paperback & Hardcover' },
    ],
  },
  quote:
    '"The essence of existence is Intelligence."',
  synopsis: {
    label: 'A little about this book',
    heading: 'What it is really about',
  },
  chapters: {
    label: 'Have a look inside',
    heading: 'A journey through nine chapters',
    subtext:
      'From the Big Bang to the soul\'s journey, from the mind as a temple to the guiding force of religion — explore the full chapter pages for meditation, consciousness, and divine wisdom.',
  },
  author: {
    label: 'About the author',
    heading: 'Alfas B',
  },
  buy: {
    heading: 'Start with page one',
    subtext:
      "You don't have to read it all today. Just open the book and begin — the rest tends to unfold on its own.",
    buyNow: 'Buy Now',
    sample: 'Read a Sample',
    alsoOn: 'Also on',
  },
};

// ── FAQ section (SEO) ────────────────────────────────────────────────────────
export const HOME_FAQ = [
  {
    question: 'What is Nature of the Divine about?',
    answer:
      'Nature of the Divine is a spiritual philosophy book by Alfas B that explores the nature of God, the soul journey, the role of religion as a guiding force, and how to align with the divine through meditation and mindful living. It explains how the cosmos, life, and the human mind all follow the same divine pattern of creation — from a singularity to infinite complexity.',
  },
  {
    question: 'Is this a religious book?',
    answer:
      'Nature of the Divine is a spiritual philosophy book that engages deeply with religion. It explains religion as a divine guiding force that emerged to awaken humanity, guide civilisation, and point toward God. The book does not dismiss religion — it honours it as a sacred companion on the soul journey, while encouraging readers to understand religion in its purest form through a still and undistracted mind.',
  },
  {
    question: 'Who is Nature of the Divine written for?',
    answer:
      'It is written for anyone who wants to understand the divine nature of existence — whether you follow a religion, practise meditation, or are simply curious about God, the soul, and the meaning of life. It speaks to the thinking seeker who wants spiritual truth grounded in both reason and faith.',
  },
  {
    question: 'What will I learn from reading it?',
    answer:
      'You will learn how the cosmos, life, and the human mind follow the same divine pattern of creation from a singularity. You will understand the soul\'s eternal journey, the role of religion as a guiding force, how meditation aligns the mind with the divine, and how love is the fundamental force connecting all things. The book offers both philosophical understanding and practical guidance for daily life.',
  },
  {
    question: 'How does the book explain God?',
    answer:
      'The book describes God as the infinite intelligence from which the cosmos manifested. God is not a distant judge but a living presence that reflects through an awakened and undistracted mind, through nature, through every soul, and through every act of creation. The divine pattern of creation — from singularity to infinite complexity — is the signature of God visible in everything from the Big Bang to the human mind.',
  },
  {
    question: 'How can I buy Nature of the Divine?',
    answer:
      'You can order the paperback or hardcover directly from this website with free worldwide shipping, or buy it from Amazon and Flipkart. Your order from this site is guaranteed to arrive in perfect condition.',
  },
];

// ── Blog ─────────────────────────────────────────────────────────────────────
export const BLOG = {
  title: 'Reflections on the Divine',
  tagline:
    'Thoughts on God, the soul journey, the guiding force of religion, meditation, and the divine nature of existence — written by Alfas B for the thinking seeker.',
};

// Evergreen, SEO-focused blog posts (each drives a /blog/[slug] page).
export const blogPosts = [
  {
    slug: 'how-the-cosmos-life-and-mind-follow-the-same-divine-pattern',
    title: 'How the Cosmos, Life, and Mind Follow the Same Divine Pattern',
    excerpt:
      'From the Big Bang to biological life to the human mind — the same sacred pattern of creation repeats at every scale. Explore the divine pattern at the heart of Nature of the Divine.',
    coverImage:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop',
    category: 'Creation & Consciousness',
    date: '2026-06-10',
    readTime: '8 min read',
    keywords: ['divine pattern of creation', 'Big Bang consciousness', 'singularity to identity', 'cosmos life mind', 'Nature of the Divine'],
    body: `
## One pattern, three acts

At the heart of *Nature of the Divine* lies a bold claim: the same divine pattern of creation — from a singularity to infinite complexity — repeats at every scale. What happened in the cosmos happened in life, and happens again in the human mind.

> "From the infinite intelligence of God, manifested the cosmos from the infinite void where nothing exists."

## The three acts of God

The book describes three acts of creation:

1. **The cosmos** — from the Big Bang singularity, energy unfolded into particles, stars, galaxies.
2. **Biological life** — from a single cell, life evolved into millions of species.
3. **The human mind** — the most complex creation in the known world, God's own child.

Each follows the same sacred law: from a monad, from a point of infinite potential, unfolds magnificent complexity.

## Why this matters for you

If the same pattern that created the universe also created your mind, then your mind is not an accident. It is the cosmos, evolved to the point of self-awareness — the pattern of creation, looking back at itself in wonder.

*This reflection is drawn from themes in* Nature of the Divine *by Alfas B — a spiritual philosophy book on God, the soul journey, and the divine nature of existence.*
`,
  },
  {
    slug: 'religion-as-a-divine-guiding-force',
    title: 'Religion as a Divine Guiding Force: Reclaiming Its True Purpose',
    excerpt:
      'Nature of the Divine explains religion not as a cage of dogma but as a divine companion that awakens humanity. Learn how religion emerged to free minds and guide civilisation toward God.',
    coverImage:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    category: 'Religion & Spirituality',
    date: '2026-05-22',
    readTime: '7 min read',
    keywords: ['religion guiding force', 'divine companion', 'spiritual awakening', 'religion and God', 'Nature of the Divine'],
    body: `
## Not a cage, but a companion

Too often religion has been experienced as rules, guilt, or division. *Nature of the Divine* offers a radically different vision: religion as a divine companion — a guiding force that emerged to awaken humanity and point toward God.

> "Religion as a guiding force — awakening humanity with the divine wisdom."

## How religion emerged

The book explains that religion originated as movements to free human minds from those who controlled in the name of God. The intellectuals and awakened minds of ancient times started movements to liberate souls trapped by manipulation, offering peace and the presence of the Real God.

## All religions carry truth

An awakened and undistracted mind can understand any religion in its purest form. The ability to understand religion resides in mastering the skill of controlling one's own mind through meditation and awareness.

> "All holy religions are true and the truth lies in proper understanding of its message."

## The first step

The first step in understanding religion is preserving the mind in its clearest form through meditation. When the mind is still and aligned with the divine, the truth of every religion becomes clear.

*This reflection expands on themes in* Nature of the Divine *by Alfas B — a spiritual philosophy book exploring God, religion, and the soul journey.*
`,
  },
  {
    slug: 'the-mind-is-a-temple-clearing-the-inner-space',
    title: 'The Mind Is a Temple: Clearing the Inner Space',
    excerpt:
      '"The mind is a temple. Clear it from all kinds of thoughts, everyday." One of the most striking passages of Nature of the Divine — and a daily practice to match it.',
    coverImage:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop',
    category: 'Meditation & Mindfulness',
    date: '2026-04-15',
    readTime: '6 min read',
    keywords: ['mind is a temple', 'empty vessel', 'meditation practice', 'Nature of the Divine', 'clearing the mind'],
    body: `
## A sentence that stops you

Early in the *Man* chapter, Alfas B writes:

> **"The mind is a temple. Clear it from all kinds of thoughts, everyday. Always remember that an empty vessel contains the spirit of God while the one lost in his thoughts, won't."**

## Why the vessel matters

The mind is described as an empty vessel in which thoughts are poured, and from which our identity is built. Fill it with noise and nothing new can enter. Empty it, and it becomes available — open to the divine, open to clarity, open to today.

## A daily habit, not a grand gesture

- **Begin with silence** — three slow breaths before you reach for your phone.
- **Notice the thoughts** that fill the vessel — worries, comparisons, old stories — and let them settle.
- **Return gently** — each return to the stillness is a small clearing.

The book promises that as the vessel becomes still and empty, God will shine His divine spirit in us and through us.

*This reflection is drawn from* Nature of the Divine *by Alfas B — a spiritual philosophy book on God, the soul journey, and aligning with the divine.*
`,
  },
  {
    slug: 'what-does-it-mean-to-align-with-the-divine',
    title: 'What Does It Mean to Align with the Divine?',
    excerpt:
      'Aligning with the divine is not abstract philosophy — it is a practical daily rhythm of meditation, stillness, and living in harmony with nature. Explore the divine alignment path.',
    coverImage:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1200&auto=format&fit=crop',
    category: 'Divine Living',
    date: '2026-03-03',
    readTime: '7 min read',
    keywords: ['align with the divine', 'divine alignment', 'meditation practice', 'mindful living', 'Nature of the Divine'],
    body: `
## Alignment is a daily rhythm

To align with the divine is not a one-time event. It is a daily rhythm — a cycle that begins with a peaceful bedtime, continues through a restful sleep, and culminates in a sacred morning meditation before the sun rises.

> "A mind aligned with the nature of the divine becomes divine."

## The sacred cycle

1. **Sunset** — wind down, meditate, let the day's thoughts settle.
2. **Sleep** — rest deeply, so the soul can shine through.
3. **Morning** — rise before the sun, meditate in stillness.
4. **Day** — act from a clear, soul-aligned mind.

## What changes when you align

When your inner state is aligned, your outer life settles. Problems remain, but they no longer shake you. Learning becomes effortless, action flows smoothly, and the mind remains clear, focused, and strong.

> "A mind aligned with the divine receives every blessing with ease."

*This guide expands on themes in* Nature of the Divine *by Alfas B — a spiritual philosophy book about God, the soul journey, and mindful living.*
`,
  },
  {
    slug: 'love-is-the-fundamental-force-of-nature',
    title: 'Love Is the Fundamental Force of Nature',
    excerpt:
      '"Love is the fundamental force of nature that acts as an interconnection between two entities where they coexist." On love as the fabric of reality, from Nature of the Divine.',
    coverImage:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
    category: 'Love & Divine Connection',
    date: '2026-02-14',
    readTime: '6 min read',
    keywords: ['love fundamental force', 'divine love', 'two souls connected', 'Nature of the Divine', 'Alfas B'],
    body: `
## More than an emotion

We usually think of love as an emotion — a feeling that rises and falls. *Nature of the Divine* makes a far grander claim. Love is not merely a feeling; it is the very structure of existence:

> "Love is the fundamental force of nature that acts as an interconnection between two entities where they coexist."

## Divine love versus emotional love

When processed by thoughts, love becomes chained to emotions — needy, calculating, conditional. But love in the absence of validation by thoughts shines the divine essence of God and becomes divine.

## Two souls aligned

Two souls connect by nature and realise the connection they already share, only when they are aligned with the nature of the divine. The cue for them to be in love is the recognition of divinity in the other.

> "A mind close to God, evolves at its best and for good. A love close to God, evolves at its best and for good."

## To love as nature loves

Side with what is divine in love, and love becomes what it was always meant to be — the fundamental force connecting all things.

*This reflection is drawn from* Nature of the Divine *by Alfas B — a spiritual philosophy book on God, love, and the soul journey.*
`,
  },
];

// ── Header & navigation ─────────────────────────────────────────────────────
export const NAV = {
  brand: 'Nature of the Divine',
  links: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#synopsis' },
    { label: 'Chapters', href: '/chapters' },
    { label: 'Blog', href: '/blog' },
  ],
  trackBooking: 'Track Booking',
  buyNow: 'Buy Now',
};

// ── Mobile bottom navigation ────────────────────────────────────────────────
export const BOTTOM_NAV = {
  home: 'Home',
  about: 'About',
  chapter: 'Chapters',
  blog: 'Blog',
  track: 'Track',
  buyNow: 'Buy Now',
};

// ── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER = {
  brand: 'Nature of the Divine',
  tagline: 'A spiritual philosophy book exploring God, the soul journey, the guiding force of religion, and how to align with the divine through meditation and mindful living.',
  legalHeading: 'Legal & Support',
  connect: 'Connect',
  socials: [
    { platform: 'Twitter', href: '#' },
    { platform: 'Facebook', href: '#' },
    { platform: 'Instagram', href: '#' },
  ],
  contactLabel: 'Email',
  rightsNote:
    'All content on this website, including the text of the book, is the intellectual property of its author.',
  designedBy: 'Crafted with care.',
};

// ── SEO / metadata ──────────────────────────────────────────────────────────
export const META = {
  defaultTitle: 'Nature of the Divine | A Spiritual Philosophy Book by Alfas B',
  titleTemplate: '%s | Nature of the Divine',
  description:
    'Nature of the Divine is a spiritual philosophy book by Alfas B exploring God, the soul journey, the guiding force of religion, meditation, and how to align with the divine through mindful living.',
  keywords: [
    'Nature of the Divine',
    'Nature of the Divine book Alfas B',
    'spiritual philosophy book',
    'God and consciousness',
    'soul journey',
    'religion guiding force',
    'meditation for inner peace',
    'mindfulness meditation',
    'divine intelligence',
    'align with the divine',
    'divine pattern of creation',
    'cosmic consciousness',
    'spiritual awakening',
    'meditation practice',
    'self realization',
    'inner peace',
    'mindful living',
    'meaning of life',
    'science and spirituality',
    'love fundamental force',
  ],
  hashTags: '#NatureOfTheDivine #AlfasB',
  ogTitle: 'Nature of the Divine | A Spiritual Philosophy Book by Alfas B',
  ogDescription:
    'A spiritual philosophy book exploring God, the soul journey, the guiding force of religion, and how to align with the divine — written by Alfas B for the thinking seeker.',
  ogImage: '/logo.svg',
  siteName: 'Nature of the Divine',
  locale: 'en_US',
  twitterTitle: 'Nature of the Divine — by Alfas B',
  twitterDescription:
    'A spiritual philosophy book about God, the soul journey, the role of religion, and aligning with the divine through meditation and mindful living.',
  twitterImage: '/logo.svg',
};

// ── Structured data (JSON-LD) ───────────────────────────────────────────────
export const SCHEMA = {
  isbn: '978-9334306514',
  publisher: 'Notion Press',
  datePublished: '2025-06-01',
  description:
    'Nature of the Divine is a spiritual philosophy book by Alfas B exploring God, the soul journey, the guiding force of religion, and how to align with the divine through meditation and mindful living.',
  bookGenre: 'Religion & Spirituality',
  audience: 'Spiritual seekers, meditators, those seeking to understand God, religion, and the soul journey',
};

// ── Legal pages ─────────────────────────────────────────────────────────────
const contact = '<strong>' + SITE.name + '</strong><br />Email: ' + SITE.email + '<br />Phone: ' + SITE.phone;

export const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    body: `
<p>${contact}</p>
<p>At Nature of the Divine, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services, including when you purchase the book <em>"Nature of the Divine"</em> by Alfas B.</p>

<h2>1. Information We Collect</h2>
<p>To process orders and improve our spiritual book website, we may collect the following types of personal information:</p>
<ul>
  <li>Your name</li>
  <li>Email address</li>
  <li>Phone number</li>
  <li>Shipping and billing address</li>
  <li>Payment information (processed securely via third-party payment gateways such as PhonePe)</li>
  <li>Order history and booking IDs for tracking your purchase</li>
  <li>Any other information you provide voluntarily</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
  <li>Process your orders and payments securely</li>
  <li>Provide customer support and respond to inquiries</li>
  <li>Send order updates, shipping tracking, and, with your consent, occasional reflections</li>
  <li>Improve our website, products, and services</li>
  <li>Comply with legal requirements</li>
</ul>

<h2>3. Sharing of Information</h2>
<p>We do not sell, trade, or rent your personal information to others. Your information may be shared with:</p>
<ul>
  <li>Trusted third-party service providers (e.g., courier companies, payment processors) strictly for order fulfillment and related services</li>
  <li>Government or legal authorities, if required by law</li>
</ul>

<h2>4. Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, misuse, or disclosure.</p>

<h2>5. Cookies and Tracking</h2>
<p>Our website may use cookies and similar technologies to enhance user experience, analyze website traffic, and personalize content. You can manage cookie preferences through your browser settings.</p>

<h2>6. Third-Party Links</h2>
<p>Our website may contain links to third-party websites (such as Amazon and Flipkart). We are not responsible for the privacy practices or content of those sites.</p>

<h2>7. Your Rights</h2>
<p>You have the right to:</p>
<ul>
  <li>Access the personal information we hold about you</li>
  <li>Request correction or deletion of your information</li>
  <li>Opt out of receiving marketing communications at any time</li>
</ul>

<h2>8. Changes to This Policy</h2>
<p>We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the revised policy.</p>

<h2>9. Contact Us</h2>
<p>If you have any questions or concerns regarding this Privacy Policy or the handling of your information, please contact us at:<br />
Email: ${SITE.email}<br />
Phone: ${SITE.phone}</p>
`,
  },
  terms: {
    title: 'Terms and Conditions',
    body: `
<p>${contact}</p>
<p>Welcome to Nature of the Divine. By accessing or using our website or services — including ordering the spiritual book <em>"Nature of the Divine"</em> by Alfas B — you agree to be bound by the following Terms and Conditions. Please read them carefully.</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing this website and/or placing an order, you agree to be legally bound by these terms. If you do not agree with any of these terms, you should not use our website or services.</p>

<h2>2. Use of the Website</h2>
<p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others.</p>
<p>You must not misuse this website by introducing viruses, trojans, or other malicious material.</p>

<h2>3. Product and Service Information</h2>
<p>We strive to ensure all product descriptions, pricing, and availability are accurate. However, we do not guarantee the accuracy of all content and reserve the right to correct errors or update information at any time without prior notice.</p>
<p>Product colors may slightly vary due to screen settings.</p>

<h2>4. Orders and Payments</h2>
<p>All orders are subject to acceptance and availability.</p>
<p>Prices for products are subject to change without notice.</p>
<p>We reserve the right to refuse or cancel any order for any reason, including errors in pricing or stock availability.</p>
<p>Payments are processed securely and may include Cash on Delivery (COD) or prepaid options such as UPI, cards, and net banking.</p>

<h2>5. Shipping and Delivery</h2>
<p>Shipping timelines and delivery estimates are provided on a best-effort basis. Refer to our Shipping Policy for full details, including free worldwide shipping on eligible orders.</p>
<p>Delays caused by courier services or unforeseen events are beyond our control.</p>

<h2>6. Returns and Refunds</h2>
<p>Please refer to our Return and Refund Policy for detailed information. Any return request must comply with our stated return guidelines.</p>

<h2>7. Intellectual Property</h2>
<p>All content on this website (text, images, logos, etc.) is the property of the author and is protected under applicable intellectual property laws.</p>
<p>You may not reproduce, duplicate, copy, sell, or exploit any portion of the site without express written permission.</p>

<h2>8. Limitation of Liability</h2>
<p>We shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or products.</p>

<h2>9. Privacy</h2>
<p>Please refer to our Privacy Policy to understand how we collect, use, and protect your information.</p>

<h2>10. Changes to Terms</h2>
<p>We reserve the right to modify or replace these Terms at any time. Your continued use of the website following changes constitutes acceptance of those changes.</p>

<h2>11. Governing Law</h2>
<p>These terms and conditions shall be governed by and construed in accordance with the laws of India.</p>

<p class="mt-6"><em>Written and managed by ${SITE.author}.</em></p>
`,
  },
  shipping: {
    title: 'Shipping Policy',
    body: `
<p>${contact}</p>
<p>At Nature of the Divine, we are committed to delivering your copy of the spiritual book <em>"Nature of the Divine"</em> in a timely and secure manner. Please read our shipping policy for details on how and when your order will be delivered.</p>

<h2>Shipping Coverage</h2>
<p>We currently ship across India with free worldwide shipping also available on eligible orders. If your location is not serviceable, we will inform you promptly after order placement.</p>

<h2>Processing Time</h2>
<p>All orders are processed within 1–3 business days after receiving payment confirmation (or after order placement for Cash on Delivery).</p>
<p>Orders are not shipped or delivered on Sundays or public holidays.</p>

<h2>Shipping Time</h2>
<p>Standard delivery takes 5–7 business days from the date of dispatch, depending on your location.</p>
<p>Delays may occur due to unforeseen circumstances or courier issues. We appreciate your understanding and patience in such cases.</p>

<h2>Shipping Charges</h2>
<p>We offer <strong>free shipping</strong> on orders placed through this website. Shipping charges, if any, will be mentioned at checkout before you complete your purchase.</p>

<h2>Order Tracking</h2>
<p>Once your order is shipped, you will receive a tracking ID and courier details via email or SMS to monitor the delivery status. You can also track your booking at any time using your Booking ID.</p>

<h2>Incorrect Address or Delivery Issues</h2>
<p>Please ensure that the shipping address and contact details provided are accurate.</p>
<p>We are not responsible for orders delivered to incorrectly provided addresses or unclaimed deliveries.</p>

<h2>Damaged Packages</h2>
<p>If the package appears damaged or tampered with upon delivery, please do not accept it and contact us immediately.</p>

<h2>Contact Us</h2>
<p>For any questions or concerns about your order or shipping, please contact:<br/>
Email: ${SITE.email}<br/>
Phone: ${SITE.phone}</p>
`,
  },
  returns: {
    title: 'Return and Refund Policy',
    body: `
<p>${contact}</p>
<p>At Nature of the Divine, we strive to ensure that you are completely satisfied with your purchase of <em>"Nature of the Divine"</em> by Alfas B. Please read our return and refund policy carefully to understand your rights and our obligations.</p>

<h2>Returns</h2>
<p>If you are not satisfied with your purchase, you may request a return within 7 days of receiving the product.</p>
<p>To be eligible for a return, the item must be unused, in its original condition, and in the original packaging.</p>
<p>You must provide proof of purchase (such as order confirmation or invoice).</p>
<p>If you received any damaged or defective products, please inform us within 48 hours of receiving the product to raise a return request. Once we approve the return, you should send back the product to the address from which it came to process the refund.</p>

<h2>Refunds</h2>
<p>Once we receive and inspect the returned product, we will notify you about the approval or rejection of your refund.</p>
<p>If approved, your refund will be credited to your original method of payment within 7–10 business days.</p>
<p>Shipping charges are non-refundable unless the return is due to our error or a defective product.</p>

<h2>Cancellations</h2>
<p>Orders once placed can only be canceled within 12 hours or before dispatch, whichever is earlier.</p>

<h2>Contact Us</h2>
<p>For any queries related to returns or refunds, you may reach us at:<br/>
Email: ${SITE.email}<br/>
Phone: ${SITE.phone}</p>
`,
  },
};
