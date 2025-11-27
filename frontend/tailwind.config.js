module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
        "animate-left",
        "animate-right",
        "animate-slideLeftFull",
        "animate-fadeUp",
    ],
    theme: {
        extend: {
            keyframes: {
                slideLeftFull: {
                    "0%": { opacity: 0, transform: "translateX(-100vw)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
                fadeUp: {
                    "0%": { opacity: 0, transform: "translateY(40px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                slideFromLeft: {
                    "0%": { opacity: 0, transform: "translateX(-120%)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
                slideFromRight: {
                    "0%": { opacity: 0, transform: "translateX(120%)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
            },
            animation: {
                slideLeftFull: "slideLeftFull 1.2s ease-out forwards",
                fadeUp: "fadeUp 1.2s ease-out forwards",
                left: "slideFromLeft 1.3s ease-out forwards",
                right: "slideFromRight 1.3s ease-out forwards",
            },
        },
    },
    plugins: [],
};
