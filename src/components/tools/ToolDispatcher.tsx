import React from 'react';
import { AiWritingTool } from './ai/AiWritingTool';
import {
  MetaTagGeneratorTool,
  MetaDescriptionCheckerTool,
  KeywordDensityCheckerTool,
  RobotsTxtGeneratorTool,
  XmlSitemapGeneratorTool,
  SerpSnippetPreviewTool
} from './seo/SeoTools';
import {
  ImageCompressorTool,
  ImageResizerTool,
  JpgToPngConverterTool,
  PngToWebpConverterTool,
  ImageCropperTool
} from './image/ImageTools';
import {
  PdfMergerTool,
  PdfSplitterTool,
  PdfCompressorTool,
  PdfToImageTool,
  ImageToPdfTool
} from './pdf/PdfTools';
import {
  JsonFormatterTool,
  JsonValidatorTool,
  Base64Tool,
  UrlEncoderDecoderTool,
  HtmlMinifierTool,
  CssMinifierTool,
  JsMinifierTool,
  UuidGeneratorTool
} from './dev/DevTools';

interface ToolDispatcherProps {
  toolId: string;
}

export const ToolDispatcher: React.FC<ToolDispatcherProps> = ({ toolId }) => {
  switch (toolId) {
    // --- Category A: AI Writing (1-6) ---
    case 'ai-humanizer':
      return (
        <AiWritingTool
          toolId="ai-humanizer"
          toolName="AI Humanizer"
          defaultPlaceholder="Paste AI generated text here to humanize syntax, rhythm, and tone..."
          defaultSample="Furthermore, it is undeniably essential to comprehend that artificial intelligence algorithms will systematically revolutionize the entire paradigm of modern commercial operations in unprecedented dimensions."
        />
      );

    case 'ai-text-rewriter':
      return (
        <AiWritingTool
          toolId="ai-text-rewriter"
          toolName="AI Text Rewriter"
          defaultPlaceholder="Enter sentences or paragraphs to paraphrase and enhance..."
          defaultSample="In light of the fact that client retention showed a decline during the second quarter, our leadership committee has arrived at the consensus to overhaul customer support procedures."
        />
      );

    case 'ai-paragraph-generator':
      return (
        <AiWritingTool
          toolId="ai-paragraph-generator"
          toolName="AI Paragraph Generator"
          defaultPlaceholder="Type a topic or outline to write a cohesive paragraph on..."
          defaultSample="Why local businesses benefit from adopting progressive web apps (PWAs) over traditional native mobile apps."
        />
      );

    case 'ai-email-writer':
      return (
        <AiWritingTool
          toolId="ai-email-writer"
          toolName="AI Email Writer"
          defaultPlaceholder="List key notes or details for your email (recipient, context, call-to-action)..."
          defaultSample="Draft an email to partner Jordan expressing appreciation for their keynote speech at our tech conference and proposing a follow-up collaboration meeting next Thursday at 2 PM."
        />
      );

    case 'ai-essay-writer':
      return (
        <AiWritingTool
          toolId="ai-essay-writer"
          toolName="AI Essay Writer"
          defaultPlaceholder="Enter your essay title, thesis question, or outline..."
          defaultSample="The ethical dilemmas and policy implications of autonomous algorithmic decision-making in public criminal justice systems."
        />
      );

    case 'ai-text-summarizer':
      return (
        <AiWritingTool
          toolId="ai-text-summarizer"
          toolName="AI Text Summarizer"
          defaultPlaceholder="Paste long articles, transcripts, or notes to condense into executive takeaways..."
          defaultSample="Quantum computing relies on quantum bits or qubits, which can exist in superposition. This allows quantum computers to calculate complex simulations—such as molecular folding for pharmacology and cryptographic factoring—exponentially faster than classical binary supercomputers. However, maintaining quantum coherence requires near absolute zero thermal isolation, presenting significant engineering hurdles before ubiquitous commercial adoption."
        />
      );

    // --- Category B: SEO (7-12) ---
    case 'meta-tag-generator':
      return <MetaTagGeneratorTool />;

    case 'meta-description-checker':
      return <MetaDescriptionCheckerTool />;

    case 'keyword-density-checker':
      return <KeywordDensityCheckerTool />;

    case 'robots-txt-generator':
      return <RobotsTxtGeneratorTool />;

    case 'xml-sitemap-generator':
      return <XmlSitemapGeneratorTool />;

    case 'serp-snippet-preview':
      return <SerpSnippetPreviewTool />;

    // --- Category C: Image (13-17) ---
    case 'image-compressor':
      return <ImageCompressorTool />;

    case 'image-resizer':
      return <ImageResizerTool />;

    case 'jpg-to-png-converter':
      return <JpgToPngConverterTool />;

    case 'png-to-webp-converter':
      return <PngToWebpConverterTool />;

    case 'image-cropper':
      return <ImageCropperTool />;

    // --- Category D: PDF (18-22) ---
    case 'pdf-merger':
      return <PdfMergerTool />;

    case 'pdf-splitter':
      return <PdfSplitterTool />;

    case 'pdf-compressor':
      return <PdfCompressorTool />;

    case 'pdf-to-image':
      return <PdfToImageTool />;

    case 'image-to-pdf':
      return <ImageToPdfTool />;

    // --- Category E: Developer (23-30) ---
    case 'json-formatter':
      return <JsonFormatterTool />;

    case 'json-validator':
      return <JsonValidatorTool />;

    case 'base64-encoder-decoder':
      return <Base64Tool />;

    case 'url-encoder-decoder':
      return <UrlEncoderDecoderTool />;

    case 'html-minifier':
      return <HtmlMinifierTool />;

    case 'css-minifier':
      return <CssMinifierTool />;

    case 'javascript-minifier':
      return <JsMinifierTool />;

    case 'uuid-generator':
      return <UuidGeneratorTool />;

    default:
      return (
        <div className="p-8 text-center text-slate-400">
          Tool component not found for {toolId}
        </div>
      );
  }
};
