import './App.css'
import {SwipeableView} from "./components/SwipeableView.tsx";
import {useEffect, useState} from "react";
import ApiRestService from "./rest-services/api-rest-service.tsx";
import type {CatModel} from "./model/CatModel.ts";
import {ClipLoader} from "react-spinners";
import {PreferenceModal} from "./components/PreferenceModal.tsx";

function App() {
    const [cats, setCats] = useState<CatModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [likedCats, setLikedCats] = useState<CatModel[]>([]);
    const [dislikedCats, setDislikedCats] = useState<CatModel[]>([]);
    const [preferModalOpen, setPreferModalOpen] = useState(false);

    const requiredNumberOfImages = 15;

    useEffect(() => {
        (async () => {
            try {
                const data = await ApiRestService.getCats(requiredNumberOfImages);
                data.map(cat => ({
                    ...cat,
                    imageUrl: `https://cataas.com/cat/${cat.id}?width=400&height=400`
                }));
                setCats(data);
            } catch (error) {
                console.error("Error fetching cats:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleLike = (cat: CatModel) => {
        setLikedCats((prev) => [...prev, cat]);
    };

    const handleDisliked = (cat: CatModel) => {
        setDislikedCats((prev) => [...prev, cat]);
    };

    return (
        <>
            { loading ? (
                <ClipLoader color="carol" size={50}/>
            ): (
                <div className="container">
                    <SwipeableView
                        cats={cats}
                        onLike={handleLike}
                        onDislike={handleDisliked}
                    />

                    <button className="modal-btn" onClick={() => setPreferModalOpen(true)}>
                        See List of Liked and Disliked Cats
                    </button>

                    <PreferenceModal
                        likedList={likedCats}
                        dislikedList={dislikedCats}
                        isOpen={preferModalOpen}
                        onClose={() => setPreferModalOpen(false)}
                    />
                </div>
            )}
        </>
    );
}

export default App;
