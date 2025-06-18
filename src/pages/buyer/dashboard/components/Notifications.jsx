import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../../context/GlobalContext";
import useEditProfile from "../../../../services/common/useEditProfile";
import ToggleButton from "../../../../components/shared/ToggleButton";

function Notifications() {
  const { EditProfile } = useEditProfile();
  const { userInfo } = useContext(GlobalContext);

  const [notifications, setNotifications] = useState([
    {
      key: "recieve_email_notification",
      title: "Email Alerts",
      description:
        "Get emails to find out what's going on when you're not online. You'll receive notification about customers, tasks/leads and payments.",
      isOn: userInfo?.user?.email_notifications,
    },
    // {
    //   key: "recieve_in_app_notification",
    //   title: "Push Notifications",
    //   description:
    //     "Get emails to find out what's going on when you're not online. You'll receive notification about customers, tasks/leads and payments.",
    //   isOn: userInfo?.user?.app_notifications,
    // },
  ]);

  useEffect(() => {
    setNotifications([
      {
        key: "recieve_email_notification",
        title: "Email Alerts",
        description:
          "Get emails to find out what's going on when you're not online. You'll receive notification about customers, tasks/leads and payments.",
        isOn: userInfo?.user?.email_notifications,
      },
      // {
      //   key: "recieve_in_app_notification",
      //   title: "Push Notifications",
      //   description:
      //     "Get emails to find out what's going on when you're not online. You'll receive notification about customers, tasks/leads and payments.",
      //   isOn: userInfo?.user?.app_notifications,
      // },
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
        EditProfile({ user: { email_notifications: updatedValue } });
        break;
      case "recieve_in_app_notification":
        EditProfile({ user: { app_notifications: updatedValue } });
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
              <h1 className="md:text-[20px] text-[15px] text-[#222222] font-[600]">
                {item.title}
              </h1>
              <p className="md:text-[16px] text-[10px] font-[400] text-[#6F7487]">
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
