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

/** Link de inscrição (Eureca) — usado por todos os CTAs da página. */
export const APPLY_URL =
  'https://app.eureca.me/programas/019f8f69-ab3d-7bab-bfcc-d38301fd2494?utm_source=hotsite&utm_medium=organic&utm_campaign=diamanteenergia.01.trn_2026_trainee&utm_content=atracao';

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
  {
    href: 'https://www.instagram.com/diamante.energia',
    label: 'Instagram',
    icon: 'instagram',
  },
  {
    href: 'https://www.linkedin.com/company/diamante-gera%C3%A7%C3%A3o-de-energia/',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  {
    href: 'https://www.youtube.com/@diamanteenergia',
    label: 'YouTube',
    icon: 'youtube',
  },
] as const;

/**
 * Documentos legais exibidos em modal a partir do footer.
 * ⚠️ Textos-modelo (LGPD) — o jurídico da Diamante deve revisar e ajustar
 * antes do lançamento (canais de contato/DPO, prazos, cookies específicos).
 */
export const LEGAL_DOCS = [
  {
    id: 'cookies',
    label: 'Aviso de Cookies',
    updatedAt: 'julho de 2026',
    body: [
      'Este site utiliza cookies e tecnologias semelhantes para garantir seu funcionamento, lembrar preferências, medir audiência e melhorar a sua experiência de navegação.',
      'O que são cookies: pequenos arquivos de texto armazenados no seu dispositivo quando você acessa o site.',
      'Cookies que utilizamos:',
      '• Necessários — essenciais para o funcionamento do site e da inscrição; não podem ser desativados.\n• Desempenho e análise — ajudam a entender como o site é usado (páginas visitadas, tempo de permanência) de forma agregada.\n• Marketing — permitem medir a eficácia das nossas campanhas.',
      'Gerenciamento: você pode aceitar, recusar ou apagar cookies a qualquer momento nas configurações do seu navegador. A desativação de alguns cookies pode afetar funcionalidades do site.',
      'Para mais informações sobre o tratamento dos seus dados, consulte a nossa Política de Privacidade.',
    ],
  },
  {
    id: 'privacidade',
    label: 'Política de Privacidade',
    updatedAt: 'julho de 2026',
    body: [
      'A Diamante Energia respeita a sua privacidade e trata seus dados pessoais em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).',
      'Dados que coletamos: dados de contato e profissionais fornecidos por você ao se inscrever no Programa Trainee (nome, e-mail, telefone, formação, currículo) e dados de navegação coletados automaticamente por cookies.',
      'Finalidade: conduzir o processo seletivo do Programa Trainee, comunicar as etapas, cumprir obrigações legais e regulatórias e melhorar nossos serviços e comunicações.',
      'Compartilhamento: seus dados podem ser compartilhados com a Eureca, responsável pela operação do processo seletivo, e com prestadores de serviço estritamente necessários, sempre com salvaguardas de segurança e confidencialidade.',
      'Seus direitos: você pode solicitar a qualquer momento a confirmação do tratamento, o acesso, a correção, a portabilidade, a anonimização ou a exclusão dos seus dados, bem como revogar o consentimento.',
      'Retenção: mantemos os dados apenas pelo tempo necessário às finalidades acima ou conforme exigido por lei.',
      'Contato: para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato pelos nossos canais oficiais.',
    ],
  },
] as const;
