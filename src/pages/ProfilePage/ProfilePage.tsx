import { useEffect, useState } from "react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import {
  ConnectedProfile,
  ShowAccountLinking,
} from "@/features/profile/ui/ShowAccountLinking/ShowAccountLinking";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { NotificationSettings } from "@/features/profile/ui/NotificationSettings/NotificationSettings";
import { LanguageSettings } from "@/features/profile/ui/LanguageSettings/LanguageSettings";
import ShowPaymentIdentifier from "@/features/profile/ui/ShowPaymentIdentifier/ShowPaymentIdentifier";
import ShowSubscriptionStatus from "@/features/profile/ui/ShowSubscriptionStatus/ShowSubscriptionStatus";
import UserHeader from "@/features/profile/ui/UserHeader/UserHeader";
import ProfileMenuItem from "@/features/profile/ui/ProfileMenuItem/ProfileMenuItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getUserThunk } from "@/entities/user/api/userApi";

const mockProfiles: ConnectedProfile[] = [
  {
    id: "telegram",
    name: "Telegram",
    icon: <SiTelegram size={24} color="#0088cc" />,
    data: "@JohnBiBot",
    confirmed: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <SiWhatsapp size={24} color="#25D366" />,
    data: "+7 234 567 890",
    confirmed: false,
  },
  {
    id: "email",
    name: "Email",
    icon: <MdEmail size={24} color="#EA4335" />,
    data: "john@example.com",
    confirmed: true,
  },
];

const mockPayments = [
  { title: "PayPal", icon: "media/profile/paypal.svg" },
  { title: "Visa", icon: "media/profile/visa.svg" },
  { title: "MasterCard", icon: "media/profile/mastercard.svg" },
];

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleChannelChange(channel: string) {
    setActiveChannel((prev) => (prev === channel ? null : channel));
  }
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  const menuItems = [
    {
      text: "Notification",
      icon: "media/profile/notification.svg",
      content: (
        <NotificationSettings
          activeChannel={activeChannel}
          onChange={handleChannelChange}
        />
      ),
    },
    {
      text: "Language",
      icon: "media/profile/language.svg",
      content: <LanguageSettings />,
    },
    {
      text: "Account linking",
      icon: "media/profile/account-linking.svg",
      content: <ShowAccountLinking profiles={mockProfiles} />,
    },
    {
      text: "Payment identifier",
      icon: "media/profile/payment-identifier.svg",
      content: <ShowPaymentIdentifier payments={mockPayments} />,
    },
    {
      text: "Subscription status",
      icon: "media/profile/subscription-status.svg",
      content: <ShowSubscriptionStatus active={true} days={20} />,
    },
  ];

  return (
    <div className="w-full flex flex-col h-screen-dynamic-minus-header bg-[#F8F8F8] p-4">
      <UserHeader user={user} />
      <div className="flex-1 flex flex-col gap-4 pt-5 overflow-y-auto hide-scrollbar pb-4">
        {menuItems.map(({ text, icon, content }, index) => (
          <ProfileMenuItem
            key={index}
            text={text}
            icon={icon}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            rightIcon={
              <img
                src={
                  openIndex === index
                    ? "media/chevron-down.svg"
                    : "media/chevron-right.svg"
                }
                alt="expand"
              />
            }
            isOpen={openIndex === index}
          >
            {openIndex === index && content}
          </ProfileMenuItem>
        ))}
      </div>
    </div>
  );
}
