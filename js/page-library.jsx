// Page: Library — Substack archive. Posts in two columns: featured + list.

const LIBRARY_POSTS = [
  {
    date: "4 May 2026",
    title: "Five Problems. Five Moves.",
    excerpt: "The five structural problems sitting inside ANZ media stacks right now, and the move each one calls for. Written for operators with the authority to act, not the patience for taxonomy.",
    href: "https://systemsthatdecide.substack.com/p/five-problems-five-moves",
    tag: "Strategy",
  },
  {
    date: "28 April 2026",
    title: "Retail media won the lower funnel. Now it has to prove it deserved to.",
    excerpt: "The lower-funnel narrative held for three years on the basis of post-purchase attribution and not much else. The next twelve months will reset what retail media is actually for, and which networks survive the reset.",
    href: "https://systemsthatdecide.substack.com/p/retail-media-won-the-lower-funnel",
    tag: "Retail Media",
  },
  {
    date: "20 April 2026",
    title: "You're measuring everything. You don't know what works.",
    excerpt: "The current measurement stack is a function of what is easy to instrument, not what is causal. The result is a confident dashboard and a market that does not know which dollar moved the outcome.",
    href: "https://systemsthatdecide.substack.com/p/youre-measuring-everything-you-dont",
    tag: "Measurement",
  },
  {
    date: "12 March 2026",
    title: "Retail media is becoming a payments business.",
    excerpt: "The most consequential shift in retail media has nothing to do with measurement. It is who owns the transaction. The retailers building genuine media networks are the ones that already control checkout.",
    href: "https://systemsthatdecide.substack.com/",
    tag: "Retail Media",
  },
  {
    date: "5 March 2026",
    title: "Why the agency contract is structurally unstable.",
    excerpt: "The agency contract describes a different service to what is delivered. This is structural. It is not accidental. The fee model and the production model have drifted apart for fifteen years and neither side will say so out loud.",
    href: "https://systemsthatdecide.substack.com/",
    tag: "Agency Model",
  },
  {
    date: "26 February 2026",
    title: "The bid request is the unit of power. Everything else is downstream.",
    excerpt: "If you do not control the bid request, you do not control the auction. If you do not control the auction, you do not control yield. Programmatic strategy is a conversation about who owns this object.",
    href: "https://systemsthatdecide.substack.com/",
    tag: "Programmatic",
  },
  {
    date: "12 February 2026",
    title: "The agentic media stack is a contracts problem first.",
    excerpt: "The technical questions get the headlines. The harder questions sit inside the master service agreement, the data processing addendum, and the carve-outs that nobody reads twice.",
    href: "https://systemsthatdecide.substack.com/",
    tag: "Strategy",
  },
];

const LibraryHero = () => (
  <PageHero
    eyebrow="The Library"
    title="The practitioner's view, published in long form."
    lead="Structural reads on the systems shaping advertising, retail media, commerce and platforms. Read by operators at the largest publishers, retailers and brands in the region."
  >
    <a href="https://systemsthatdecide.substack.com/" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
      <PrimaryBtn>Subscribe on Substack <MIcon name="arrow_forward" size={16} /></PrimaryBtn>
    </a>
  </PageHero>
);

const FeaturedEssay = ({ post }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={post.href} target="_blank" rel="noopener" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      cursor: "pointer", textDecoration: "none", display: "block",
      background: "var(--surface)", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)",
      padding: "clamp(32px, 4vw, 56px)", position: "relative", overflow: "hidden",
      boxShadow: hover ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      transition: "box-shadow 300ms ease",
    }}>
      <Watermark size="44vw" opacity={0.05} style={{ right: "-12vw", top: "-8vh" }} />
      <div style={{ position: "relative", maxWidth: 760 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-stat)", background: "var(--gold-tint-08)", border: "1px solid var(--gold-tint-30)", padding: "5px 10px" }}>Latest</span>
          <Label tone="muted">{post.date} · {post.tag}</Label>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(28px, 4vw, 44px)", color: hover ? "var(--gold-light)" : "var(--fg)", lineHeight: 1.15, margin: "0 0 20px", letterSpacing: 0, transition: "color 300ms ease", textWrap: "balance" }}>
          {post.title}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 28px" }}>
          {post.excerpt}
        </p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Read on Substack <MIcon name="arrow_forward" size={14} />
        </span>
      </div>
    </a>
  );
};

const LibraryList = ({ posts }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {posts.map((p, i) => (
      <a key={i} href={p.href} target="_blank" rel="noopener" style={{
        cursor: "pointer", textDecoration: "none",
        display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "baseline",
        padding: "32px 0", borderTop: i === 0 ? "1px solid var(--border)" : "none",
        borderBottom: "1px solid var(--border)", transition: "background 300ms ease",
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
          e.currentTarget.querySelector("h3").style.color = "var(--gold-light)";
          e.currentTarget.querySelector(".lib-arrow").style.transform = "translateX(4px)";
          e.currentTarget.querySelector(".lib-arrow").style.color = "var(--gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.querySelector("h3").style.color = "var(--fg)";
          e.currentTarget.querySelector(".lib-arrow").style.transform = "translateX(0)";
          e.currentTarget.querySelector(".lib-arrow").style.color = "var(--fg-subtle)";
        }}
      >
        <div style={{ minWidth: 140, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)", letterSpacing: "0.06em" }}>
          <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>{p.tag}</div>
          {p.date}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(20px, 2.4vw, 26px)", color: "var(--fg)", margin: "0 0 8px", lineHeight: 1.3, letterSpacing: 0, transition: "color 300ms ease" }}>{p.title}</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, margin: 0, maxWidth: 700 }}>{p.excerpt}</p>
        </div>
        <span className="lib-arrow" style={{ color: "var(--fg-subtle)", transition: "transform 300ms ease, color 300ms ease", fontFamily: "var(--font-mono)" }}>
          <MIcon name="arrow_forward" size={20} />
        </span>
      </a>
    ))}
    <style>{`
      @media (max-width: 720px) {
        a[href*="systemsthatdecide.substack"] { grid-template-columns: 1fr !important; gap: 12px !important; }
      }
    `}</style>
  </div>
);

const LibraryPage = ({ onEnquire }) => (
  <div data-screen-label="Library">
    <LibraryHero />
    <Section>
      <FadeUp>
        <FeaturedEssay post={LIBRARY_POSTS[0]} />
      </FadeUp>
    </Section>
    <Section alt>
      <Reveal axis="x" style={{ marginBottom: 16 }}>
        <Label>Archive</Label>
      </Reveal>
      <Reveal axis="x" delay={80}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: "var(--fg)", lineHeight: 1.15, margin: "0 0 32px", maxWidth: 760, letterSpacing: "-0.02em", textWrap: "balance" }}>
          Earlier essays.
        </h2>
      </Reveal>
      <FadeUp delay={120}>
        <LibraryList posts={LIBRARY_POSTS.slice(1)} />
      </FadeUp>
    </Section>
    <ScopingStrip onEnquire={onEnquire} headline="Reading the essays is one path. The other is a conversation." body="If something in the writing maps onto a decision sitting on your desk, a 30-minute scoping call is the starting point." />
  </div>
);

Object.assign(window, { LIBRARY_POSTS, LibraryPage });
