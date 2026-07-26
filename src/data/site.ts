/**
 * Dados globais do site — fonte única de verdade para textos e links
 * reutilizados entre header, footer e seções (DRY).
 */

export const SITE = {
  // TODO(dev-todo-list #5): trocar pelo domínio final
  url: 'https://diamanteenergia.com.br',
  title: 'Programa Trainee Diamante Energia 2026',
  // 120–165 caracteres: acima disso o Google trunca no resultado de busca
  description:
    'Programa de Trainee da Diamante Energia: desenvolva sua carreira em uma operação estratégica para o futuro da energia. Inscrições até 17/08/2026.',
  ogImage: '/images/og-image.jpg',
} as const;

/**
 * Vídeo institucional da seção "A Empresa" (toca inline no container).
 * URL de EMBED. `youtube-nocookie` não grava cookies até o play.
 * Vazio = play desativado.
 */
export const VIDEO_EMBED_URL =
  'https://www.youtube-nocookie.com/embed/aaFToGqRAZ0';

/** Link de inscrição — usado por todos os CTAs da página. */
// TODO(dev-todo-list #3): substituir pela URL real do formulário
export const APPLY_URL = '#inscricao';

/** Navegação principal (header desktop + menu mobile). */
export const NAV_LINKS = [
  { href: '#a-empresa', label: 'A empresa' },
  { href: '#o-programa', label: 'O Programa' },
  { href: '#requisitos', label: 'Requisitos' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#faq', label: 'FAQ' },
] as const;

/** Destaques (local e prazo) — usados no hero e na seção "A empresa". */
export const HIGHLIGHTS = [
  { label: 'Atuação presencial em', value: 'Capivari de Baixo (SC)' },
  { label: 'Inscrições para todo Brasil', value: 'Até 17/08/2026' },
] as const;

/** Competências desenvolvidas no programa (seção "O que você vai desenvolver"). */
export const SKILLS = [
  {
    icon: 'eye',
    title: 'Visão Sistêmica',
    description: 'Compreensão do negócio e da operação de forma integrada.',
  },
  {
    icon: 'steps-career',
    title: 'Liderança',
    description: 'Desenvolvimento para futuras posições estratégicas.',
  },
  {
    icon: 'badge-check',
    title: 'Excelência Técnica',
    description: 'Aprendizado prático ao lado de profissionais experientes.',
  },
  {
    icon: 'team',
    title: 'Colaboração',
    description: 'Atuação em equipes multidisciplinares e ambiente colaborativo.',
  },
] as const;

/**
 * Requisitos para candidatura. Cada item é uma lista de trechos;
 * `true` marca o trecho em negrito, como no Figma.
 */
export const REQUIREMENTS = [
  {
    icon: 'user-graduate',
    parts: [
      ['Formação superior concluída', true],
      [' entre julho de 2024 e julho de 2026.', false],
    ],
  },
  {
    icon: 'machine-learning',
    parts: [
      ['Graduação em Engenharia', true],
      [' conforme áreas elegíveis.', false],
    ],
  },
  {
    icon: 'marker',
    parts: [
      ['Disponibilidade para atuação ', false],
      ['presencial em Capivari de Baixo (SC).', true],
    ],
  },
  {
    icon: 'home',
    parts: [
      ['Disponibilidade para ', false],
      ['mudança de cidade.', true],
    ],
  },
] as const;

/** Benefícios oferecidos ao trainee. */
export const BENEFITS = [
  { icon: 'dollar', title: 'Salário', note: 'Compatível com o mercado' },
  { icon: 'home', title: 'Auxílio Mudança', note: 'Mensal' },
  { icon: 'hands-heart', title: 'Seguro de Vida' },
  { icon: 'heart-rate', title: 'Plano de Saúde' },
  { icon: 'tooth', title: 'Plano Odontológico' },
  { icon: 'plate-eating', title: 'Vale Alimentação/Refeição' },
] as const;

/** Etapas do processo seletivo. */
// TODO(dev-todo-list #4): confirmar as datas com o cliente
export const STEPS = [
  { title: 'Inscrições e Trilha Online', date: 'Até 17 de agosto' },
  { title: 'Jornada de Aprofundamento', date: '24 a 28 de agosto' },
  { title: 'Painéis Online', date: '03 a 04 de setembro' },
  { title: 'Entrevistas Finais', date: '14 a 18 de setembro' },
  { title: 'Divulgação dos Aprovados', date: 'A partir de 21 de setembro' },
  { title: 'Início do Programa', date: '19 de outubro' },
] as const;

/**
 * Perguntas frequentes.
 * ⚠️ Apenas a primeira resposta veio do Figma; as demais foram redigidas a partir
 * do conteúdo da página e precisam de validação — ver dev-todo-list.md item 4.
 */
export const FAQ = [
  {
    question: 'Quem pode participar?',
    answer:
      'Podem participar pessoas com formação superior concluída entre julho de 2024 e julho de 2026 em cursos de Engenharia elegíveis para o programa, que tenham disponibilidade para atuar presencialmente em Capivari de Baixo (SC).',
  },
  {
    question: 'Onde fica a atuação?',
    answer:
      'A atuação é presencial em Capivari de Baixo (SC), onde fica o Complexo Termelétrico Jorge Lacerda. As inscrições, porém, estão abertas para todo o Brasil.',
  },
  {
    question: 'O programa é presencial?',
    answer:
      'Sim. O programa é presencial em Capivari de Baixo (SC), por isso é necessário ter disponibilidade para mudança de cidade.',
  },
  {
    question: 'Como acompanho as próximas etapas?',
    answer:
      'Todas as comunicações sobre o processo seletivo são enviadas por e-mail. Acompanhe também o cronograma das etapas nesta página.',
  },
  {
    question: 'Quando o programa começa?',
    answer:
      'O programa começa em 19 de outubro, após a divulgação dos aprovados, que acontece a partir de 21 de setembro.',
  },
] as const;

/** Redes sociais do footer. */
// TODO(dev-todo-list #3): confirmar URLs reais
export const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram', icon: 'instagram' },
  { href: '#', label: 'LinkedIn', icon: 'linkedin' },
  { href: '#', label: 'YouTube', icon: 'youtube' },
] as const;

/** Links legais da barra inferior do footer. */
// TODO(dev-todo-list #3): substituir por URLs reais
export const LEGAL_LINKS = [
  { href: '#', label: 'Aviso de Cookies' },
  { href: '#', label: 'Política de Privacidade' },
] as const;
