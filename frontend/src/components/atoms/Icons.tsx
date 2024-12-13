import { AiFillHome } from 'react-icons/ai'
import { MdArchive, MdOutlineGroups, MdOutlineSettings } from 'react-icons/md'
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { LuSendHorizontal } from 'react-icons/lu'

export const Icons = Object.freeze({
  HOME: AiFillHome,
  ARCHIVE: MdArchive,
  PLUS_FILLED: FaPlusCircle,
  FRIENDS: MdOutlineGroups,
  SETTINGS: MdOutlineSettings,
  ARROW_RIGHT: FaChevronRight,
  ARROW_LEFT: FaChevronLeft,
  SEND: LuSendHorizontal,
} as const)
