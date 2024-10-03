import { MdOutlineManageAccounts } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSatellite1 } from "react-icons/ci";
import { LuDatabaseBackup, LuHardDriveDownload } from "react-icons/lu";

export const instructionData = [
  {
    icon: <MdOutlineManageAccounts className="text-4xl text-blue-600" />,
    title: "Create an Account",
    description:
      "Save your selected locations and receive customized notifications when the Landsat satellite passes over your region.",
  },
  {
    icon: <IoLocationOutline className="text-4xl text-blue-600" />,
    title: "Set Your Location",
    description: "Use the interactive map to choose your location of interest.",
  },
  {
    icon: <IoIosNotificationsOutline className="text-4xl text-blue-600" />,
    title: "Enable Notifications",
    description:
      "Receive alerts for satellite overpasses. You can select a lead time (e.g., 1 hour before) and choose your preferred method: email or in-app, ensuring you never miss an overpass.",
  },
  {
    icon: <CiSatellite1 className="text-4xl text-blue-600" />,
    title: "View Landsat Data",
    description: "Access the latest satellite imagery and data in the 'Data' section.",
  },
  {
    icon: <LuDatabaseBackup className="text-4xl text-blue-600" />,
    title: "Compare Data",
    description:
      "Use the comparison tool to overlay satellite data with your ground-based observations.",
  },
  {
    icon: <LuHardDriveDownload className="text-4xl text-blue-600" />,
    title: "Download Reports",
    description:
      "Export your satellite images or comparison results in a downloadable report format.",
  },
];
