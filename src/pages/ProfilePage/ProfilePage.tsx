import ProfileMenuItem from "../../features/profile/ui/ProfileMenuItem/ProfileMenuItem";
import UserHeader from "../../features/profile/ui/UserHeader/UserHeader";
import { useAppSelector } from "../../shared/hooks/reduxHooks";

export default function ProfilePage() {
    const user = useAppSelector((state) => state.user.user);
//   const user = {
//     auth_date: 1748342645,
//     first_name: "Евгений",
//     hash: "95b958c87f1779490bf93384ba21215408c88cd374b759fca4055a2db407dc39",
//     id: 7761094400,
//     photo_url:
//       "https://t.me/i/userpic/320/KGAm2mzULAteAOt0k30_ENWNPc_DIHQwnQ2A8tTa6AshH3RrvqcSZFR--MYDXbW0.jpg",
//     username: "JohnBiBot",
//   };

  const menuItems = [
    {
      text: "Notification",
      icon: "media/profile/notification.svg",
      onClick: () => {
        // логика для Notification
      },
    },
    {
      text: "Language",
      icon: "media/profile/language.svg",
      onClick: () => {
        // логика для Language
      },
    },
    {
      text: "Account linking",
      icon: "media/profile/account-linking.svg",
      onClick: () => {
        // логика для Account linking
      },
    },
    {
      text: "Payment identifier",
      icon: "media/profile/payment-identifier.svg",
      onClick: () => {
        // логика для Payment identifier
      },
    },
    {
      text: "Subscription status",
      icon: "media/profile/subscription-status.svg",
      onClick: () => {
        // логика для Subscription status
      },
    },
  ];
  return (
    <div className="w-full h-screen-dynamic-minus-header bg-[#F8F8F8] p-4">
      <UserHeader user={user} />
      <div className="flex flex-col gap-4 pt-5">
        {menuItems.map(({ text, icon, onClick }, index) => (
          <ProfileMenuItem
            key={index}
            text={text}
            icon={icon}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
