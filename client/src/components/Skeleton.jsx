import { motion, useTime, useTransform, easeOut } from "framer-motion";

const Skeleton = () => {
    const time = useTime();
    const pulseOpacity = useTransform(time, [0, 1000, 2000, 3000], [1, 0, 1, 0], {
        ease: easeOut,
    });

    return (
        <motion.div
            className="border-y py-4 flex gap-x-6 w-full h-full"
            style={{ opacity: pulseOpacity }}
        >
            <div className="relative w-36 h-24 bg-gray-200"></div>
            <div className="flex-1 flex flex-col gap-y-2">
                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                <div className="h-3 w-1/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
        </motion.div>
    );
};

export default Skeleton;