export interface MuseumInfo {
  name: string;
  description: string;
  highlights: string[];
  image: string;
  website: string;
}

export const museumInfo: Record<string, MuseumInfo> = {
  "American Museum of Natural History, NY": {
    name: "American Museum of Natural History",
    description:
      "Uno de los museos científicos más influyentes del planeta. Su colección etnográfica y arqueológica permite conocer culturas de todo el mundo, incluyendo objetos precolombinos de gran valor histórico.",
    highlights: [
      "Colecciones antropológicas de las Américas con piezas únicas.",
      "Salas interactivas y exhibiciones inmersivas.",
      "Investigación científica de prestigio mundial.",
      "Amplias colecciones de objetos ceremoniales y rituales.",
      "Ideal para visitantes interesados en ciencia y cultura antigua."
    ],
    image:
      "https://cdn-imgix.headout.com/media/images/0cd1fb9f958a00dced7514b490a5f51c-1.jpg",
    website: "https://www.amnh.org/"
  },

  "Centro Mallqui, Leymebamba, Amazonas": {
    name: "Centro Mallqui Leymebamba",
    description:
      "Institución dedicada a la conservación del patrimonio arqueológico del norte peruano. Destaca por su archivo funerario, su colección textil y sus procesos de conservación de momias.",
    highlights: [
      "Más de 200 fardos funerarios cuidadosamente preservados.",
      "Textiles preincaicos y objetos rituales excepcionales.",
      "Arquitectura y ambientes construidos para conservación climática.",
      "Investigación activa sobre culturas Chachapoyas y de la ceja de selva.",
      "Ubicado en un valle andino espectacular y accesible para turismo cultural."
    ],
    image: "https://www.machupicchuterra.com/wp-content/uploads/leymebamba1-media.jpg",
    website: "https://www.museoleymebamba.org/"
  },

  "Ethnologisches Museum, Berlin, Germany": {
    name: "Ethnologisches Museum Berlin",
    description:
      "Uno de los museos etnográficos más importantes a nivel mundial. Su colección reúne artefactos, objetos rituales y documentos culturales de cientos de sociedades antiguas.",
    highlights: [
      "Más de 500 000 objetos de culturas globales.",
      "Colección destacada de arte y arqueología andina.",
      "Salas modernas dentro del Humboldt Forum.",
      "Exhibiciones sobre sistemas simbólicos, rituales y tecnología antigua.",
      "Ideal para quienes buscan comprender la diversidad cultural humana."
    ],
    image:
      "https://www1.wdr.de/kultur/kulturnachrichten/humboldt-forum-112~_v-HintergrundL.jpg",
    website:
      "https://www.smb.museum/museen-einrichtungen/ethnologisches-museum/home/"
  },

  "Field Museum of Natural History, Chicago, IL": {
    name: "Field Museum of Natural History",
    description:
      "Museo emblemático de Chicago enfocado en la historia natural y la evolución cultural. Su archivo arqueológico contiene piezas precolombinas de enorme interés.",
    highlights: [
      "Colecciones arqueológicas de culturas prehispánicas.",
      "Exhibiciones inmersivas y educativas.",
      "Piezas históricas de Sudamérica y Mesoamérica.",
      "Investigación científica activa.",
      "Uno de los museos más completos de Estados Unidos."
    ],
    image:
      "https://www.visittheusa.mx/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-01/Hero.%20The%20Field%20Museum%20exterior%20shot%20SOUTH_Web72DPI.jpg?h=0cfe27a0&itok=Y_N8bL_f",
    website: "https://www.fieldmuseum.org/"
  },

  "Hood Museum of Art, Dartmouth College": {
    name: "Hood Museum of Art",
    description:
      "Museo académico con colecciones globales y un enfoque en el estudio cultural. Destaca por su arquitectura contemporánea y sus piezas precolombinas.",
    highlights: [
      "Colección variada de arte indígena y arqueología.",
      "Espacios modernizados y altamente pedagógicos.",
      "Piezas precolombinas y textiles únicos.",
      "Museo universitario con programas educativos.",
      "Tranquilo y perfecto para visitas culturales detalladas."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Hood_Museum_of_Art_2019.jpg",
    website: "https://hoodmuseum.dartmouth.edu/"
  },

  "Joslyn Art Museum, Omaha, Nebraska": {
    name: "Joslyn Art Museum",
    description:
      "Importante museo de arte y arqueología con secciones dedicadas al arte indígena americano y a expresiones culturales antiguas.",
    highlights: [
      "Arquitectura monumental y moderna.",
      "Piezas provenientes de culturas americanas antiguas.",
      "Colección diversa e internacional.",
      "Eventos y exposiciones temporales de alta calidad.",
      "Entorno perfecto para turismo cultural en Omaha."
    ],
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/crm/omaha/Joslyn2024exterior_11_C8C6F0B0-CB1F-E298-B37907E773704E94-c8c6e1f5de6a0df_c8c6fa65-a047-440c-4aa2c4984eac9795.jpg",
    website: "https://www.joslyn.org/"
  },

  "Lowe Art Museum, University of Miami": {
    name: "Lowe Art Museum",
    description:
      "Museo universitario que alberga una colección extensa de arte asiático, africano y precolombino. Tiene una destacada presencia de objetos andinos.",
    highlights: [
      "Colección amplia de arte precolombino.",
      "Enfoque pedagógico ideal para estudiantes y turistas.",
      "Objetos rituales y esculturas antiguas.",
      "Hermosos espacios iluminados con diseño contemporáneo.",
      "Un oasis cultural dentro de Miami."
    ],
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1440,h_900/crm/miamifl/121023_JAbreu_019-1-_4EECD3BB-2CF2-47D4-B79268C9AAE4FC03_0ffd6947-17ff-4564-a1b5e18c730d4754.jpg",
    website: "https://lowe.miami.edu/"
  },

  "Lowie Museum, UC Berkeley": {
    name: "Phoebe A. Hearst Museum of Anthropology",
    description:
      "Uno de los museos antropológicos más importantes de Estados Unidos. Posee objetos arqueológicos y etnográficos excepcionales de civilizaciones americanas.",
    highlights: [
      "Colección monumental de arte y arqueología andina.",
      "Investigación antropológica de renombre internacional.",
      "Objetos rituales, cerámicas y textiles antiguos.",
      "Experiencia educativa completa y accesible.",
      "Ubicado en el histórico campus de UC Berkeley."
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Phoebe_A._Hearst_Museum_of_Anthropology.jpg",
    website: "https://hearstmuseum.berkeley.edu/"
  },

  "Musée du Quai Branly, Paris": {
    name: "Musée du Quai Branly – Jacques Chirac",
    description:
      "Museo parisino dedicado a las civilizaciones no occidentales, con una colección excepcional de arte y objetos arqueológicos de América.",
    highlights: [
      "Arquitectura icónica y moderna.",
      "Colección andina de primer nivel.",
      "Recorridos inmersivos y narrativos.",
      "Exposiciones temporales de importancia mundial.",
      "Ideal para quienes buscan arte no europeo."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Mus%C3%A9e_du_Quai_Branly_2015.jpg",
    website: "https://www.quaibranly.fr/"
  },

  "Museo de Arte Amano, Lima": {
    name: "Museo de Arte Amano",
    description:
      "Museo especializado en la cultura Chancay, famoso por su colección de textiles, cerámicas y objetos rituales excepcionalmente preservados.",
    highlights: [
      "Colección textil Chancay única en el mundo.",
      "Arquitectura minimalista y moderna.",
      "Museografía elegante y didáctica.",
      "Un recorrido perfecto para amantes del textil precolombino.",
      "Ambiente íntimo ideal para visitas tranquilas."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Museo_Amano.jpg",
    website: "https://www.museoamano.org/"
  },

  "Museo Nacional de Arqueología, Antropología e Historia del Perú": {
    name: "MNAAHP",
    description:
      "El museo más antiguo y completo del Perú. Su colección arqueológica abarca más de 10 000 años de historia andina.",
    highlights: [
      "La colección arqueológica más grande del país.",
      "Objetos desde Caral hasta el Inca.",
      "Sala de momias, textiles, cerámica y metalurgia.",
      "Espacios históricos donde vivieron personajes célebres.",
      "Visita obligatoria para conocer la identidad del Perú."
    ],
    image: "https://mnaahp.cultura.pe/sites/default/files/dsc_0095-p.jpg",
    website: "https://mnaahp.cultura.pe/"
  },

  "Museo de Ica": {
    name: "Museo Regional de Ica",
    description:
      "Museo con una destacada colección de textiles, cerámicas y momias de Paracas, Nasca y otras culturas del sur peruano.",
    highlights: [
      "Momias con cabelleras intactas.",
      "Textiles Paracas de altísima calidad.",
      "Cerámicas Nasca con iconografía compleja.",
      "Piezas únicas de ingeniería funeraria.",
      "Ideal para amantes de la arqueología."
    ],
    image: "https://www.turiweb.pe/wp-content/uploads/2019/03/museo-ica1-270319.jpg",
    website: "https://www.drc-ica.gob.pe/museo-regional-de-ica/"
  },

  "Museo Chileno de Arte Precolombino": {
    name: "Museo Chileno de Arte Precolombino",
    description:
      "Uno de los museos más destacados de Latinoamérica dedicado exclusivamente al arte y arqueología precolombina.",
    highlights: [
      "Colección panamericana excepcional.",
      "Salas dedicadas exclusivamente al mundo andino.",
      "Museografía moderna e inmersiva.",
      "Arquitectura subterránea impresionante.",
      "Perfecto para investigación y turismo cultural."
    ],
    image:
      "https://image.wmsm.co/67aae148c79e2/museo-chileno-de-arte-precolombino.webp",
    website: "https://www.precolombino.cl/"
  },

  "Museo Larco": {
    name: "Museo Larco",
    description:
      "Famoso museo limeño ubicado en una casona virreinal, con la colección de cerámica Mochica más importante del mundo.",
    highlights: [
      "Colección erótica Mochica única.",
      "Textiles y objetos de metalurgia finos.",
      "Jardines espectaculares para fotografías.",
      "Museografía elegante e internacional.",
      "Restaurante y ambiente ideal para turistas."
    ],
    image: "https://www.inkanmilkyway.com/wp-content/uploads/2019/11/museo-larco-lima-peru.jpg",
    website: "https://museolarco.org/"
  },

  "Museum für Völkerkunde, Vienna": {
    name: "Weltmuseum Wien",
    description:
      "Museo etnográfico austríaco que alberga piezas excepcionales de culturas de todo el mundo, incluyendo objetos andinos.",
    highlights: [
      "Arquitectura imperial impresionante.",
      "Colecciones globales de gran prestigio.",
      "Objetos rituales y ceremoniales raros.",
      "Experiencia cultural profunda y elegante.",
      "Ubicado en el histórico Heldenplatz."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Weltmuseum_Wien.jpg",
    website: "https://www.khm.at/en/museum-collections/world-museum-vienna/"
  },

  "Royal Ontario Museum, Toronto": {
    name: "Royal Ontario Museum",
    description:
      "El ROM es uno de los museos más grandes de Canadá e integra historia natural, arqueología y cultura global en un solo espacio.",
    highlights: [
      "Arquitectura icónica del cristal Michael Lee-Chin.",
      "Colecciones arqueológicas de talla mundial.",
      "Salas dedicadas a las Américas antiguas.",
      "Programación educativa constante.",
      "Perfecto para visitantes de todas las edades."
    ],
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/11/cc/d5.jpg",
    website: "https://www.rom.on.ca/"
  },

  "Smithsonian National Museum, Washington D.C.": {
    name: "National Museum of the American Indian",
    description:
      "Museo del Smithsonian dedicado exclusivamente a la historia, cultura y cosmovisión de los pueblos indígenas del continente.",
    highlights: [
      "Arquitectura inspirada en paisajes naturales.",
      "Colecciones profundas sobre pueblos amerindios.",
      "Narrativa museográfica poderosa y respetuosa.",
      "Investigación colaborativa con comunidades nativas.",
      "Ubicado en el corazón del National Mall."
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/National_Museum_of_the_American_Indian.jpg",
    website: "https://americanindian.si.edu/"
  },

  "Museo Temple Radicati, Huaraz": {
    name: "Museo Arqueológico de Ancash",
    description:
      "Museo dedicado a la cultura Recuay y otras sociedades del Callejón de Huaylas, con esculturas, cerámicas y objetos rituales de gran valor.",
    highlights: [
      "Importante colección de monolitos Recuay.",
      "Exhibición de objetos ceremoniales y funerarios.",
      "Ubicado en el centro de Huaraz.",
      "Excelente punto de partida para entender la historia altoandina.",
      "Ambiente educativo y accesible."
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Museo_Arqueol%C3%B3gico_de_Ancash.jpg",
    website:
      "https://museos.cultura.pe/museos/museo-arqueologico-de-ancash"
  },

  "Museo de Sitio de Pachacamac": {
    name: "Museo de Sitio Pachacamac",
    description:
      "Museo ubicado en el complejo arqueológico más importante de la costa central peruana,hogar del histórico oráculo de Pachacamac.",
    highlights: [
      "Museo moderno con diseño contemporáneo.",
      "Objetos rituales y ofrendas a Pachacamac.",
      "Contextos funerarios y arquitectónicos restaurados.",
      "Extenso recorrido por la ciudadela prehispánica.",
      "Paisajes costeños ideales para fotografía."
    ],
    image:
      "https://museos.cultura.pe/sites/default/files/styles/cabecera_museo_full/public/museos/imagen/rnm_122496169_0.jpg",
    website: "https://museopachacamac.cultura.pe/"
  }
};
