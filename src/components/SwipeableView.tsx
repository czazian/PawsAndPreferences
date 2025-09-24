import {useState, useEffect} from "react";
import {useSwipeable} from "react-swipeable";
import type {CatModel} from "../model/CatModel.ts";
import "../styles/SwipeableView.css"

interface SwipeableViewProps {
    cats: CatModel[];
    onLike: (cat: CatModel) => void;
    onDislike: (cat: CatModel) => void;
}

export const SwipeableView = ({ cats, onLike, onDislike }: SwipeableViewProps) => {
    const [remainingCats, setRemainingCats] = useState<CatModel[]>(cats);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "">("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        for (let i = currentIndex; i < Math.min(currentIndex + 15, remainingCats.length); i++) {
            const img = new Image();
            img.src = `https://cataas.com/cat/${remainingCats[i].id}?width=400&height=400`;
        }
    }, [currentIndex, remainingCats]);

    const handleAction = (action: "like" | "dislike") => {
        if (remainingCats.length === 0) return;

        const currentCat = remainingCats[0];

        if (action === "like") {
            onLike(currentCat);
            setSwipeDirection("right");
        } else {
            onDislike(currentCat);
            setSwipeDirection("left");
        }

        setTimeout(() => {
            setRemainingCats((prev) => prev.slice(1));
            setSwipeDirection("");
            setCurrentIndex((prev) => prev + 1);
        }, 300);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleAction("dislike"),
        onSwipedRight: () => handleAction("like"),
        trackMouse: true,
        trackTouch: true,
        preventScrollOnSwipe: true,
        delta: 50,
    });

    if (remainingCats.length === 0) {
        return <div style={{color: "black", fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>No more cats available</div>;
    }

    const currentCat = remainingCats[0];

    return (
        <div>
            <div className="swipe-container" {...swipeHandlers}
                 style={{
                     transform: swipeDirection === "left" ? "translateX(-100px) rotate(-10deg)" :
                         swipeDirection === "right" ? "translateX(100px) rotate(10deg)" : "none",
                 }}>
                <div className={`cat-card ${swipeDirection}`}>
                    <div className="swipe-feedback">
                        <div className={`like ${swipeDirection === "right" ? "visible" : "hidden"}`}>
                            LIKE
                        </div>
                        <div className={`pass ${swipeDirection === "left" ? "visible" : "hidden"}`}>
                            Dislike
                        </div>
                    </div>

                    <img
                        src={`https://cataas.com/cat/${currentCat.id}?width=400&height=400`}
                        alt={currentCat.tags?.join(", ") || "Cat image"}
                        draggable="false"
                    />

                    {currentCat.tags && currentCat.tags.length > 0 && (
                        <div className="tag-box">
                            {currentCat.tags.map((tag, index) => (
                                <span className="tag" key={index}>{tag}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bottom-info">
                    <p className="cat-remain">
                        Cat {cats.length - remainingCats.length + 1} of {cats.length}
                    </p>
                </div>
            </div>
        </div>
    );
};
