import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../../context/GlobalContext";
import useEditBuyerProfile from "../../../../services/buyer/useEditBuyerProfile";
import ToggleButton from "../../../../components/shared/ToggleButton";

function Notifications() {
  const { EditBuyerProfile } = useEditBuyerProfile();
  const { userInfo } = useContext(GlobalContext);

  const [notifications, setNotifications] = useState([
    {
      key: "recieve_email_notification",
      title: "Email Notifications",
      description:
        "Get emails to find out what’s going on when you’re not online. You’ll receive notification about customers, tasks/leads and payments.",
      isOn: userInfo?.recieve_email_notification,
    },
    {
      key: "recieve_in_app_notification",
      title: "App Notifications",
      description:
        "Get emails to find out what’s going on when you’re not online. You’ll receive notification about customers, tasks/leads and payments.",
      isOn: userInfo?.recieve_in_app_notification,
    },
  ]);

  useEffect(() => {
    setNotifications([
      {
        key: "recieve_email_notification",
        title: "Email Notifications",
        description:
          "Get emails to find out what’s going on when you’re not online. You’ll receive notification about customers, tasks/leads and payments.",
        isOn: userInfo?.recieve_email_notification,
      },
      {
        key: "recieve_in_app_notification",
        title: "App Notifications",
        description:
          "Get emails to find out what’s going on when you’re not online. You’ll receive notification about customers, tasks/leads and payments.",
        isOn: userInfo?.recieve_in_app_notification,
      },
    ]);
  }, [userInfo]);

  const handleToggle = (item) => {
    const updatedValue = !item.isOn;
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.key === item.key
          ? { ...notification, isOn: updatedValue }
          : notification
      )
    );

    // Call the API with the updated value
    switch (item.key) {
      case "recieve_email_notification":
        EditBuyerProfile({ recieve_email_notification: updatedValue });
        break;
      case "recieve_in_app_notification":
        EditBuyerProfile({ recieve_in_app_notification: updatedValue });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 className="font-semibold text-[30px] text-secondary">
        Notifications
      </h1>
      <div className="w-full mt-3">
        {notifications.map((item, index) => (
          <div key={index} className="w-full flex justify-between mt-3">
            <div className="w-[70%]">
              <h1 className="text-[20px] text-[#222222] font-[600]">
                {item.title}
              </h1>
              <p className="text-[16px] font-[400] text-[#6F7487]">
                {item.description}
              </p>
            </div>
            <ToggleButton
              isOn={item.isOn}
              handleToggle={() => handleToggle(item)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Notifications;
