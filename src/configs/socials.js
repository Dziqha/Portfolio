import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const socialLinks = [
  {
    href: "https://github.com/Dziqha",
    icon: <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-gray-700" />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/dziqha",
    icon: (
      <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-gray-700" />
    ),
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/dziq_ha",
    icon: (
      <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-gray-700" />
    ),
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/channel/UC1iyfW0kdcSelRzL2FnuoiA",
    icon: (
      <FontAwesomeIcon icon={faYoutube} className="w-6 h-6 text-gray-700" />
    ),
    label: "YouTube",
  },
];
