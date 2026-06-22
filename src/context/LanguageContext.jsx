"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Translations
const translations = {
  en: {
    home: "HOME",
    about: "ABOUT ME",
    works: "WORKS",
    hire: "HIRE ME",
    available: "AVAILABLE FOR WORK",
    developer: "A Web/App Developer From Lahore, Pakistan",
    journey:
      "My journey into development started with a love for both art and technology, which led me to pursue a career where I could blend these interests seamlessly.",
    learn: "Learn More",
    download: "Download Resume",
    total_hours: "Total Work Hours",
    projects_done: "Projects Done",
    satisfied: "Satisfied Customers",
    certifications: "Certifications",
    lets_talk: "Let's Talk",
  },
  es: {
    home: "INICIO",
    about: "SOBRE MÍ",
    works: "TRABAJOS",
    hire: "CONTRÁTAME",
    available: "DISPONIBLE PARA TRABAJAR",
    developer: "Un Desarrollador Web/App De Lahore, Pakistán",
    journey:
      "Mi viaje en el desarrollo comenzó con un amor por el arte y la tecnología, lo que me llevó a seguir una carrera donde podría combinar estos intereses sin problemas.",
    learn: "Saber Más",
    download: "Descargar CV",
    total_hours: "Horas Totales",
    projects_done: "Proyectos Realizados",
    satisfied: "Clientes Satisfechos",
    certifications: "Certificaciones",
    lets_talk: "Hablemos",
  },
  fr: {
    home: "ACCUEIL",
    about: "À PROPOS",
    works: "TRAVAUX",
    hire: "ENGAGEZ-MOI",
    available: "DISPONIBLE POUR TRAVAILLER",
    developer: "Un Développeur Web/App De Lahore, Pakistan",
    journey:
      "Mon parcours dans le développement a commencé par un amour pour l'art et la technologie, ce qui m'a amené à poursuivre une carrière où je pourrais mélanger ces intérêts de manière transparente.",
    learn: "En Savoir Plus",
    download: "Télécharger CV",
    total_hours: "Heures Totales",
    projects_done: "Projets Réalisés",
    satisfied: "Clients Satisfaits",
    certifications: "Certifications",
    lets_talk: "Discutons",
  },
  zh: {
    home: "首页",
    about: "关于我",
    works: "作品",
    hire: "雇用我",
    available: "可接受工作",
    developer: "来自巴基斯坦拉合尔的网页/应用开发者",
    journey: "我的开发之旅始于对艺术和技术的热爱，这促使我追求一个能够无缝融合这些兴趣的职业。",
    learn: "了解更多",
    download: "下载简历",
    total_hours: "工作总时数",
    projects_done: "完成项目",
    satisfied: "满意客户",
    certifications: "认证",
    lets_talk: "联系我",
  },
  ar: {
    home: "الرئيسية",
    about: "عني",
    works: "أعمالي",
    hire: "وظفني",
    available: "متاح للعمل",
    developer: "مطور ويب/تطبيقات من لاهور، باكستان",
    journey:
      "بدأت رحلتي في التطوير بحب للفن والتكنولوجيا، مما قادني إلى متابعة مهنة يمكنني فيها مزج هذه الاهتمامات بسلاسة.",
    learn: "اعرف المزيد",
    download: "تحميل السيرة الذاتية",
    total_hours: "إجمالي ساعات العمل",
    projects_done: "المشاريع المنجزة",
    satisfied: "العملاء الراضون",
    certifications: "الشهادات",
    lets_talk: "دعنا نتحدث",
  },
}

const LanguageContext = createContext(undefined)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 