import { TbBeach } from "react-icons/tb";
import { IoDesktopSharp, IoFastFoodOutline } from "react-icons/io5";
import { BsFillHouseDoorFill, BsGraphUpArrow } from "react-icons/bs";
import { BiDonateHeart, BiMoviePlay } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa6";
import { IoIosAirplane } from "react-icons/io";
import { GiClothes, GiHealthNormal, GiTakeMyMoney } from "react-icons/gi";
import { FaBook, FaExclamation, FaQuestion } from "react-icons/fa";

const iconMap = {
  alimentacao: IoFastFoodOutline,
  doacao: BiDonateHeart,
  educacao: FaBook,
  entretenimento: BiMoviePlay,
  imposto: GiTakeMyMoney,
  investimentos: BsGraphUpArrow,
  lazer: TbBeach,
  moradia: BsFillHouseDoorFill,
  nao_previsto: FaExclamation,
  outros: FaQuestion,
  saude: GiHealthNormal,
  tecnologia: IoDesktopSharp,
  transporte: FaCarSide,
  vestuario: GiClothes,
  viagem: IoIosAirplane,
};

export const ENUM_CATEGORYS = {
  "Alimentação": "alimentacao",
  "Doação": "doacao",
  "Educação": "educacao",
  "Entretenimento": "entretenimento",
  "Imposto": "imposto",
  "Investimentos": "investimentos",
  "Lazer": "lazer",
  "Moradia": "moradia",
  "Não previsto": "nao_previsto",
  "Outros": "outros",
  "Saúde": "saude",
  "Tecnologia": "tecnologia",
  "Transporte": "transporte",
  "Vestuário": "vestuario",
  "Viagens": "viagens"
}

export type IconName = keyof typeof iconMap;

const Icon = ({ name }: { name: IconName }) => {
  const IconComponent = iconMap[name];
  // @ts-ignore
  const FixIconComponent = iconMap[ENUM_CATEGORYS[name]]

  if (IconComponent) {
    return <IconComponent data-testid="icon" color="#005B96" size={20} />
  }

  if (FixIconComponent) {
    return <FixIconComponent data-testid="icon" color="#005B96" size={20} />
  }

  return <FaQuestion data-testid="icon" color="#005B96" size={20} />
}

export default Icon