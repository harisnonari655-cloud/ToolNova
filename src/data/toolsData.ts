import { ToolDefinition, CategoryInfo, ToolCategory } from '../types/index.ts';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ai-writing',
    slug: '/ai-writing-tools',
    title: 'AI Writing Tools',
    navTitle: 'AI Writing',
    description: 'Elevate your content creation with intelligent text humanization, paraphrasing, email drafting, and essay synthesis.',
    iconName: 'Sparkles',
    color: 'from-violet-500 to-purple-600',
    count: 6
  },
  {
    id: 'seo',
    slug: '/seo-tools',
    title: 'SEO Tools',
    navTitle: 'SEO Audits',
    description: 'Optimize search visibility with meta tag generators, keyword density analysis, robots.txt, and SERP visualizers.',
    iconName: 'Search',
    color: 'from-blue-500 to-indigo-600',
    count: 6
  },
  {
    id: 'image',
    slug: '/image-tools',
    title: 'Image Tools',
    navTitle: 'Image Studio',
    description: 'Compress, resize, convert, and crop images entirely inside your browser for maximum speed and privacy.',
    iconName: 'Image',
    color: 'from-emerald-500 to-teal-600',
    count: 5
  },
  {
    id: 'pdf',
    slug: '/pdf-tools',
    title: 'PDF Tools',
    navTitle: 'PDF Workflows',
    description: 'Merge multiple documents, extract pages, compress streams, convert to image, and turn photos into PDF files safely.',
    iconName: 'FileText',
    color: 'from-rose-500 to-red-600',
    count: 5
  },
  {
    id: 'developer',
    slug: '/developer-tools',
    title: 'Developer Tools',
    navTitle: 'Dev Utilities',
    description: 'Streamline coding workflows with JSON formatting & validation, Base64 & URL utilities, code minifiers, and UUIDs.',
    iconName: 'Code',
    color: 'from-amber-500 to-orange-600',
    count: 8
  }
];

export const TOOLS: ToolDefinition[] = [
  // --- Category A: AI Writing Tools (1-6) ---
  {
    id: 'ai-humanizer',
    name: 'AI Humanizer',
    shortDescription: 'Transform robotic, detectable AI text into natural, engaging, and genuinely human-sounding prose.',
    category: 'ai-writing',
    categoryName: 'AI Writing Tools',
    iconName: 'UserCheck',
    badge: 'Popular',
    seoTitle: 'Free AI Text Humanizer Online – Bypass Robotic Patterns | ToolNova',
    seoDescription: 'Convert AI-generated text into natural, authentic human writing. Bypass robotic phrasing with our free online AI humanizer tool.',
    keywords: ['ai humanizer', 'humanize ai text', 'bypass ai detector', 'natural writing tool', 'ai paraphrase human'],
    whatItDoes: 'The AI Humanizer analyzes syntactic cadence, vocabulary distribution, and stylistic variance to convert stiff AI drafts into warm, authentic human prose while preserving factual accuracy.',
    howToUse: [
      'Paste your AI-generated text into the input box.',
      'Select your desired tone (Casual, Professional, Academic, or Storyteller).',
      'Toggle High Thinking mode if your text requires nuanced argumentative depth.',
      'Click "Humanize Text" and inspect the real-time humanized output with word count statistics.',
      'Copy the polished result with one click.'
    ],
    benefits: [
      'Removes repetitive AI sentence structures and cliches.',
      'Adapts tone to your exact audience without losing meaning.',
      'Processes securely via server-side Gemini 4 Argon reasoning.',
      'Free to use with real-time character & word tracking.'
    ],
    examples: [
      {
        title: 'Academic Abstract Humanization',
        description: 'Converting boilerplate AI language into clear academic discourse.',
        input: 'In conclusion, it is crucially important to realize that artificial intelligence represents a paradigm shift that will revolutionize modern business metrics in an unprecedented manner.',
        output: 'Ultimately, artificial intelligence is reshaping everyday business operations—not as a fleeting trend, but as a fundamental change in how companies make decisions and deliver value.'
      }
    ],
    limitations: [
      'Quality depends on the original clarity of ideas.',
      'Requires server-side Gemini API key configuration for production AI generation.'
    ],
    faqs: [
      {
        question: 'How does the AI Humanizer differ from a standard rewriter?',
        answer: 'While ordinary rewriters swap synonyms, the AI Humanizer alters sentence cadence, balances burstiness, and removes telltale synthetic repetition.'
      },
      {
        question: 'Is my text logged or saved on your servers?',
        answer: 'No. ToolNova processes your text ephemerally in server memory and never stores your writing in a database.'
      }
    ],
    relatedToolIds: ['ai-text-rewriter', 'ai-paragraph-generator', 'ai-text-summarizer']
  },
  {
    id: 'ai-text-rewriter',
    name: 'AI Text Rewriter',
    shortDescription: 'Paraphrase and rewrite articles, sentences, or essays for superior clarity, readability, and engagement.',
    category: 'ai-writing',
    categoryName: 'AI Writing Tools',
    iconName: 'RefreshCw',
    badge: 'Essential',
    seoTitle: 'Free AI Text Rewriter & Paraphraser Online | ToolNova',
    seoDescription: 'Rewrite paragraphs, articles, and essays in seconds with ToolNova AI Text Rewriter. Improve clarity and vocabulary effortlessly.',
    keywords: ['ai text rewriter', 'online paraphrasing tool', 'article rewriter', 'sentence paraphraser', 'free ai rewriter'],
    whatItDoes: 'ToolNova AI Text Rewriter restructures sentences, enriches vocabulary, and eliminates wordiness while preserving the exact core thesis of your content.',
    howToUse: [
      'Enter or paste the source text in the input area.',
      'Choose the rewrite mode or tone: Creative, Formal, Concise, or Simplified.',
      'Click "Rewrite Content" to generate an updated version.',
      'Compare word counts and copy the output.'
    ],
    benefits: [
      'Eliminates passive voice and awkward sentence flow.',
      'Helps overcome writer’s block in seconds.',
      'Supports multiple international languages.'
    ],
    examples: [
      {
        title: 'Executive Summary Polish',
        description: 'Sharpening a lengthy corporate paragraph.',
        input: 'Due to the fact that our quarterly sales suffered a severe decline in numbers, we have made the final determination to cut our expenditure.',
        output: 'Following a sharp decline in quarterly sales, we have decided to reduce operating expenditures.'
      }
    ],
    limitations: [
      'Does not substitute human fact-checking for legal or medical documents.'
    ],
    faqs: [
      {
        question: 'Will this avoid plagiarism?',
        answer: 'Yes, it provides fresh phraseology and structure, but you should always cite your original intellectual sources.'
      }
    ],
    relatedToolIds: ['ai-humanizer', 'ai-essay-writer', 'ai-paragraph-generator']
  },
  {
    id: 'ai-paragraph-generator',
    name: 'AI Paragraph Generator',
    shortDescription: 'Generate well-researched, cohesive paragraphs on any topic, prompt, or outline with smooth transitions.',
    category: 'ai-writing',
    categoryName: 'AI Writing Tools',
    iconName: 'AlignLeft',
    badge: 'AI Powered',
    seoTitle: 'Free AI Paragraph Generator – Instant Paragraph Writer | ToolNova',
    seoDescription: 'Write engaging, topic-focused paragraphs in seconds. Perfect for bloggers, students, marketers, and copywriters.',
    keywords: ['ai paragraph generator', 'paragraph writer online', 'write paragraph ai', 'content paragraph generator'],
    whatItDoes: 'Generates focused, single or multi-topic paragraphs with a hook, contextual support, and concluding punch.',
    howToUse: [
      'Type your topic, key question, or target thesis in the prompt field.',
      'Pick the output tone and language.',
      'Click "Generate Paragraph" and instantly receive formatted text.'
    ],
    benefits: [
      'Instant starting point for blogs, newsletters, and papers.',
      'Crafts logical transitions and coherent reasoning.',
      'Free with zero mandatory account registration.'
    ],
    examples: [
      {
        title: 'Technology Topic',
        description: 'Generating a paragraph on cloud computing benefits.',
        input: 'Why small businesses should migrate from on-premise servers to cloud infrastructure.',
        output: 'For small businesses, migrating to cloud infrastructure shifts IT from a costly capital burden to an agile operational asset. Instead of maintaining depreciating server racks that require dedicated cooling and physical security, teams gain instant access to automated backups, elastic scaling during traffic spikes, and enterprise-grade encryption. This agility allows emerging enterprises to compete directly with industry giants without prohibitive upfront capital investments.'
      }
    ],
    limitations: [
      'Specific statistical figures should be verified.'
    ],
    faqs: [
      {
        question: 'Can I generate multiple paragraphs at once?',
        answer: 'Yes, simply specify "Write 3 distinct paragraphs on..." in your prompt instructions.'
      }
    ],
    relatedToolIds: ['ai-essay-writer', 'ai-text-rewriter', 'ai-email-writer']
  },
  {
    id: 'ai-email-writer',
    name: 'AI Email Writer',
    shortDescription: 'Draft professional, courteous, and persuasive business emails, follow-ups, and customer replies.',
    category: 'ai-writing',
    categoryName: 'AI Writing Tools',
    iconName: 'Mail',
    badge: 'Popular',
    seoTitle: 'Free AI Email Writer & Response Generator | ToolNova',
    seoDescription: 'Create polished business emails, cold outreach, and customer replies in seconds with ToolNova AI Email Writer.',
    keywords: ['ai email writer', 'email generator online', 'business email writer ai', 'cold email generator'],
    whatItDoes: 'Takes quick bullet points or informal thoughts and composes a complete, appropriately formatted email complete with subject line and sign-off.',
    howToUse: [
      'Enter the recipient context, goal of the email, and key talking points.',
      'Select tone (Professional, Urgent, Friendly, Persuasive, or Apologetic).',
      'Click "Draft Email" and copy directly into your email client.'
    ],
    benefits: [
      'Saves hours spent laboring over polite phrasing.',
      'Auto-generates catchy, high-open-rate subject lines.',
      'Handles tricky diplomatic replies effortlessly.'
    ],
    examples: [
      {
        title: 'Project Deadline Delay Notification',
        description: 'Polite notification to a client requesting a 2-day timeline extension.',
        input: 'Tell client Sarah that website launch needs 2 extra days for QA testing to guarantee mobile checkout is bug-free.',
        output: 'Subject: Update on Launch Timeline – Quality Assurance & Final Polish\n\nHi Sarah,\n\nI hope you’re having a great week.\n\nOur team is currently running the final pre-launch checks for the new website. During mobile checkout testing today, we identified a couple of edge cases that we want to refine to ensure your customers enjoy a flawless purchase experience.\n\nTo ensure everything is bulletproof, we would like to adjust our launch target by two days. We will keep you updated every step of the way.\n\nThank you so much for your understanding!\n\nBest regards,\n[Your Name]'
      }
    ],
    limitations: [
      'Remember to replace bracketed placeholders like [Your Name] before sending.'
    ],
    faqs: [
      {
        question: 'Can I use this for sales cold outreach?',
        answer: 'Yes! Select the "Persuasive" tone and mention your target prospect and value proposition.'
      }
    ],
    relatedToolIds: ['ai-humanizer', 'ai-paragraph-generator', 'ai-text-summarizer']
  },
  {
    id: 'ai-essay-writer',
    name: 'AI Essay Writer',
    shortDescription: 'Structure and compose comprehensive academic essays, thought leadership pieces, and argumentative articles.',
    category: 'ai-writing',
    categoryName: 'AI Writing Tools',
    iconName: 'GraduationCap',
    badge: 'AI Powered',
    seoTitle: 'Free AI Essay Writer & Outline Generator | ToolNova',
    seoDescription: 'Draft well-structured academic essays, introductions, arguments, and conclusions with deep reasoning.',
    keywords: ['ai essay writer', 'essay generator online', 'academic writing tool', 'college essay writer ai'],
    whatItDoes: 'Synthesizes multifaceted topics into structured essays with an engaging hook, background, thesis, well-substantiated arguments, and a synthesis conclusion.',
    howToUse: [
      'Provide your essay prompt, subject, or thesis question.',
      'Choose the essay type (Argumentative, Expository, Narrative, or Analytical).',
      'Click "Write Essay" to generate a structured draft.'
    ],
    benefits: [
      'Organizes complex research topics into cohesive outlines.',
      'Utilizes Gemini 4 Argon reasoning with high thinking capabilities.',
      'Provides balanced perspectives and counter-arguments.'
    ],
    examples: [
      {
        title: 'Ethics of Renewable Energy Transitions',
        description: 'Generating an introductory framework.',
        input: 'The socio-economic implications of rapid decarbonization in developing nations.',
        output: 'Title: Navigating Equity in Global Decarbonization\n\nAs the climate crisis intensifies, the imperative to transition away from fossil fuels has transitioned from an environmental aspiration to an urgent economic reality. However, for developing economies, rapid decarbonization introduces profound socio-economic dilemmas. While green energy infrastructure promises long-term energy independence, the abrupt retirement of carbon-intensive assets threatens livelihoods in industrial regions that lack alternate economic safety nets...\n\nThesis: A sustainable energy transition can only succeed if international decarbonization frameworks couple technical investment with equitable social transition programs.'
      }
    ],
    limitations: [
      'Users should conduct independent research and verify academic citations.'
    ],
    faqs: [
      {
        question: 'Does this write full multi-page papers?',
        answer: 'It produces a strong multi-section foundation (500–1200 words) that you can easily expand with specific research evidence.'
      }
    ],
    relatedToolIds: ['ai-humanizer', 'ai-text-rewriter', 'ai-paragraph-generator']
  },
  {
    id: 'ai-text-summarizer',
    name: 'AI Text Summarizer',
    shortDescription: 'Condense long articles, reports, transcripts, and documents into clear key takeaways and bullet points.',
    category: 'ai-writing',
    categoryName: 'AI Writing Tools',
    iconName: 'FileCheck',
    badge: 'Essential',
    seoTitle: 'Free AI Text Summarizer – Summary & Bullet Points | ToolNova',
    seoDescription: 'Summarize lengthy text, articles, and research documents instantly. Get executive summaries and key bullet points.',
    keywords: ['ai text summarizer', 'article summarizer online', 'summarize text free', 'executive summary generator'],
    whatItDoes: 'Ingests voluminous text and extracts core themes, primary conclusions, actionable takeaways, and quantitative data points.',
    howToUse: [
      'Paste your article, meeting transcript, or research notes.',
      'Choose summary format (Executive Brief, Bullet Points, or 1-Sentence Summary).',
      'Click "Summarize" and review the condensed insights.'
    ],
    benefits: [
      'Saves up to 80% of reading time on long-form reports.',
      'Highlights crucial facts without losing nuanced context.',
      'Shows original vs summarized word count savings.'
    ],
    examples: [
      {
        title: 'Research Paper Summary',
        description: 'Extracting key takeaways from a 500-word excerpt.',
        input: 'A detailed 500-word report on battery chemistry advancements with silicon anodes.',
        output: 'Executive Summary:\nSilicon anode batteries achieve a 30% higher energy density compared to conventional graphite anodes by mitigating lithium degradation during rapid cycling.\n\nKey Takeaways:\n• 30% increase in energy storage density achieved in laboratory trials.\n• Polymer binder prevents cracking during expansion phases.\n• Commercial rollout projected within 18 to 24 months.'
      }
    ],
    limitations: [
      'Ensure input text contains sufficient factual material to distill.'
    ],
    faqs: [
      {
        question: 'Can I summarize PDFs or long transcripts?',
        answer: 'Yes! Simply copy the text into the input box or use our PDF tools to extract the text first.'
      }
    ],
    relatedToolIds: ['ai-humanizer', 'ai-text-rewriter', 'keyword-density-checker']
  },

  // --- Category B: SEO Tools (7-12) ---
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    shortDescription: 'Generate comprehensive HTML meta tags, OpenGraph social cards, and Twitter Cards with clean code export.',
    category: 'seo',
    categoryName: 'SEO Tools',
    iconName: 'Tag',
    badge: 'Essential',
    seoTitle: 'Free Meta Tag Generator Online (HTML, OG & Twitter) | ToolNova',
    seoDescription: 'Create SEO-friendly meta tags, Open Graph cards, and Twitter cards for your website. Preview and copy HTML instantly.',
    keywords: ['meta tag generator', 'seo meta tags generator', 'opengraph generator', 'html meta generator'],
    whatItDoes: 'Creates valid, SEO-optimized `<meta>` tags including title, description, robots directives, viewport, author, Open Graph, and Twitter Cards ready to copy into your `<head>`.',
    howToUse: [
      'Fill in your Page Title, Meta Description, Website URL, and Social Image URL.',
      'Configure robots indexing (index/noindex, follow/nofollow).',
      'Select Twitter Card type (summary vs summary_large_image).',
      'Click "Copy HTML" or "Download Tags" to embed in your project.'
    ],
    benefits: [
      'Ensures rich preview snippets on social networks (LinkedIn, Twitter, Facebook).',
      'Prevents search engines from truncating titles and descriptions.',
      '100% free and client-side processing.'
    ],
    examples: [
      {
        title: 'SaaS Homepage Meta Tags',
        description: 'Complete meta tag bundle for a web app.',
        input: 'Title: ToolNova | Free Online Tools\nDescription: Access 30+ free high-performance tools for AI, SEO, and development.',
        output: '<title>ToolNova | Free Online Tools</title>\n<meta name="description" content="Access 30+ free high-performance tools for AI, SEO, and development." />\n<meta property="og:title" content="ToolNova | Free Online Tools" />\n<meta property="og:type" content="website" />'
      }
    ],
    limitations: [
      'Meta tags must be deployed to your live server to be detected by search engine web crawlers.'
    ],
    faqs: [
      {
        question: 'Where do I put the generated tags?',
        answer: 'Paste them inside the <head> section of your HTML document.'
      }
    ],
    relatedToolIds: ['meta-description-checker', 'serp-snippet-preview', 'robots-txt-generator']
  },
  {
    id: 'meta-description-checker',
    name: 'Meta Description Checker',
    shortDescription: 'Analyze your meta description length, pixel width, readability, keyword placement, and SERP truncation risk.',
    category: 'seo',
    categoryName: 'SEO Tools',
    iconName: 'CheckCircle2',
    badge: 'Popular',
    seoTitle: 'Meta Description Checker – Pixel Width & SERP Audit | ToolNova',
    seoDescription: 'Check if your meta description fits Google SERP limits. Analyzes character count, pixel width, and sentiment.',
    keywords: ['meta description checker', 'meta description length', 'serp description checker', 'seo snippet length'],
    whatItDoes: 'Calculates the character count (target 150-160) and estimated Google SERP desktop & mobile pixel limits (target ~960px) to prevent truncated search snippets.',
    howToUse: [
      'Type or paste your meta description into the analyzer box.',
      'Optionally specify your focus keyword to check placement.',
      'Check the real-time gauge: Green (Ideal 140–160 chars), Yellow (Too short or near limit), Red (Likely truncated).',
      'Preview the live Google desktop & mobile snippet mockup.'
    ],
    benefits: [
      'Avoids awkward truncation ellipses in Google results.',
      'Identifies presence of call-to-action power words.',
      'Live mobile vs desktop device preview.'
    ],
    examples: [
      {
        title: 'E-commerce Product Description',
        description: 'Optimizing a 155-character description with CTA.',
        input: 'Shop premium handcrafted leather wallets with RFID blocking. Enjoy free worldwide shipping and a lifetime guarantee on every order. Browse our collection today!',
        output: 'Status: 153 characters | ~920px | Optimal length for Desktop & Mobile'
      }
    ],
    limitations: [
      'Google occasionally rewrites meta descriptions dynamically based on specific user search queries.'
    ],
    faqs: [
      {
        question: 'What is the optimal character length for a meta description?',
        answer: 'Between 140 and 160 characters. Descriptions longer than 160 characters are typically truncated by Google.'
      }
    ],
    relatedToolIds: ['serp-snippet-preview', 'meta-tag-generator', 'keyword-density-checker']
  },
  {
    id: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    shortDescription: 'Analyze word frequency, 1-word, 2-word, and 3-word n-gram density to avoid search keyword stuffing.',
    category: 'seo',
    categoryName: 'SEO Tools',
    iconName: 'Percent',
    badge: 'Essential',
    seoTitle: 'Free Keyword Density Checker & Text Analyzer Online | ToolNova',
    seoDescription: 'Calculate keyword frequency and density percentages. Filter stop words and discover 1, 2, and 3-word phrases.',
    keywords: ['keyword density checker', 'keyword frequency analyzer', 'keyword stuffing check', 'seo text analyzer'],
    whatItDoes: 'Scans your article, removes common English stop words (the, is, at, which, etc.), and computes exact count and density percentage for unigrams, bigrams, and trigrams.',
    howToUse: [
      'Paste your article or copy into the text area.',
      'Toggle "Exclude Common Stop Words" as desired.',
      'Review the ranked frequency table with percentage density.',
      'Check if any keyword exceeds recommended 1-2.5% thresholds.'
    ],
    benefits: [
      'Prevents over-optimization and Google search penalties.',
      'Discovers high-value latent semantic phrases.',
      'Total word, unique word, and reading time statistics.'
    ],
    examples: [
      {
        title: 'Blog Post Scan',
        description: 'Checking frequency of primary topic phrases.',
        input: 'Digital marketing requires a deep understanding of marketing analytics. Effective marketing helps brands scale.',
        output: 'Keyword: "marketing" | Count: 3 | Density: 21.4% (Warning: over-density)'
      }
    ],
    limitations: [
      'Search engines evaluate semantic topical relevance, not just mathematical keyword counts.'
    ],
    faqs: [
      {
        question: 'What is a healthy keyword density?',
        answer: 'A natural density between 1% and 2.5% for your primary keyword is widely considered optimal.'
      }
    ],
    relatedToolIds: ['meta-description-checker', 'ai-text-summarizer', 'serp-snippet-preview']
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    shortDescription: 'Create clean, valid robots.txt files with custom user-agents, allow/disallow rules, crawl-delays, and sitemaps.',
    category: 'seo',
    categoryName: 'SEO Tools',
    iconName: 'FileCode',
    badge: 'Essential',
    seoTitle: 'Free Robots.txt Generator Online – Create Custom Crawl Rules | ToolNova',
    seoDescription: 'Generate valid robots.txt files to control search engine crawlers. Set user-agents, disallow rules, and sitemap links.',
    keywords: ['robots txt generator', 'create robots txt', 'seo robots generator', 'crawler directives generator'],
    whatItDoes: 'Constructs standardized crawler directives that inform Googlebot, Bingbot, and other web spiders which sections of your site should or should not be indexed.',
    howToUse: [
      'Choose the default crawler policy (Allow All or Disallow All).',
      'Enter directory paths you want to block (e.g. /admin/, /private/, /api/).',
      'Specify your XML Sitemap location URL.',
      'Optional: Set crawl delay or specific rules for Googlebot, Bingbot, or AI bots.',
      'Copy the output or download a ready-to-deploy `robots.txt` file.'
    ],
    benefits: [
      'Protects admin panels and staging directories from public search indexing.',
      'Conserves crawl budget for your most important landing pages.',
      'Validates syntax against official robots.txt protocol specifications.'
    ],
    examples: [
      {
        title: 'Standard Website Robots.txt',
        description: 'Allow all public pages with sitemap link and private admin block.',
        input: 'Sitemap: https://example.com/sitemap.xml\nDisallow: /admin/\nDisallow: /checkout/',
        output: 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /checkout/\n\nSitemap: https://example.com/sitemap.xml'
      }
    ],
    limitations: [
      'Robots.txt is an advisory protocol; malicious scrapers may disregard instructions.'
    ],
    faqs: [
      {
        question: 'Where should I save robots.txt?',
        answer: 'Place it at the root of your web domain: https://yourdomain.com/robots.txt.'
      }
    ],
    relatedToolIds: ['xml-sitemap-generator', 'meta-tag-generator', 'serp-snippet-preview']
  },
  {
    id: 'xml-sitemap-generator',
    name: 'XML Sitemap Generator',
    shortDescription: 'Generate compliant XML sitemaps with custom URL priorities, change frequencies, and last modified dates.',
    category: 'seo',
    categoryName: 'SEO Tools',
    iconName: 'Network',
    badge: 'Essential',
    seoTitle: 'Free XML Sitemap Generator Online – Valid Google Sitemap XML | ToolNova',
    seoDescription: 'Generate valid XML sitemaps for Google Search Console and Bing. Add URLs with changefreq and priority values.',
    keywords: ['xml sitemap generator', 'create sitemap xml', 'google sitemap builder', 'seo sitemap online'],
    whatItDoes: 'Generates standardized sitemap.xml files adhering to sitemaps.org standards, making it easy for search engine crawlers to discover all your site pages.',
    howToUse: [
      'Enter your domain or paste a list of website URLs (one per line).',
      'Select default change frequency (always, hourly, daily, weekly, monthly, yearly).',
      'Set priority value (0.0 to 1.0).',
      'Click "Generate XML Sitemap" to inspect syntax, copy code, or download `sitemap.xml`.'
    ],
    benefits: [
      'Ensures newly published pages are indexed quickly by Google.',
      'Provides machine-readable directory of all canonical pages.',
      'Instant download without third-party email gates.'
    ],
    examples: [
      {
        title: 'Multi-page Sitemap',
        description: 'Generating XML for Homepage, Blog, and Contact pages.',
        input: 'https://mysite.com\nhttps://mysite.com/blog\nhttps://mysite.com/contact',
        output: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">...'
      }
    ],
    limitations: [
      'A single XML sitemap file is limited to 50,000 URLs and 50MB uncompressed.'
    ],
    faqs: [
      {
        question: 'How do I submit this to Google?',
        answer: 'Upload the sitemap.xml file to your root directory and submit its URL in Google Search Console under Sitemaps.'
      }
    ],
    relatedToolIds: ['robots-txt-generator', 'meta-tag-generator', 'serp-snippet-preview']
  },
  {
    id: 'serp-snippet-preview',
    name: 'SERP Snippet Preview',
    shortDescription: 'Preview how your web page appears on Google search results on desktop and mobile devices.',
    category: 'seo',
    categoryName: 'SEO Tools',
    iconName: 'MonitorSmartphone',
    badge: 'Popular',
    seoTitle: 'Google SERP Snippet Preview Tool – Desktop & Mobile Simulator | ToolNova',
    seoDescription: 'Simulate how your title, URL, breadcrumbs, and meta description will look in Google search results.',
    keywords: ['serp snippet preview', 'google search simulator', 'seo title preview', 'serp simulator online'],
    whatItDoes: 'Simulates the exact typography, line height, pixel constraints, breadcrumb hierarchy, and favicon display of real Google Search Engine Results Pages (SERPs).',
    howToUse: [
      'Enter your SEO Title, URL path, and Meta Description.',
      'Toggle between Desktop View and Mobile View.',
      'Check for visual truncation (indicated by ellipses "...").',
      'Refine copy until the snippet looks clean, enticing, and fully visible.'
    ],
    benefits: [
      'Maximizes organic search Click-Through Rates (CTR).',
      'Validates visual layout against current Google search UI styling.',
      'Provides accurate character and pixel length meters.'
    ],
    examples: [
      {
        title: 'SaaS Tool Snippet',
        description: 'Testing title and description readability in mobile SERP.',
        input: 'Title: PDF Merger – Combine Multiple PDF Files Online for Free\nURL: https://toolnova.app/tools/pdf-merger\nDescription: Merge two or more PDF files into one clean document in seconds directly in your browser. 100% free and private.',
        output: 'Simulated high-converting mobile search card.'
      }
    ],
    limitations: [
      'Google sometimes tests different font sizes or adds rich attributes like dates or review stars.'
    ],
    faqs: [
      {
        question: 'Why does Google show a different description than I wrote?',
        answer: 'Google reserves the right to extract alternative text from your page if it believes that snippet answers the user’s specific search query more directly.'
      }
    ],
    relatedToolIds: ['meta-description-checker', 'meta-tag-generator', 'keyword-density-checker']
  },

  // --- Category C: Image Tools (13-17) ---
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Compress JPEG, PNG, and WebP images directly in your browser without uploading to external servers.',
    category: 'image',
    categoryName: 'Image Tools',
    iconName: 'Minimize2',
    badge: 'Client-Side',
    seoTitle: 'Free Online Image Compressor – Reduce JPG, PNG & WebP File Size | ToolNova',
    seoDescription: 'Compress images securely in your browser. Reduce file size up to 85% without noticeable quality loss.',
    keywords: ['image compressor', 'compress jpg online', 'reduce png size', 'compress image client side', 'free image compressor'],
    whatItDoes: 'Uses browser HTML5 Canvas encoding to recompress image buffers with adjustable compression quality, drastically reducing file size while keeping visual fidelity sharp.',
    howToUse: [
      'Drag and drop an image or click to select from your device.',
      'Adjust the quality slider (from 10% to 100%, 75% recommended).',
      'Optionally set maximum dimension scaling (e.g. 1920px max width).',
      'Review original vs compressed size and percentage savings.',
      'Click "Download Compressed Image".'
    ],
    benefits: [
      '100% Private: Images never leave your device or touch a remote server.',
      'Huge bandwidth savings and faster website load times.',
      'Instant real-time preview before download.'
    ],
    examples: [
      {
        title: 'Hero Banner Optimization',
        description: 'Compressing a 4.2 MB camera photo down to 320 KB.',
        input: '4.2 MB PNG file (4000x3000)',
        output: '345 KB WebP/JPEG (91.8% file size reduction, pristine visual clarity)'
      }
    ],
    limitations: [
      'Extremely high compression (<30% quality) can introduce subtle visual artifacts.'
    ],
    faqs: [
      {
        question: 'Are my photos uploaded to your server?',
        answer: 'No! All compression takes place strictly inside your browser’s local hardware memory.'
      }
    ],
    relatedToolIds: ['image-resizer', 'png-to-webp-converter', 'image-cropper']
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    shortDescription: 'Resize photos and graphics by exact pixel dimensions, percentage scale, or social media presets.',
    category: 'image',
    categoryName: 'Image Tools',
    iconName: 'Maximize2',
    badge: 'Client-Side',
    seoTitle: 'Free Image Resizer Online – Change Dimensions & Aspect Ratio | ToolNova',
    seoDescription: 'Resize images to custom width and height, maintain aspect ratio, or choose presets for Instagram, YouTube, and Twitter.',
    keywords: ['image resizer', 'resize image online', 'change photo dimensions', 'social media image resizer'],
    whatItDoes: 'Scales raster images to specified width and height using high-quality bi-cubic canvas resampling, with aspect ratio locking and one-click social media dimension presets.',
    howToUse: [
      'Upload your image.',
      'Enter custom Width and Height, or pick a preset (Instagram Square 1080x1080, YouTube Thumb 1280x720, Full HD 1920x1080).',
      'Toggle "Lock Aspect Ratio" to prevent distortion.',
      'Download the resized image.'
    ],
    benefits: [
      'Prepares images perfectly for social media headers and blog posts.',
      'Includes handy presets for popular digital platforms.',
      'Zero server upload wait time.'
    ],
    examples: [
      {
        title: 'Social Media Prep',
        description: 'Resizing a 3000x2000 photo to 1200x630 OpenGraph card.',
        input: '3000 x 2000 px photo',
        output: '1200 x 800 px perfectly scaled image'
      }
    ],
    limitations: [
      'Enlarging very small images beyond native resolution may cause pixelation.'
    ],
    faqs: [
      {
        question: 'Does resizing degrade picture quality?',
        answer: 'Downscaling preserves sharpness; upscaling cannot invent resolution that was not in the original photo.'
      }
    ],
    relatedToolIds: ['image-compressor', 'image-cropper', 'jpg-to-png-converter']
  },
  {
    id: 'jpg-to-png-converter',
    name: 'JPG to PNG Converter',
    shortDescription: 'Convert JPEG and JPG images into lossless PNG format with transparency support.',
    category: 'image',
    categoryName: 'Image Tools',
    iconName: 'Layers',
    badge: 'Client-Side',
    seoTitle: 'Free JPG to PNG Converter Online – Convert JPEG to PNG Lossless | ToolNova',
    seoDescription: 'Convert JPG photos to high quality PNG format in your browser. Fast, free, private, with zero upload limits.',
    keywords: ['jpg to png converter', 'convert jpeg to png', 'online image converter', 'image to png'],
    whatItDoes: 'Transcodes JPEG compressed images into high-fidelity portable network graphics (PNG) files ready for graphic design and compositing.',
    howToUse: [
      'Select or drop your JPG file.',
      'Inspect the instant preview.',
      'Click "Convert to PNG".',
      'Download the high-definition PNG file.'
    ],
    benefits: [
      'Enables support for alpha channels and transparent layers.',
      'Runs 100% locally on your device for absolute confidentiality.',
      'No email required and no file upload queues.'
    ],
    examples: [
      {
        title: 'Product Mockup Transcode',
        description: 'Converting a product JPEG into PNG for design software.',
        input: 'product_photo.jpg (1.8 MB)',
        output: 'product_photo.png (lossless raster format)'
      }
    ],
    limitations: [
      'Converting a JPG to PNG does not automatically make existing white backgrounds transparent.'
    ],
    faqs: [
      {
        question: 'Why did the PNG file size increase?',
        answer: 'PNG uses lossless compression, which stores every single pixel without discarding data like JPEG does.'
      }
    ],
    relatedToolIds: ['png-to-webp-converter', 'image-compressor', 'image-resizer']
  },
  {
    id: 'png-to-webp-converter',
    name: 'PNG to WebP Converter',
    shortDescription: 'Convert PNG or JPEG images into next-generation WebP format for dramatically smaller web assets.',
    category: 'image',
    categoryName: 'Image Tools',
    iconName: 'Zap',
    badge: 'Popular',
    seoTitle: 'Free PNG to WebP Converter Online – Next-Gen Web Optimization | ToolNova',
    seoDescription: 'Convert PNG images to WebP format to speed up your website. Slash file sizes by up to 70% while keeping alpha transparency.',
    keywords: ['png to webp converter', 'convert png to webp', 'next gen image converter', 'webp compressor'],
    whatItDoes: 'Converts legacy PNG images into modern Google WebP files with adjustable lossy or lossless compression, preserving alpha transparency at a fraction of the file size.',
    howToUse: [
      'Drop your PNG image into the upload box.',
      'Adjust the quality setting (default 85% gives optimal balance).',
      'Click "Convert to WebP".',
      'Download the optimized .webp file.'
    ],
    benefits: [
      'Significantly improves Google Core Web Vitals (LCP metric).',
      'Preserves transparent alpha backgrounds.',
      'Typically 25% to 70% smaller than equivalent PNG files.'
    ],
    examples: [
      {
        title: 'App Logo Conversion',
        description: 'Optimizing a transparent PNG logo for web deployment.',
        input: 'logo.png (840 KB)',
        output: 'logo.webp (112 KB — 86.6% smaller with identical visual fidelity)'
      }
    ],
    limitations: [
      'Ensure target applications support WebP (supported by all modern browsers since 2020).'
    ],
    faqs: [
      {
        question: 'Does WebP support transparency?',
        answer: 'Yes! WebP supports full 8-bit alpha channel transparency just like PNG.'
      }
    ],
    relatedToolIds: ['image-compressor', 'jpg-to-png-converter', 'image-resizer']
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    shortDescription: 'Crop images with precision aspect ratios (1:1, 16:9, 4:3, 3:2, Freeform) and pixel boundary controls.',
    category: 'image',
    categoryName: 'Image Tools',
    iconName: 'Crop',
    badge: 'Client-Side',
    seoTitle: 'Free Online Image Cropper – Precise Photo Cropping | ToolNova',
    seoDescription: 'Crop pictures online with fixed aspect ratios or freeform rectangle selection. Fast, private, browser-based photo cropper.',
    keywords: ['image cropper', 'crop photo online', 'crop image 1:1', 'square photo crop', 'free image cropper'],
    whatItDoes: 'Allows interactive spatial framing and extraction of designated image sub-regions with standard aspect ratio presets or custom coordinates.',
    howToUse: [
      'Upload your image.',
      'Choose an Aspect Ratio: Freeform, 1:1 (Square/Avatar), 16:9 (Widescreen), 4:3 (Standard), or 3:2 (Photography).',
      'Drag and resize the crop selection box.',
      'Click "Apply Crop" to preview and download the cropped image.'
    ],
    benefits: [
      'Perfect for profile avatars, social media headers, and thumbnails.',
      'Runs entirely on client hardware with zero data uploads.',
      'Real-time pixel dimension readouts.'
    ],
    examples: [
      {
        title: 'Avatar Creation',
        description: 'Extracting a 1:1 square headshot from a landscape photo.',
        input: 'Landscape team photo (3840x2160)',
        output: 'Square cropped headshot (1200x1200)'
      }
    ],
    limitations: [
      'Cropping removes portions of the image outside the active frame.'
    ],
    faqs: [
      {
        question: 'Can I undo a crop?',
        answer: 'Yes, you can reset the crop frame back to original image dimensions at any time.'
      }
    ],
    relatedToolIds: ['image-resizer', 'image-compressor', 'jpg-to-png-converter']
  },

  // --- Category D: PDF Tools (18-22) ---
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    shortDescription: 'Combine multiple PDF documents into a single organized file in seconds directly in your browser.',
    category: 'pdf',
    categoryName: 'PDF Tools',
    iconName: 'Copy',
    badge: 'Popular',
    seoTitle: 'Free PDF Merger Online – Combine PDF Files Securely | ToolNova',
    seoDescription: 'Merge two or more PDF files into one document. Reorder pages and files with client-side privacy using pdf-lib.',
    keywords: ['pdf merger', 'combine pdf online', 'merge pdf files', 'join pdf free', 'client side pdf merger'],
    whatItDoes: 'Leverages the open-source `pdf-lib` engine inside your browser to concatenate pages from multiple independent PDF files into one clean, continuous document without sending files over the network.',
    howToUse: [
      'Select or drop two or more PDF files.',
      'Reorder documents using the Up/Down buttons to adjust page sequence.',
      'Review total combined page count.',
      'Click "Merge PDFs" and download your combined document.'
    ],
    benefits: [
      'Total privacy: Your confidential documents never leave your browser.',
      'Supports merging unlimited documents.',
      'Preserves original vector typography, links, and vector graphics.'
    ],
    examples: [
      {
        title: 'Contract Package Assembly',
        description: 'Combining cover letter, contract agreement, and annexures.',
        input: 'cover_letter.pdf (1 page) + contract.pdf (4 pages) + schedule.pdf (2 pages)',
        output: 'combined_contract_package.pdf (7 total pages)'
      }
    ],
    limitations: [
      'Password-protected encrypted PDFs must be unlocked before merging.'
    ],
    faqs: [
      {
        question: 'Are there file size limits?',
        answer: 'Since merging happens in your browser’s RAM, files up to several hundred megabytes are easily handled on modern devices.'
      }
    ],
    relatedToolIds: ['pdf-splitter', 'image-to-pdf', 'pdf-compressor']
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    shortDescription: 'Extract specific pages or page ranges (e.g. 1-3, 5, 8-10) from a PDF into a new targeted document.',
    category: 'pdf',
    categoryName: 'PDF Tools',
    iconName: 'Scissors',
    badge: 'Client-Side',
    seoTitle: 'Free PDF Splitter Online – Extract Pages from PDF | ToolNova',
    seoDescription: 'Split PDF files and extract individual pages or page ranges easily. Private, free, browser-based PDF splitting.',
    keywords: ['pdf splitter', 'split pdf online', 'extract pages from pdf', 'separate pdf pages'],
    whatItDoes: 'Reads your PDF’s page catalog with `pdf-lib`, parses your requested page numbers and ranges, and compiles a new customized PDF containing only those selected pages.',
    howToUse: [
      'Upload your PDF file.',
      'Inspect the detected total page count.',
      'Enter the pages to extract (e.g., "1-2, 5" or "3-7").',
      'Click "Split & Extract Pages" and download the new PDF.'
    ],
    benefits: [
      'Isolate invoices, certificates, or chapters from massive documents.',
      'Fast client-side extraction in under 1 second.',
      '100% private and confidential.'
    ],
    examples: [
      {
        title: 'Extracting Invoice from Report',
        description: 'Extracting page 4 from a 20-page financial statement.',
        input: 'annual_report.pdf (20 pages) with input "4"',
        output: 'invoice_page_4.pdf (1 single extracted page)'
      }
    ],
    limitations: [
      'Page numbers entered must be within the actual page bounds of the source document.'
    ],
    faqs: [
      {
        question: 'How do I specify multiple pages?',
        answer: 'Use commas and hyphens, for example: 1-3, 5, 8-10.'
      }
    ],
    relatedToolIds: ['pdf-merger', 'pdf-to-image', 'pdf-compressor']
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    shortDescription: 'Optimize and reduce PDF document size through stream compression and removal of duplicate objects.',
    category: 'pdf',
    categoryName: 'PDF Tools',
    iconName: 'Minimize',
    badge: 'Client-Side',
    seoTitle: 'Free PDF Compressor Online – Optimize PDF Size Safely | ToolNova',
    seoDescription: 'Reduce PDF file sizes directly in your browser. Cleans unreferenced objects, recompresses streams, and shows real savings.',
    keywords: ['pdf compressor', 'compress pdf online', 'reduce pdf size', 'optimize pdf free'],
    whatItDoes: 'Applies standards-compliant PDF stream compression, optimizes font dictionaries, strips redundant structural metadata, and flattens unused cross-reference entries.',
    howToUse: [
      'Upload your PDF file.',
      'Click "Compress PDF".',
      'Inspect original size, compressed size, and exact bytes saved.',
      'Download your optimized PDF.'
    ],
    benefits: [
      'Honest reporting: Clearly shows if a PDF is already fully compressed.',
      '100% client-side: Ideal for sensitive legal or financial documents.',
      'Keeps vector text and form elements razor sharp.'
    ],
    examples: [
      {
        title: 'E-Book Optimization',
        description: 'Compressing unoptimized scanner streams.',
        input: 'scanned_manual.pdf (8.4 MB)',
        output: 'scanned_manual_compressed.pdf (5.6 MB — 33% smaller)'
      }
    ],
    limitations: [
      'PDFs that consist of already-compressed JPEG scans cannot be compressed further without raster resampling.'
    ],
    faqs: [
      {
        question: 'Why did my PDF only shrink slightly?',
        answer: 'Modern PDFs often already have FlateDecode stream compression applied. We never claim fake reduction numbers when data cannot be compressed.'
      }
    ],
    relatedToolIds: ['pdf-merger', 'pdf-splitter', 'image-to-pdf']
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    shortDescription: 'Convert PDF document pages into high-resolution PNG or JPEG images via browser canvas rendering.',
    category: 'pdf',
    categoryName: 'PDF Tools',
    iconName: 'FileImage',
    badge: 'Popular',
    seoTitle: 'Free PDF to Image Converter – Convert PDF to PNG & JPG | ToolNova',
    seoDescription: 'Turn PDF pages into high-definition PNG or JPG images in your browser. Download individual pages as images.',
    keywords: ['pdf to image', 'convert pdf to png', 'pdf to jpg online', 'pdf to photo converter'],
    whatItDoes: 'Renders vector and raster pages of your PDF onto a high-DPI HTML5 Canvas and exports the visual representation as a standalone PNG or JPEG file.',
    howToUse: [
      'Upload your PDF file.',
      'Select which page you wish to render (or view page previews).',
      'Select output format (PNG or JPEG).',
      'Click "Convert Page to Image" and download.'
    ],
    benefits: [
      'Easily share document pages on social media or in presentations.',
      'No third-party cloud file transfers.',
      'Preserves crisp typography and graphical diagrams.'
    ],
    examples: [
      {
        title: 'Certificate Image Export',
        description: 'Converting a PDF completion certificate into PNG for LinkedIn.',
        input: 'course_certificate.pdf',
        output: 'course_certificate_page_1.png'
      }
    ],
    limitations: [
      'Requires standard browser canvas capabilities.'
    ],
    faqs: [
      {
        question: 'What resolution are the exported images?',
        answer: 'Images are exported at standard 2x canvas scaling (high DPI) for sharp display.'
      }
    ],
    relatedToolIds: ['image-to-pdf', 'pdf-merger', 'image-compressor']
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    shortDescription: 'Convert one or multiple images (PNG, JPG, WebP) into a clean, print-ready PDF document.',
    category: 'pdf',
    categoryName: 'PDF Tools',
    iconName: 'FileUp',
    badge: 'Essential',
    seoTitle: 'Free Image to PDF Converter Online – JPG & PNG to PDF | ToolNova',
    seoDescription: 'Convert multiple photos, scans, and images into a single PDF document. Adjust page orientation and margins.',
    keywords: ['image to pdf', 'convert jpg to pdf', 'png to pdf converter', 'photos to pdf online'],
    whatItDoes: 'Embeds your image files directly into standardized PDF page containers using `pdf-lib`, calculating proportional aspect scaling and margins.',
    howToUse: [
      'Upload one or more images (PNG, JPG, WebP).',
      'Arrange order or add more photos.',
      'Select page layout (Auto-Fit, Portrait, or Landscape).',
      'Click "Generate PDF Document" and download your compiled PDF.'
    ],
    benefits: [
      'Ideal for creating receipt folders, portfolios, and homework submissions.',
      'Zero quality compression on embedded source imagery.',
      'Completely client-side and secure.'
    ],
    examples: [
      {
        title: 'Receipt Expense Dossier',
        description: 'Compiling 4 receipt photos into a single reimbursement PDF.',
        input: 'receipt_1.jpg, receipt_2.jpg, receipt_3.jpg',
        output: 'expense_receipts.pdf (3-page document)'
      }
    ],
    limitations: [
      'Very large multi-megapixel photos may take a few seconds to embed into PDF memory.'
    ],
    faqs: [
      {
        question: 'Can I include both PNG and JPG in the same PDF?',
        answer: 'Yes! You can mix PNG, JPG, and WebP images in the same document.'
      }
    ],
    relatedToolIds: ['pdf-merger', 'pdf-to-image', 'image-compressor']
  },

  // --- Category E: Developer Tools (23-30) ---
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    shortDescription: 'Format, beautify, indent, and colorize raw JSON with 2-space or 4-space tab indentation.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'Braces',
    badge: 'Popular',
    seoTitle: 'Free JSON Formatter & Beautifier Online | ToolNova',
    seoDescription: 'Format, prettify, and validate JSON data instantly. Supports 2-space, 4-space, minification, and copy.',
    keywords: ['json formatter', 'json beautifier', 'format json online', 'pretty print json', 'json viewer'],
    whatItDoes: 'Parses raw JSON strings and pretty-prints them with consistent indentation, syntax validation, key-value formatting, and one-click minification.',
    howToUse: [
      'Paste unformatted or minified JSON into the editor.',
      'Select indentation (2 spaces, 4 spaces, or Tab).',
      'Click "Format JSON" to beautify or "Minify" to compact.',
      'Copy the output or download as a `.json` file.'
    ],
    benefits: [
      'Turns unreadable API payloads into clean, readable hierarchies.',
      'Instant error detection with line pointers.',
      'Includes sample JSON template for fast testing.'
    ],
    examples: [
      {
        title: 'API Payload Beautification',
        description: 'Formatting a compact response string.',
        input: '{"status":"ok","code":200,"data":{"id":42,"name":"ToolNova"}}',
        output: '{\n  "status": "ok",\n  "code": 200,\n  "data": {\n    "id": 42,\n    "name": "ToolNova"\n  }\n}'
      }
    ],
    limitations: [
      'Input must be syntactically valid JSON (keys must use double quotes).'
    ],
    faqs: [
      {
        question: 'Is my data secure?',
        answer: 'Yes. All parsing happens locally within your browser using JavaScript JSON.parse.'
      }
    ],
    relatedToolIds: ['json-validator', 'base64-encoder-decoder', 'url-encoder-decoder']
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    shortDescription: 'Validate JSON syntax with detailed line-by-line error messages, bracket matching, and auto-fix.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'CheckSquare',
    badge: 'Essential',
    seoTitle: 'Free JSON Validator & Syntax Checker Online | ToolNova',
    seoDescription: 'Check if your JSON is valid with pinpoint line and column error reporting. Identify syntax issues fast.',
    keywords: ['json validator', 'validate json online', 'json syntax checker', 'fix json errors'],
    whatItDoes: 'Conducts strict RFC 8259 syntax validation on your JSON strings, pinpointing unexpected tokens, unescaped characters, missing commas, or trailing elements.',
    howToUse: [
      'Paste your JSON data into the validation area.',
      'Click "Validate JSON".',
      'If valid, see green confirmation and data structure summary (total keys, object depth).',
      'If invalid, see exact character offset, expected token, and quick fix recommendations.'
    ],
    benefits: [
      'Pinpoints tricky trailing commas and missing quotes instantly.',
      'Saves debugging hours when working with REST APIs and configs.',
      'No data transmitted to any external server.'
    ],
    examples: [
      {
        title: 'Trailing Comma Detection',
        description: 'Detecting an illegal trailing comma in an array.',
        input: '{\n  "items": [1, 2, 3,]\n}',
        output: 'SyntaxError: Unexpected token ] in JSON at position 23. (Common cause: Trailing comma in array)'
      }
    ],
    limitations: [
      'JSON requires strict double quotes for object keys.'
    ],
    faqs: [
      {
        question: 'Can this validate JSON with comments?',
        answer: 'Standard JSON does not support comments; remove // or /* */ comments before validation.'
      }
    ],
    relatedToolIds: ['json-formatter', 'base64-encoder-decoder', 'javascript-minifier']
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder/Decoder',
    shortDescription: 'Encode plain text or binary files into Base64 strings, or decode Base64 back into readable text.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'Binary',
    badge: 'Essential',
    seoTitle: 'Free Base64 Encoder & Decoder Online | ToolNova',
    seoDescription: 'Encode text or files into Base64 format or decode Base64 back to text. Supports UTF-8 and URL-safe Base64.',
    keywords: ['base64 encoder', 'base64 decoder', 'encode base64 online', 'decode base64 text', 'base64 converter'],
    whatItDoes: 'Converts arbitrary text strings and binary files into ASCII Base64 representations (RFC 4648) and reverses Base64 strings back to their original UTF-8 content.',
    howToUse: [
      'Select "Encode" or "Decode" mode.',
      'Paste your input text or upload a small file.',
      'Toggle URL-Safe mode (substituting `+` with `-` and `/` with `_`) if needed.',
      'Click "Process" and copy the result.'
    ],
    benefits: [
      'Full UTF-8 support including international emojis and symbols.',
      'URL-safe encoding option for web query parameters.',
      'Instant copy and text file download.'
    ],
    examples: [
      {
        title: 'Base64 Encoding Sample',
        description: 'Encoding standard text.',
        input: 'ToolNova: Powerful Tools. Smarter Work.',
        output: 'VG9vbE5vdmE6IFBvd2VyZnVsIFRvb2xzLiBTbWFydGVyIFdvcmsu'
      }
    ],
    limitations: [
      'Base64 strings are approximately 33% larger in byte size than raw binary data.'
    ],
    faqs: [
      {
        question: 'Is Base64 an encryption algorithm?',
        answer: 'No. Base64 is an encoding scheme, not encryption. Anyone can decode a Base64 string without a password.'
      }
    ],
    relatedToolIds: ['url-encoder-decoder', 'json-formatter', 'uuid-generator']
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    shortDescription: 'Encode special characters into percent-encoded URL parameters or decode complex query strings.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'Link',
    badge: 'Essential',
    seoTitle: 'Free URL Encoder & Decoder Online (Percent-Encoding) | ToolNova',
    seoDescription: 'Encode URLs with percent-encoding or decode URL query strings. Supports full URI and URIComponent modes.',
    keywords: ['url encoder', 'url decoder', 'percent encoding tool', 'url query encoder', 'decode uri online'],
    whatItDoes: 'Encodes non-ASCII characters and reserved symbols into percent-encoded hexadecimal format (`%20`, `%26`, etc.) or decodes them back into readable human strings.',
    howToUse: [
      'Select Encode or Decode mode.',
      'Choose between encodeURIComponent (recommended for query params) and encodeURI (for full URLs).',
      'Paste your string or URL.',
      'Click "Process" to obtain the converted string.'
    ],
    benefits: [
      'Prevents broken web links and malformed API queries.',
      'Decodes confusing percent-encoded analytics parameters.',
      'One-click URL breakdown showing query parameters.'
    ],
    examples: [
      {
        title: 'Search Query Parameter',
        description: 'Encoding a multi-word search string with symbols.',
        input: 'search=AI & Machine Learning: 2026!',
        output: 'search%3DAI%20%26%20Machine%20Learning%3A%202026!'
      }
    ],
    limitations: [
      'Ensure you select `encodeURIComponent` when encoding individual parameter values containing `&` or `=`.'
    ],
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI preserves protocol characters like ://, ?, and &, whereas encodeURIComponent encodes every reserved character.'
      }
    ],
    relatedToolIds: ['base64-encoder-decoder', 'json-formatter', 'html-minifier']
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier',
    shortDescription: 'Minify and compress HTML markup by stripping unnecessary whitespace, comments, and line breaks.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'FileCode2',
    badge: 'Essential',
    seoTitle: 'Free HTML Minifier Online – Compress HTML Markup | ToolNova',
    seoDescription: 'Minify HTML code online to reduce webpage size and boost Core Web Vitals. Removes whitespace and comments.',
    keywords: ['html minifier', 'minify html online', 'compress html', 'html size reducer', 'fast html minifier'],
    whatItDoes: 'Analyzes HTML documents, strips superfluous whitespace, removes development comments, collapses blank lines, and reduces overall payload size.',
    howToUse: [
      'Paste your HTML code into the editor.',
      'Configure options: Strip Comments, Collapse Whitespace, Preserve Pre/Code tags.',
      'Click "Minify HTML".',
      'Check byte savings and copy or download the minified markup.'
    ],
    benefits: [
      'Accelerates webpage download and browser DOM parsing.',
      'Calculates exact original vs minified bytes and percentage saved.',
      'Preserves pre-formatted `<pre>` and `<code>` blocks.'
    ],
    examples: [
      {
        title: 'Landing Page Markup Minification',
        description: 'Stripping comments and spaces.',
        input: '<!-- Header Section -->\n<header class="hero">\n  <h1> Welcome </h1>\n</header>',
        output: '<header class="hero"><h1>Welcome</h1></header>'
      }
    ],
    limitations: [
      'Ensure inline JavaScript inside `<script>` tags does not depend on single-line comments without line terminations.'
    ],
    faqs: [
      {
        question: 'Will minifying HTML break my website?',
        answer: 'Our minifier preserves semantic tags and spacing between inline attributes safely.'
      }
    ],
    relatedToolIds: ['css-minifier', 'javascript-minifier', 'json-formatter']
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    shortDescription: 'Compress stylesheets by stripping comments, redundant spaces, and trailing semicolons.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'Palette',
    badge: 'Essential',
    seoTitle: 'Free CSS Minifier Online – Compress Stylesheets | ToolNova',
    seoDescription: 'Minify CSS files online. Eliminate comments, spaces, and redundant characters to speed up stylesheet loading.',
    keywords: ['css minifier', 'minify css online', 'compress stylesheet', 'css optimizer', 'free css minifier'],
    whatItDoes: 'Cleans CSS style rules, strips multi-line `/* */` comments, removes unnecessary whitespace around selectors and brackets, and compresses color codes where valid.',
    howToUse: [
      'Paste your CSS stylesheet into the input box.',
      'Click "Minify CSS".',
      'View total characters saved and percentage reduction.',
      'Copy the minified CSS or download as `.min.css`.'
    ],
    benefits: [
      'Cuts CSS file size by up to 40%.',
      'Improves First Contentful Paint (FCP) score on web pages.',
      'Zero server upload requirement.'
    ],
    examples: [
      {
        title: 'Stylesheet Compression',
        description: 'Minifying a button component class.',
        input: '/* Button Style */\n.btn-primary {\n  background-color: #3b82f6;\n  padding: 12px 24px;\n  border-radius: 8px;\n}',
        output: '.btn-primary{background-color:#3b82f6;padding:12px 24px;border-radius:8px}'
      }
    ],
    limitations: [
      'Syntactically invalid CSS (such as unclosed curly braces) will trigger an alert.'
    ],
    faqs: [
      {
        question: 'Does this change how my styles look in the browser?',
        answer: 'No. Minification only strips non-functional whitespace and comments without modifying styling rules.'
      }
    ],
    relatedToolIds: ['html-minifier', 'javascript-minifier', 'json-formatter']
  },
  {
    id: 'javascript-minifier',
    name: 'JavaScript Minifier',
    shortDescription: 'Minify JS code by removing comments, formatting whitespace, and consolidating syntax.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'FileText',
    badge: 'Essential',
    seoTitle: 'Free JavaScript Minifier Online – Compress JS Code | ToolNova',
    seoDescription: 'Minify JavaScript scripts safely in your browser. Remove comments, whitespace, and optimize script loading speed.',
    keywords: ['javascript minifier', 'minify js online', 'compress javascript', 'js code minifier', 'fast js minifier'],
    whatItDoes: 'Removes single-line `//` and multi-line `/* */` comments, collapses whitespace outside string literals, and reduces the byte weight of client-side scripts.',
    howToUse: [
      'Paste your JavaScript or TypeScript source code into the editor.',
      'Click "Minify JavaScript".',
      'Inspect the minified script and percentage savings.',
      'Copy or download as `.min.js`.'
    ],
    benefits: [
      'Faster script execution download over slow mobile networks.',
      'Removes internal development comments before distribution.',
      'Processes 100% locally on your machine.'
    ],
    examples: [
      {
        title: 'Utility Function Minification',
        description: 'Minifying a math helper.',
        input: '// Calculate tax\nfunction calculateTax(amount, rate) {\n  const total = amount * rate;\n  return total;\n}',
        output: 'function calculateTax(amount,rate){const total=amount*rate;return total;}'
      }
    ],
    limitations: [
      'Does not perform variable renaming/mangling to prevent accidental global scope breakage.'
    ],
    faqs: [
      {
        question: 'Does this tool validate JS syntax?',
        answer: 'Yes, it checks basic parenthesis and brace matching before completing minification.'
      }
    ],
    relatedToolIds: ['html-minifier', 'css-minifier', 'json-formatter']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    shortDescription: 'Generate cryptographically secure Version-4 UUIDs / GUIDs individually or in bulk.',
    category: 'developer',
    categoryName: 'Developer Tools',
    iconName: 'Fingerprint',
    badge: 'Popular',
    seoTitle: 'Free UUID / GUID Generator Online (v4 Cryptographically Secure) | ToolNova',
    seoDescription: 'Generate cryptographically secure UUID v4 identifiers. Bulk generation (1 to 100), uppercase, lowercase, and hyphens.',
    keywords: ['uuid generator', 'guid generator online', 'uuid v4 generator', 'bulk uuid generator', 'random uuid'],
    whatItDoes: 'Generates RFC 4122 compliant version-4 universally unique identifiers using the browser’s native `crypto.randomUUID()` API, ensuring cryptographically secure randomness.',
    howToUse: [
      'Select how many UUIDs to generate (from 1 up to 100).',
      'Choose options: Uppercase, Lowercase, With Hyphens, or Without Hyphens.',
      'Click "Generate UUIDs".',
      'Copy individual UUIDs or click "Copy All".'
    ],
    benefits: [
      'Uses Web Cryptography API (`crypto.randomUUID`) for true cryptographic security.',
      'Generates up to 100 UUIDs instantaneously.',
      'Configurable formatting (uppercase/lowercase, braces, hyphens).'
    ],
    examples: [
      {
        title: 'Standard UUID v4',
        description: 'Standard 128-bit hex identifier with hyphens.',
        input: 'Generate 1 lowercase UUID with hyphens',
        output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
      }
    ],
    limitations: [
      'Generates random v4 UUIDs (v1 timestamp-based or v5 namespace-based UUIDs are not used).'
    ],
    faqs: [
      {
        question: 'What are the chances of two UUIDs colliding?',
        answer: 'Effectively zero. There are 2^122 (about 5.3 x 10^36) possible UUID v4 combinations, making collisions practically impossible.'
      }
    ],
    relatedToolIds: ['base64-encoder-decoder', 'url-encoder-decoder', 'json-formatter']
  }
];

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function searchTools(query: string): ToolDefinition[] {
  if (!query || !query.trim()) return TOOLS;
  const q = query.toLowerCase().trim();
  return TOOLS.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.categoryName.toLowerCase().includes(q) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  });
}
