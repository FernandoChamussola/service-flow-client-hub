
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimelineItemProps {
  title: string;
  description?: string;
  date?: string;
  status: "completed" | "active" | "upcoming";
  isLast?: boolean;
  children?: ReactNode;
}

export const TimelineItem = ({
  title,
  description,
  date,
  status,
  isLast = false,
  children
}: TimelineItemProps) => {
  return (
    <div className="relative pb-8 last:pb-0">
      {!isLast && <div className="timeline-line"></div>}
      
      <div className="relative flex items-start">
        <div className="flex-shrink-0 mr-4">
          {status === "completed" ? (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-marketplace-success text-white">
              <Check className="w-3 h-3" />
            </div>
          ) : status === "active" ? (
            <div className="timeline-dot-active"></div>
          ) : (
            <div className="timeline-dot"></div>
          )}
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={cn(
              "text-sm font-medium",
              status === "completed" ? "text-gray-900" : 
              status === "active" ? "text-marketplace-primary" : 
              "text-gray-500"
            )}>
              {title}
            </h3>
            {date && <span className="text-xs text-gray-500">{date}</span>}
          </div>
          
          {description && (
            <p className="text-sm text-gray-500 mb-2">{description}</p>
          )}
          
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export const Timeline = ({ children, className }: TimelineProps) => {
  return (
    <div className={cn("flow-root", className)}>
      <div className="relative">{children}</div>
    </div>
  );
};
