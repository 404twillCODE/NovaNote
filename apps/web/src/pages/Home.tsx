import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  SectionHeader,
  ScreenshotFrame,
  GlassCard,
  HoverLift,
  FadeIn,
} from '@novanote/ui';

function HeroMock() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-4 rounded-nova-xl opacity-60"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(46, 242, 162, 0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative rounded-nova-lg border border-border/80 bg-panel/50 backdrop-blur-[var(--nova-blur-panelBlur)] shadow-nova-lg overflow-hidden">
        <div className="flex h-[280px] sm:h-[320px]">
          <div className="w-14 sm:w-16 flex-shrink-0 border-r border-border/80 bg-elevated/60 flex flex-col items-center py-3 gap-2">
            <div className="w-6 h-6 rounded-nova-sm bg-elevated border border-border/80" />
            <div className="w-6 h-6 rounded-nova-sm bg-accent/20 border border-accent/40" />
            <div className="w-6 h-6 rounded-nova-sm bg-elevated border border-border/80" />
          </div>
          <div className="w-44 sm:w-52 flex-shrink-0 border-r border-border/80 bg-bg/80 p-3">
            <div className="h-3 w-3/4 rounded bg-muted/30 mb-3" />
            <div className="h-2 w-full rounded bg-muted/20 mb-2" />
            <div className="h-2 w-5/6 rounded bg-muted/20 mb-2" />
            <div className="h-2 w-full rounded bg-muted/20" />
          </div>
          <div className="flex-1 min-w-0 p-4 flex flex-col">
            <div className="h-4 w-1/3 rounded bg-muted/30 mb-4" />
            <div className="flex-1 rounded border border-border/60 bg-bg/50 p-3">
              <div className="h-2 w-full rounded bg-muted/15 mb-2" />
              <div className="h-2 w-full rounded bg-muted/15 mb-2" />
              <div className="h-2 w-4/5 rounded bg-muted/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TRUST_PILLS = ['Open Source', 'Local-first', 'Cross-platform', 'Themeable'];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-4 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <h1 className="text-[38px] leading-[1.1] sm:text-[56px] lg:text-[64px] font-semibold text-text tracking-tight mb-4">
              Notes that feel right.
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-xl mb-2">
              Premium note-taking with plugins, local AI, and a beautiful Apple-dark design. Minimal. Powerful.
            </p>
            <p className="text-sm text-muted/90 mb-8">
              Local-first · Plugins · Optional Local AI
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/download">
                <Button>Download</Button>
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary">View on GitHub</Button>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <HeroMock />
          </FadeIn>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-3 mt-16 md:mt-20">
          {TRUST_PILLS.map((label) => (
            <span
              key={label}
              className="px-4 py-2 rounded-full text-xs font-medium text-muted border border-border/80 bg-elevated/50 backdrop-blur-[var(--nova-blur-panelBlur)]"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Feature sections */}
      <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <SectionHeader
            eyebrow="Workspace"
            title="Recents & workspaces"
            description="Pick up where you left off. Your notes, always at hand."
          />
          <ul className="space-y-2 text-muted text-base mb-6">
            <li>· Recent notes at a glance</li>
            <li>· Multiple workspaces (folders)</li>
            <li>· Fast search and open</li>
          </ul>
          <ScreenshotFrame
            label="Recents + list"
            aspect="aspect-[4/3]"
            className="max-w-sm"
          />
        </div>
        <div className="order-first md:order-none">
          <div className="rounded-nova-lg border border-border/80 bg-panel/40 p-4 max-w-xs">
            <div className="flex gap-2 mb-3">
              <div className="h-6 w-16 rounded bg-muted/30" />
              <div className="h-6 w-20 rounded bg-accent/20" />
            </div>
            <div className="h-24 rounded bg-elevated/80 border border-border/60 flex items-center justify-center text-muted text-xs">
              Mini mock
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="order-first md:order-none">
          <div className="rounded-nova-lg border border-border/80 bg-panel/40 p-4 max-w-xs">
            <div className="text-xs text-muted mb-2">Theme switch</div>
            <div className="h-20 rounded bg-elevated/80 border border-border/60 flex items-center justify-center text-muted text-xs">
              Nova Default
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="Design"
            title="Themes"
            description="Nova Default and more. Apple-dark, nova glow."
          />
          <ul className="space-y-2 text-muted text-base mb-6">
            <li>· Built-in Nova Default theme</li>
            <li>· Install community themes</li>
            <li>· Consistent tokens across app and web</li>
          </ul>
          <ScreenshotFrame
            label="Theme preview"
            aspect="aspect-[4/3]"
            className="max-w-sm"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <SectionHeader
            eyebrow="Extend"
            title="Plugins"
            description="Extend with panels and commands. Safe by default."
          />
          <ul className="space-y-2 text-muted text-base mb-6">
            <li>· Permission-based safety model</li>
            <li>· Panels, commands, and UI hooks</li>
            <li>· Install from registry or dev folder</li>
          </ul>
          <ScreenshotFrame
            label="Permissions preview"
            aspect="aspect-[4/3]"
            className="max-w-sm"
          />
        </div>
        <div className="order-first md:order-none">
          <div className="rounded-nova-lg border border-border/80 bg-panel/40 p-4 max-w-xs">
            <div className="text-xs text-muted mb-2">Permissions</div>
            <div className="space-y-1.5 text-xs text-muted">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success/60" /> app:info</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success/60" /> ui:panel</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success/60" /> editor:read</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <GlassCard className="border-border/80 bg-panel/40 backdrop-blur-[var(--nova-blur-panelBlur)] text-center py-14 px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-text tracking-tight mb-3">
            Ready to write?
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Get the desktop app for Windows, macOS, or Linux.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/download">
              <Button>Download for Windows</Button>
            </Link>
            <Button variant="secondary">macOS</Button>
            <Button variant="secondary">Linux</Button>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
