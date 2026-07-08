export const site = {
  name: "Rucad Engenharia",
  slogan: "Sua demanda, nossa solução.",
  domain: "https://rucadengenharia.com.br",
  phoneDisplay: "(67) 99650-6767",
  phoneRaw: "5567996506767",
  email: "projetos@rucadengenharia.com.br",
  address: "[ENDEREÇO A CONFIRMAR]",
  creaMs: "[CREA-MS A CONFIRMAR]",
  social: {
    instagram: "https://www.instagram.com/rucadengenharia/",
    linkedin: "https://www.linkedin.com/company/rucad-engenharia/",
  },
  stats: [
    { value: "+500", label: "projetos realizados" },
    { value: "+200km", label: "rede de média tensão executada", confirm: true },
    { value: "100%", label: "de entregas no prazo contratual", confirm: true },
    { value: "100%", label: "da equipe certificada", confirm: true },
  ],
} as const;

export type Site = typeof site;
