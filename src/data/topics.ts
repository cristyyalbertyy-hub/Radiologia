import { publicAsset } from '../utils/publicAsset'

export type TopicId = 'radiologia' | 'ultrassonografia' | 'eletrocardiografia'

export type RadiologyModuleId =
  | 'radiografia'
  | 'modalidades-avancadas-imagem'

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

export interface LearningContent {
  audioUrl: string
  audioCaption: string
  videoUrl: string
  videoCaption: string
  infographicSrc: string
  infographicCaption: string
  quizIntro: string
  quiz: QuizQuestion[]
}

export interface TopicContent extends LearningContent {
  id: TopicId
  label: string
  title: string
  podcastUrl: string
  podcastCaption: string
  quizFileUrl?: string
  extraVideos?: Array<{
    url: string
    caption: string
  }>
}

export interface RadiologyModuleContent extends LearningContent {
  id: RadiologyModuleId
  title: string
  podcastUrl?: string
  podcastCaption?: string
  quizEasyFileUrl?: string
  quizHardFileUrl?: string
}

const DEMO_AUDIO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'
const DEMO_AUDIO_2 =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/viper.mp3'
const DEMO_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export const TOPICS: Record<TopicId, TopicContent> = {
  radiologia: {
    id: 'radiologia',
    label: 'Radiologia',
    title: 'Radiologia',
    audioUrl: DEMO_AUDIO,
    audioCaption: 'Narracao introdutoria sobre principios de imagiologia.',
    videoUrl: DEMO_VIDEO,
    videoCaption: 'Demonstracao de leitura de radiografias toracicas.',
    podcastUrl: DEMO_AUDIO_2,
    podcastCaption: 'Episodio de conversa sobre seguranca e contraste.',
    infographicSrc:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=60',
    infographicCaption:
      'Resumo visual: posicionamento, exposicao e artefactos comuns.',
    quizIntro: 'Teste rapido sobre radiologia veterinaria.',
    quiz: [
      {
        question:
          'Em radiografia, qual a principal vantagem do sistema digital face ao filme?',
        options: [
          'Maior exposicao obrigatoria ao paciente',
          'Pos-processamento e arquivo sem quimica',
          'Eliminacao total da necessidade de protecao',
          'Imagens sempre sem granulacao',
        ],
        correctIndex: 1,
      },
    ],
  },
  ultrassonografia: {
    id: 'ultrassonografia',
    label: 'Ultra Sonografia',
    title: 'Ultrassonografia',
    audioUrl: DEMO_AUDIO,
    audioCaption: 'Comentarios audio sobre preparacao do doente e janela acustica.',
    videoUrl: publicAsset('/VU1.mp4'),
    videoCaption: 'Fundamentos de ecografia veterinaria.',
    extraVideos: [
      {
        url: publicAsset('/VU2.mp4'),
        caption: 'Ecografia com som.',
      },
    ],
    podcastUrl: publicAsset('/PU.m4a'),
    podcastCaption: 'Podcast de ultrassonografia.',
    infographicSrc: publicAsset('/IU.png'),
    infographicCaption:
      'Infografia: presets, profundidade e ganho - o que ajustar primeiro.',
    quizIntro: 'Questionario sobre ultrassonografia em medicina veterinaria.',
    quizFileUrl: publicAsset('/QU.csv'),
    quiz: [
      {
        question: 'O gel de contacto serve principalmente para:',
        options: [
          'Resfriar o transdutor',
          'Eliminar o ar entre pele e sonda',
          'Aumentar a frequencia emitida',
          'Substituir o coupling por agua esteril sempre',
        ],
        correctIndex: 1,
      },
      {
        question: 'O Doppler colorido mede diretamente a pressao arterial.',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 1,
      },
    ],
  },
  eletrocardiografia: {
    id: 'eletrocardiografia',
    label: 'Electrocardiografia',
    title: 'Electrocardiografia',
    audioUrl: DEMO_AUDIO,
    audioCaption: 'Audio-guia: derivacoes e ritmo sinusal.',
    videoUrl: publicAsset('/VE.mp4'),
    videoCaption: 'Video de electrocardiografia.',
    podcastUrl: publicAsset('/PE.m4a'),
    podcastCaption: 'Podcast de electrocardiografia.',
    infographicSrc: publicAsset('/IE.png'),
    infographicCaption: 'Infografia de electrocardiografia.',
    quizIntro: 'Questionario sobre ECG veterinario.',
    quizFileUrl: publicAsset('/QE.csv'),
    quiz: [
      {
        question: 'A onda P no ECG reflecte sobretudo:',
        options: [
          'Despolarizacao ventricular',
          'Repolarizacao auricular',
          'Despolarizacao auricular',
          'Conducao pelo feixe de His',
        ],
        correctIndex: 2,
      },
      {
        question: 'Taquicardia ventricular caracteriza-se tipicamente por:',
        options: [
          'QRS estreito com onda P visivel sempre',
          'Complexos QRS largos e morfologia aberrante',
          'Frequencia sempre inferior a 60 bpm',
          'Ausencia de variabilidade da frequencia',
        ],
        correctIndex: 1,
      },
    ],
  },
}

export const RADIOLOGY_MODULE_ORDER: RadiologyModuleId[] = [
  'radiografia',
  'modalidades-avancadas-imagem',
]

export const RADIOLOGY_MODULES: Record<RadiologyModuleId, RadiologyModuleContent> = {
  radiografia: {
    id: 'radiografia',
    title: 'Radiografia',
    audioUrl: DEMO_AUDIO,
    audioCaption: 'Introducao a tecnica radiografica e posicionamento.',
    videoUrl: publicAsset('/VR.mp4'),
    videoCaption: 'Video de radiografia veterinaria.',
    podcastUrl: publicAsset('/PR.m4a'),
    podcastCaption: 'Podcast de radiografia.',
    infographicSrc: publicAsset('/IR.png'),
    infographicCaption: 'Leitura basica de densidades em radiografia.',
    quizIntro: 'Questionario rapido de Radiografia.',
    quizEasyFileUrl: publicAsset('/QRm.csv'),
    quizHardFileUrl: publicAsset('/QRd.csv'),
    quiz: [
      {
        question: 'Qual estrutura aparece mais radiopaca?',
        options: ['Ar', 'Gordura', 'Osso', 'Liquido'],
        correctIndex: 2,
      },
      {
        question: 'Uma radiografia usa radiacao ionizante.',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 0,
      },
    ],
  },
  'modalidades-avancadas-imagem': {
    id: 'modalidades-avancadas-imagem',
    title: 'Modalidades Avancadas de Imagem',
    audioUrl: DEMO_AUDIO,
    audioCaption: '',
    videoUrl: publicAsset('/VM.mp4'),
    videoCaption: 'Video sobre modalidades avancadas de imagem.',
    podcastUrl: publicAsset('/PM.m4a'),
    podcastCaption: 'Podcast sobre modalidades avancadas de imagem.',
    infographicSrc: publicAsset('/IM.png'),
    infographicCaption: 'Infografia de modalidades avancadas.',
    quizIntro: 'Questionario de modalidades avancadas.',
    quizEasyFileUrl: publicAsset('/QMm.csv'),
    quizHardFileUrl: publicAsset('/QMd.csv'),
    quiz: [
      {
        question: 'A tomografia computorizada usa radiacao ionizante.',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 0,
      },
      {
        question: 'A ressonancia magnetica utiliza campo magnetico.',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 0,
      },
    ],
  },
}

export const TOPIC_ORDER: TopicId[] = [
  'radiologia',
  'ultrassonografia',
  'eletrocardiografia',
]

export function getTopic(id: string): TopicContent | undefined {
  return TOPICS[id as TopicId]
}

export function getRadiologyModule(id: string): RadiologyModuleContent | undefined {
  return RADIOLOGY_MODULES[id as RadiologyModuleId]
}
