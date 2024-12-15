import { AiFillHome } from 'react-icons/ai'
import {
  MdArchive,
  MdOutlineGroups,
  MdOutlineSettings,
  MdModeEditOutline,
  MdOutlinePersonAddAlt,
} from 'react-icons/md'
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { LuSendHorizontal } from 'react-icons/lu'
import { IoLogOutOutline, IoTrashOutline } from 'react-icons/io5'

export const Icons = Object.freeze({
  HOME: AiFillHome,
  ARCHIVE: MdArchive,
  PLUS_FILLED: FaPlusCircle,
  FRIENDS: MdOutlineGroups,
  SETTINGS: MdOutlineSettings,
  ARROW_RIGHT: FaChevronRight,
  ARROW_LEFT: FaChevronLeft,
  SEND: LuSendHorizontal,
  EDIT: MdModeEditOutline,
  LOGOUT: IoLogOutOutline,
  FRIEND_ADD: MdOutlinePersonAddAlt,
  TRASH: IoTrashOutline,
} as const)
