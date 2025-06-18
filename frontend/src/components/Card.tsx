import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    width?: string;
    height?: string;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
}

const Card = ({ children, width, height, flexDirection }: CardProps) => {
    return (
        <div
            className="bg-white p-5 rounded-md flex flex-col items-center justify-center gap-5"
            style={{
                width: width,
                height: height,
                flexDirection: flexDirection,
            }}
        >
            {children}
        </div>
    );
};

export default Card;
