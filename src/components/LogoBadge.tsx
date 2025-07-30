import Image from "next/image";

interface LogoBadgeProps {
    variant?: "white" | "light" | "transparent";
    text?: string;
}

export default function LogoBadge({
                                      text = "WOMAN FITNESS CENTER"
                                  }: LogoBadgeProps) {

    const styles = {
            container: "bg-[#faf1f1] border-white/20",
            logo: "/logo/woom_discount.svg",
            text: "text-[#eb3d3d]"
        }

    return (
        <span className={`inline-flex items-center backdrop-blur-[12.5px] ${styles.container} px-4 py-3 gap-3`} style={{
            padding: '4px'
        }}>
      <div className="w-7 h-3.5 relative">
        <Image
            src={styles.logo}
            alt="WOOM"
            fill
            className="object-contain"
        />
      </div>
      <span className={`${styles.text} text-base font-semibold uppercase`}>
        {text}
      </span>
    </span>
    );
}