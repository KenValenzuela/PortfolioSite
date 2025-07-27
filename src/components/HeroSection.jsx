import {motion} from "framer-motion";
import Spline from "@splinetool/react-spline";
const HeroSection = () => {
    return(
        <section className="h-screen bg-gradient-to-b from-blue-900 to-black flex xl:flex-row flex-col-reverse
        items-center justify-between lg:px-2 px-10 relative overflow-hidden">
            {/* left section */}
        <div className="z-40 xl:mb-0 mb-[20%]">
            <motion.h1
                initial={{opacity:0,y:80}}
                animate={{opacity:1,y:0}}
                transition={{
                    type:"spring",
                    stiffness:40,
                    damping:25,
                    delay:1.3,
                    duration:1.5
                }}
                className="text-5xl md:text-7xl lg:text-8x1 font-bold z-10 mb-6">
                Building Fast <br /> Reliable Results
            </motion.h1>

            <motion.p
                initial={{opacity:0,y:80}}
                animate={{opacity:1,y:0}}
                transition={{
                    type:"spring",
                    stiffness:40,
                    damping:25,
                    delay:1.8,
                    duration:1.5
                }}
                className ="text-xl md:text-1x1 lg:text-2xl text-blue-300 max-w-2xl">
                I'm a data-driven developer and analyst with a background in data science and a focus on building user-centered products. With experience across web development, machine learning, and business intelligence, I create tools that blend design, performance, and insight. My work is rooted in clarity, real-world impact, and thoughtful systems that scale. Whether it's a full-stack dashboard, a recommender system, or a product-focused website, I bring a sharp eye for detail and a commitment to clean, purposeful execution.

            </motion.p>
        </div>

            {/* right section */}
                <Spline className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0" scene="https://prod.spline.design/V7UYCIN6FD7eViG1/scene.splinecode" />

        </section>
    )

}
export default HeroSection