interface Payment {
  title: string;
  icon: string;
}

interface ShowPaymentIdentifierProps {
  payments: Payment[];
}

export default function ShowPaymentIdentifier({
  payments,
}: ShowPaymentIdentifierProps) {
  return (
    <div className="rounded-xl bg-white shadow px-4 pb-2 flex flex-col gap-4">
      {payments.map(({ title, icon }, index) => (
        <div key={index} className="flex items-center justify-between border-b last:border-b-0 pb-1">
            <div className="font-semibold text-black">
                {title}
            </div>
            <div className="max-w-8">
                <img src={icon} alt={title} />
            </div>
        </div>
      ))}
    </div>
  );
}
