
export interface Stat {
  v: string;
  l: string;
  icon?: string;
  trend?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface TableCol {
  h: string;
  items: string[];
  icon: string;
}

export interface Card {
  t: string;
  d: string;
  icon?: string;
  highlight?: boolean;
}

export interface BentoItem {
  id?: string;
  title?: string;
  value?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  span?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'glass' | 'glassStrong' | 'accent' | 'outline' | 'media';
  image?: string;
  esgType?: 'social' | 'ambiental' | 'gobernanza';
}

export interface TimelineItem {
  year: string;
  event: string;
  description?: string;
  icon?: string;
  highlight?: boolean;
}

export interface ArchitectureLayer {
  name: string;
  role: string;
  technologies: string[];
}

export interface VerticalBlock {
  title: string;
  items?: string[];
}

export interface EsgNode {
  title: string;
  description: string;
  icon?: string;
}

export interface EconomicRow {
  year: string;
  ingresos?: string;
  opex?: string;
  ebit?: string;
  ebitda?: string;
}

export interface CorporateEntity {
  title: string;
  subtitle?: string;
  icon?: string;
  level: 'parent' | 'child' | 'sibling';
}

export interface CostItem {
  concept: string;
  year0: string;
  isTotal?: boolean;
}

export interface YearCost {
  year: string;
  value: string;
}

export interface MetricBox {
  title: string;
  content: string[];
  highlightValues?: string[];
}

export interface CapexItem {
  concept: string;
  cost: string;
  isTotal?: boolean;
}

export interface OpexItem {
  partida: string;
  year1: string;
  year2: string;
  year3: string;
  year4: string;
  year5: string;
  year6: string;
  year7: string;
  year8: string;
  isTotal?: boolean;
}

export interface Slide {
  id: number;
  type: 'HERO' | 'HERO_GLOW' | 'HERO_FINAL' | 'BENTO_DATA' | 'BENTO_MARKET' | 'BENTO_GRID' | 'ALERT' | 'LIST' | 'STEPS' | 'TIMELINE' | 'KINETIC_BRIDGE' | 'VIDEO' | 'PYRAMID' | 'FUNNEL' | 'CIRCULAR' | 'ROADMAP' | 'SQUADS' | 'ECONOMIC' | 'CARDS_CHOICE' | 'QUADRANT' | 'EXECUTIVE_SUMMARY' | 'ARCHITECTURE_DIAGRAM' | 'VERTICAL_DIAGRAM' | 'TRIANGLE_ESG' | 'ECONOMIC_TABLE' | 'ECONOMIC_SUMMARY' | 'CORPORATE_HIERARCHY' | 'COST_ANALYSIS' | 'CAPEX_OPEX_TABLES';
  title: string;
  subtitle: string;
  description?: string;
  highlight?: string;
  stats?: Stat[];
  items?: string[];
  cards?: Card[];
  bentoItems?: BentoItem[];
  tableData?: TableCol[];
  timeline?: TimelineItem[];
  architectureLayers?: ArchitectureLayer[];
  benefits?: string[];
  speakerNotes?: string;
  builds?: string[];
  costTable?: CostItem[];
  yearEvolution?: YearCost[];
  metricBoxes?: MetricBox[];
  capexData?: CapexItem[];
  opexData?: OpexItem[];
}

export interface ContentData {
  slides: Slide[];
}
