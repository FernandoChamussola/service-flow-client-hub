
import { cn } from "@/lib/utils";

type StatusType = 
  | "pending" 
  | "in-progress" 
  | "completed" 
  | "new" 
  | "approved" 
  | "rejected"
  | "waiting"
  | "canceled";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  "pending": {
    label: "Pendente",
    className: "bg-yellow-100 text-yellow-800"
  },
  "in-progress": {
    label: "Em Andamento",
    className: "bg-blue-100 text-blue-800"
  },
  "completed": {
    label: "Concluído",
    className: "bg-green-100 text-green-800"
  },
  "new": {
    label: "Novo",
    className: "bg-marketplace-primary/20 text-marketplace-primary"
  },
  "approved": {
    label: "Aprovado",
    className: "bg-green-100 text-green-800"
  },
  "rejected": {
    label: "Recusado",
    className: "bg-red-100 text-red-800"
  },
  "waiting": {
    label: "Aguardando",
    className: "bg-gray-100 text-gray-800"
  },
  "canceled": {
    label: "Cancelado",
    className: "bg-gray-100 text-gray-500"
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
