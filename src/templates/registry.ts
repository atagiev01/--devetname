import React, { lazy } from 'react';
import { TemplateRenderProps } from './types';
import { Template } from '../types';

// Each wedding guest only ever needs ONE of these templates at a time, so we
// load them lazily (per-template code-split chunks) instead of bundling all
// five designs into every visitor's initial download.
const ElegantGoldTemplate = lazy(() =>
  import('./ElegantGoldTemplate').then((m) => ({ default: m.ElegantGoldTemplate }))
);
const FloralWeddingTemplate = lazy(() =>
  import('./FloralWeddingTemplate').then((m) => ({ default: m.FloralWeddingTemplate }))
);
const LuxuryWeddingTemplate = lazy(() =>
  import('./LuxuryWeddingTemplate').then((m) => ({ default: m.LuxuryWeddingTemplate }))
);
const MinimalWeddingTemplate = lazy(() =>
  import('./MinimalWeddingTemplate').then((m) => ({ default: m.MinimalWeddingTemplate }))
);
const CustomCodeTemplate = lazy(() =>
  import('./CustomCodeTemplate').then((m) => ({ default: m.CustomCodeTemplate }))
);
const GoldenEnvelopeTemplate = lazy(() =>
  import('./GoldenEnvelopeTemplate').then((m) => ({ default: m.GoldenEnvelopeTemplate }))
);
const EmeraldSealEnvelopeTemplate = lazy(() =>
  import('./EmeraldSealEnvelopeTemplate').then((m) => ({ default: m.EmeraldSealEnvelopeTemplate }))
);
const RoseSealEnvelopeTemplate = lazy(() =>
  import('./RoseSealEnvelopeTemplate').then((m) => ({ default: m.RoseSealEnvelopeTemplate }))
);
const SapphireSealEnvelopeTemplate = lazy(() =>
  import('./SapphireSealEnvelopeTemplate').then((m) => ({ default: m.SapphireSealEnvelopeTemplate }))
);
const BurgundySealEnvelopeTemplate = lazy(() =>
  import('./BurgundySealEnvelopeTemplate').then((m) => ({ default: m.BurgundySealEnvelopeTemplate }))
);
const MinimalMonoTemplate = lazy(() =>
  import('./MinimalMonoTemplate').then((m) => ({ default: m.MinimalMonoTemplate }))
);
const MinimalSageTemplate = lazy(() =>
  import('./MinimalSageTemplate').then((m) => ({ default: m.MinimalSageTemplate }))
);
const MinimalEditorialTemplate = lazy(() =>
  import('./MinimalEditorialTemplate').then((m) => ({ default: m.MinimalEditorialTemplate }))
);
const EditorialPressCardTemplate = lazy(() =>
  import('./EditorialPressCardTemplate').then((m) => ({ default: m.EditorialPressCardTemplate }))
);
const BirthdayCardTemplate = lazy(() =>
  import('./EditorialPressCardTemplate').then((m) => ({ default: m.BirthdayCardTemplate }))
);
const EditorialPressTemplate = lazy(() =>
  import('./EditorialPressTemplate').then((m) => ({ default: m.EditorialPressTemplate }))
);

export interface TemplateDefinition {
  id: string;
  name: string;
  component: React.FC<TemplateRenderProps>;
  category: Template['category'];
  description: string;
  previewImage: string;
}

export const TEMPLATE_REGISTRY: Record<string, React.FC<TemplateRenderProps>> = {
  'elegant-gold': ElegantGoldTemplate,
  'floral': FloralWeddingTemplate,
  'floral-wedding': FloralWeddingTemplate,
  'luxury': LuxuryWeddingTemplate,
  'luxury-wedding': LuxuryWeddingTemplate,
  'minimal': MinimalWeddingTemplate,
  'minimal-wedding': MinimalWeddingTemplate,
  'custom-code': CustomCodeTemplate,
  'custom-video-envelope': CustomCodeTemplate,
  'custom-modern-gold': CustomCodeTemplate,
  'golden-seal': GoldenEnvelopeTemplate,
  'emerald-seal': EmeraldSealEnvelopeTemplate,
  'rose-seal': RoseSealEnvelopeTemplate,
  'sapphire-seal': SapphireSealEnvelopeTemplate,
  'burgundy-seal': BurgundySealEnvelopeTemplate,
  'minimal-mono': MinimalMonoTemplate,
  'minimal-sage': MinimalSageTemplate,
  'minimal-editorial': MinimalEditorialTemplate,
  'editorial-press': EditorialPressTemplate,
  'editorial-press-card': EditorialPressCardTemplate,
  'birthday-card': BirthdayCardTemplate,
};

export function getTemplateComponent(templateId: string, template?: Template): React.FC<TemplateRenderProps> {
  // If explicitly custom code template or has customHtml
  if (template?.isCustomCode || (template?.customHtml && template.customHtml.trim().length > 0)) {
    return CustomCodeTemplate;
  }

  const normalized = (templateId || '').toLowerCase().trim();

  if (
    normalized.startsWith('custom') ||
    normalized.includes('html') ||
    normalized.includes('code') ||
    normalized.includes('envelope') ||
    normalized.includes('video')
  ) {
    return CustomCodeTemplate;
  }

  const component = TEMPLATE_REGISTRY[normalized];

  if (component) {
    return component;
  }

  // Fallback if templateId contains keywords
  if (normalized.includes('gold')) return ElegantGoldTemplate;
  if (normalized.includes('floral') || normalized.includes('flower')) return FloralWeddingTemplate;
  if (normalized.includes('luxury') || normalized.includes('royal')) return LuxuryWeddingTemplate;
  if (normalized.includes('minimal')) return MinimalWeddingTemplate;
  if (normalized.includes('emerald')) return EmeraldSealEnvelopeTemplate;
  if (normalized.includes('rose') || normalized.includes('pink') || normalized.includes('blush')) return RoseSealEnvelopeTemplate;
  if (normalized.includes('sapphire') || normalized.includes('navy') || normalized.includes('blue')) return SapphireSealEnvelopeTemplate;
  if (normalized.includes('burgundy') || normalized.includes('wine') || normalized.includes('bordo')) return BurgundySealEnvelopeTemplate;

  // Ultimate fallback
  return ElegantGoldTemplate;
}

