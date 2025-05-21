import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./services/api";
import "./App.css";

type ImageType = {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  likes: number;
  created_at: string;
  location?: {
    name?: string;
  };
};

const App: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const accessKey = "u1G_rZf1UiHkHYgpRPjToRSqezYhMCuh_LMjjlpGTZg";

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchImages(query, page, accessKey);
        setImages((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
        setError("Something went wrong! Try again.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery: string): void => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter the text to search for.");
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />

      {error && <ErrorMessage message={error} />}

      <ImageGallery images={images} onImageClick={setSelectedImage} />

      {images.length > 0 &&
        page < totalPages &&
        (loading ? (
          <Loader size={50} color="#3498db" loading={loading} />
        ) : (
          <LoadMoreBtn onClick={handleLoadMore} />
        ))}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default App;
