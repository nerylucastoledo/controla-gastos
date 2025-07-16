import { TbBeach } from "react-icons/tb";
import { IoDesktopSharp, IoFastFoodOutline } from "react-icons/io5";
import { BsFillHouseDoorFill, BsGraphUpArrow } from "react-icons/bs";
import { BiDonateHeart, BiMoviePlay } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa6";
import { IoIosAirplane } from "react-icons/io";
import { GiClothes, GiHealthNormal, GiTakeMyMoney } from "react-icons/gi";
import { FaBook, FaExclamation, FaQuestion } from "react-icons/fa";

const iconMap = {
  "Alimentação": IoFastFoodOutline,
  "Doação": BiDonateHeart,
  "Educação": FaBook,
  "Entretenimento": BiMoviePlay,
  "Imposto": GiTakeMyMoney,
  "Investimentos": BsGraphUpArrow,
  "Lazer": TbBeach,
  "Moradia": BsFillHouseDoorFill,
  "Não previsto": FaExclamation,
  "Outros": FaQuestion,
  "Saúde": GiHealthNormal,
  "Tecnologia": IoDesktopSharp,
  "Transporte": FaCarSide,
  "Vestuário": GiClothes,
  "Viagens": IoIosAirplane,
};

export type IconName = keyof typeof iconMap;

const Icon = ({ name }: { name: IconName }) => {
  const IconComponent = iconMap[name];

  if (IconComponent) {
    return <IconComponent data-testid="icon" color="#005B96" size={20} />
  }

  return <FaQuestion data-testid="icon" color="#005B96" size={20} />
}

export default Icon