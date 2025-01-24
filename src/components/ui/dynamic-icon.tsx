import React, { FunctionComponent, Suspense, lazy } from "react";

interface IconProps
  extends Partial<Omit<React.ComponentPropsWithoutRef<"svg">, "stroke">> {
  size?: string | number;
  stroke?: string | number;
  title?: string;
}

const DynamicIcon = React.forwardRef<
  SVGSVGElement,
  { icon: string } & IconProps
>(({ icon, size = 24, stroke = 2, title, ...rest }, ref) => {
  const IconComponent: FunctionComponent<IconProps> = lazy(() =>
    import(`@tabler/icons-react`).then((module) => ({
      default: (module as any)[
        `Icon${icon.charAt(0).toUpperCase() + icon.slice(1)}`
      ],
    }))
  );

  return (
    <Suspense>
      <IconComponent
        width={size}
        height={size}
        stroke={stroke}
        title={title}
        {...rest}
      />
    </Suspense>
  );
});

export default DynamicIcon;
