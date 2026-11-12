export const site = {
  name: "Rucad Engenharia",
  slogan: "Sua demanda, nossa solução.",
  domain: "https://rucadengenharia.com.br",
  phoneDisplay: "(67) 99650-6767",
  phoneRaw: "5567996506767",
  email: "projetos@rucadengenharia.com.br",
  cnpj: "44.499.587/0001-09",
  address: "Avenida Doutor Gunter Hans, 3281, Aero Rancho, Campo Grande, MS, 79085-108",
  addressStreet: "Avenida Doutor Gunter Hans, 3281",
  addressLocality: "Campo Grande",
  addressRegion: "MS",
  postalCode: "79085-108",
  // Atendimento majoritário em MS e nos estados que fazem divisa com MS.
  serviceArea: {
    display: "Mato Grosso do Sul e estados vizinhos (MT, GO, MG, SP e PR)",
    states: ["Mato Grosso do Sul", "Mato Grosso", "Goiás", "Minas Gerais", "São Paulo", "Paraná"],
  },
  hours: {
    display: "Segunda a sexta, das 7h30 às 17h30",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:30",
    closes: "17:30",
  },
  social: {
    instagram: "https://www.instagram.com/rucadengenharia/",
    linkedin: "https://www.linkedin.com/company/rucad-engenharia/",
    // Perfil da Empresa no Google (ID do Knowledge Graph)
    google: "https://www.google.com/search?kgmid=/g/11q3ycr4xt",
  },
  stats: [
    { value: "1.405", label: "postes implantados em campo", countTo: 1405 },
    { value: "93,37 km", label: "de rede elétrica executada", countTo: 93.37, decimals: 2, suffix: " km" },
    { value: "4.695 kVA", label: "de potência instalada para operação", countTo: 4695, suffix: " kVA" },
  ],
} as const;

export type Site = typeof site;
