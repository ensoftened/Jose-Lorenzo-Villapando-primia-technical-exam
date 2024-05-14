import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubesStacked,
  faFile,
  faHeart,
  faHomeAlt,
  faKey,
  faKitchenSet,
  faRing,
  faRuler,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const sideNavSchema = {
  managePositions: {
    linkLabel: "Manage Positions",
    key: "sideNavLink-1",
    icon: faStar,
    to: "/manage-positions",
    responsibilities: [],
  },
  systemUsers: {
    linkLabel: "System Users",
    key: "sideNavLink-2",
    icon: faUser,
    to: "/system-users",
    responsibilities: [],
  },
};

export default sideNavSchema;
