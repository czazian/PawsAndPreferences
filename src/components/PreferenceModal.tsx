import type {CatModel} from "../model/CatModel.ts";
import {X} from "lucide-react";
import "../styles/PreferenceModal.css";

interface PreferenceModalProps {
    dislikedList: CatModel[];
    likedList: CatModel[];
    isOpen: boolean;
    onClose: () => void;
}

export const PreferenceModal = ({
                                    dislikedList,
                                    likedList,
                                    isOpen,
                                    onClose,
                                }: PreferenceModalProps) => {

    if (!isOpen) return null;
    const renderCats = (cats: CatModel[]) =>
        cats.map((cat) => (
            <div key={cat.id} className="cat-item">
                <img
                    src={`https://cataas.com/cat/${cat.id}`}
                    alt={cat.tags?.join(", ")}
                    width={100}
                />
            </div>
        ));

    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose}></div>

            <div className="modal-container">
                <button onClick={onClose} className="modal-close-btn">
                    <X size={20}/>
                </button>

                <h2 className="modal-title">Liked & Disliked Cats</h2>

                <div className="modal-grid">
                    <div className="modal-section">
                        <h3 className="modal-subtitle">Liked Cats ({ likedList.length})</h3>
                        <div className="cat-list">{renderCats(likedList)}</div>
                    </div>

                    <div className="modal-section">
                        <h3 className="modal-subtitle">Disliked Cats ({ dislikedList.length})</h3>
                        <div className="cat-list">{renderCats(dislikedList)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
