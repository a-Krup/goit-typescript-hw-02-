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

interface ApiResponse {
  results: ImageType[];
  total_pages: number;
}

export const fetchImages = async (
  query: string,
  page: number,
  accessKey: string
): Promise<ApiResponse> => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve data");
  }

  const data = await response.json();
  return data;
};
