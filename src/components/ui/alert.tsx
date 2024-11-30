import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

interface AlertProps {
  children: React.ReactNode;
  type?: "red" | "blue";
  className?: string;
}

interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertContentProps {
  children: React.ReactNode;
  className?: string;
}

const alertVariants = cva("px-6 py-4 flex flex-col md:flex-row items-start gap-4 rounded-lg my-4", {
  variants: {
    variant: {
      red: "alert-red text-red-100",
      blue: "alert-blue text-blue-100",
    },
  },
});

const Alert: React.FC<AlertProps> & {
  Title: React.FC<AlertTitleProps>;
  Content: React.FC<AlertContentProps>;
} = ({ children, type = "blue", className }) => {
  return (
    <div className={cn(alertVariants({ variant: type }), className)}>
      {children}
    </div>
  );
};

const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => {
  return <div className={cn("font-medium", className)}>{children}</div>;
};

const AlertContent: React.FC<AlertContentProps> = ({ children, className }) => {
  return <div className={cn("", className)}>{children}</div>;
};

Alert.Title = AlertTitle;
Alert.Content = AlertContent;

export default Alert;
