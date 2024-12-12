import { AiFillHome } from 'react-icons/ai'
import { MdArchive, MdOutlineGroups, MdOutlineSettings } from 'react-icons/md'
import { FaPlusCircle, FaChevronLeft } from 'react-icons/fa'

export const Icons = Object.freeze({
  HOME: AiFillHome,
  ARCHIVE: MdArchive,
  PLUS_FILLED: FaPlusCircle,
  FRIENDS: MdOutlineGroups,
  SETTINGS: MdOutlineSettings,
  ARROW_LEFT: FaChevronLeft,
} as const)
