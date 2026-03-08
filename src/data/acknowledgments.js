/**
 * Acknowledgments & Sources
 * Papers, repositories, and websites this atlas draws from.
 */

export const ACKNOWLEDGMENTS = [
  {
    category: "Guiding surveys",
    items: [
      {
        title: "A Review on Edge Large Language Models: Design, Execution, and Applications",
        authors: "Zheng et al.",
        year: 2025,
        url: "https://dl.acm.org/doi/10.1145/3719664",
        desc: "ACM Computing Surveys review of edge LLM design and execution. Used as a structural reference for the two-tier classification and inclusion criteria.",
      },
      {
        title: "Small Language Models: Survey, Measurements, and Insights",
        authors: "Lu et al.",
        year: 2024,
        url: "https://arxiv.org/abs/2409.15790",
        desc: "Systematic survey and benchmarking of small language models. The horizontal timeline layout in this atlas was inspired by the Overview of SLMs figure in this paper.",
      },
      {
        title: "On-Device Language Models: A Comprehensive Review",
        authors: "Xu et al.",
        year: 2024,
        url: "https://arxiv.org/abs/2409.00088",
        desc: "Broad survey of on-device SLMs covering architectures, compression techniques, and deployment strategies. The parameter scale scatter plot in the Trends page was inspired by the Summary of On-Device LLMs Evolution figure in this paper.",
      },
      {
        title: "A Comprehensive Survey of Small Language Models in the Era of Large Language Models",
        authors: "Wang et al.",
        year: 2025,
        url: "https://dl.acm.org/doi/full/10.1145/3768165",
        desc: "ACM TIST survey covering SLM techniques, enhancements, applications, collaboration with LLMs, and trustworthiness. Provides a broad taxonomy of the small language model landscape.",
      },
    ],
  },
  {
    category: "Resources",
    items: [
      {
        title: "On-Device LLMs: State of the Union, 2026",
        authors: "Vikas Chandra, Raghuraman Krishnamoorthi - Meta AI",
        year: 2026,
        url: "https://v-chandra.github.io/on-device-llms/",
        desc: "Practitioner-focused state-of-the-union covering compression, quantization, and inference optimization for on-device SLMs. Emphasis on techniques proven in practice, written by Meta AI researchers.",
      },
      {
        title: "What Are Small Language Models (SLMs)?",
        authors: "Microsoft Azure",
        year: 2024,
        url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-are-small-language-models",
        desc: "Microsoft Azure's definition and overview of SLMs, covering architecture, benefits, limitations, and edge deployment use cases. A useful reference for the SLM terminology adopted by this atlas.",
      },
      {
        title: "Awesome Mobile LLMs",
        authors: "steve Laskaridis",
        year: 2024,
        url: "https://github.com/stevelaskaridis/awesome-mobile-llm",
        desc: "Curated list of LLMs and related studies targeted at mobile and embedded hardware. A key reference for tracking models designed specifically for on-device deployment.",
      },
      {
        title: "Awesome LLMs on Device",
        authors: "Jiajun Xu",
        year: 2024,
        url: "https://github.com/jjxu217/Awesome-LLMs-on-device",
        desc: "Comprehensive hub for on-device SLMs with curated papers and resources. Used as a cross-reference for coverage of deployment-focused models and community tracking.",
      }
    ],
  },
  {
    category: "Official model blogs",
    items: [
      {
        title: "Meta AI Research Blog",
        authors: "Meta",
        year: 2023,
        url: "https://ai.meta.com/blog/",
        desc: "Primary source for Llama 1, 2, 3, and 3.2 release dates and technical details.",
      },
      {
        title: "Microsoft Research Blog",
        authors: "Microsoft",
        year: 2023,
        url: "https://www.microsoft.com/en-us/research/blog/",
        desc: "Source for Phi model family releases, architecture details, and BitNet research.",
      },
      {
        title: "Google DeepMind - Gemini & Gemma",
        authors: "Google DeepMind",
        year: 2023,
        url: "https://deepmind.google/technologies/gemini/",
        desc: "Official source for Gemini Nano on-device deployment specs and the Gemma model family (Gemma, Gemma 2, Gemma 3, Gemma 3n).",
      },
      {
        title: "Nexa AI Blog",
        authors: "Nexa AI",
        year: 2024,
        url: "https://nexa.ai/",
        desc: "Source for Octopus v2 functional-token architecture and Octo-Agent Pro release details.",
      },
      {
        title: "Qwen Blog",
        authors: "Alibaba Cloud",
        year: 2023,
        url: "https://qwenlm.github.io/blog/",
        desc: "Primary source for Qwen 1, 1.5, 2, 2.5, and 3 release dates, architecture details, and on-device deployment specs.",
      },
    ],
  },
];
