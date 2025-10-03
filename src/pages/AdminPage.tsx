import React, { useState } from "react";
import { Plus, X, Save, Tag, Palette, Video, Target } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  slug: string;
  tags: string[];
  bgColor: string;
  textColor: string;
  images: string[];
  category: string;
  ingredients: string[];
  ingredientsDescription: string[];
  ingredientsVideo: string;
  benefits: string[];
  supplementGuide: string[];
  missiontext: string;
  missionImage: string;
}

const AdminPanel = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    slug: "",
    tags: [],
    bgColor: "#FFFFFF",
    textColor: "#000000",
    images: [],
    category: "",
    ingredients: [],
    ingredientsDescription: [],
    ingredientsVideo: "",
    benefits: [],
    supplementGuide: [],
    missiontext: "",
    missionImage: "",
  });

  const [newTag, setNewTag] = useState("");
  const [newImage, setNewImage] = useState("");
  const [activeTab, setActiveTab] = useState<
    "basic" | "ingredients" | "benefits" | "mission"
  >("basic");

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (name: string) => {
    setProduct((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const addToArray = (field: keyof Product, value: string) => {
    if (value.trim()) {
      setProduct((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
    }
  };

  const removeFromArray = (field: keyof Product, index: number) => {
    setProduct((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (
    field: keyof Product,
    index: number,
    value: string
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };
  // todo make this save to handle submit and make payload out of it.
  const handleSubmit = () => {
    try {
      const response = api.post("api/v1/addProduct/add-product", product);
      // if (response) {
      //   toast.success("Product added Successfully");
      // }
      console.log(response);
    } catch (error) {
      console.error("Error while submitting Product: ", error);
      toast.error("Cannot add Product due to an error");
    }
  };

  const ArrayField = ({
    title,
    field,
    placeholder,
    buttonText,
  }: {
    title: string;
    field: keyof Product;
    placeholder: string;
    buttonText: string;
  }) => {
    const [newItem, setNewItem] = useState("");
    const items = product[field] as string[];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            placeholder={placeholder}
          />
          <button
            onClick={() => {
              addToArray(field, newItem);
              setNewItem("");
            }}
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>{buttonText}</span>
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-700 p-3 rounded-md"
            >
              <textarea
                value={item}
                onChange={(e) => updateArrayItem(field, index, e.target.value)}
                className="flex-1 bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-white"
                rows={2}
              />
              <button
                onClick={() => removeFromArray(field, index)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-gray-400 text-sm italic">
            No {title.toLowerCase()} added yet
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Product Admin Panel</h1>
            <button
              onClick={handleSubmit}
              className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { key: "basic", label: "Basic Info", icon: <Tag size={16} /> },
            {
              key: "ingredients",
              label: "Ingredients",
              icon: <Video size={16} />,
            },
            {
              key: "benefits",
              label: "Benefits & Guide",
              icon: <Plus size={16} />,
            },
            { key: "mission", label: "Mission", icon: <Target size={16} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                activeTab === tab.key
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === "basic" && (
          <div className="space-y-8">
            {/* Basic Product Info */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slug (Auto-generated)
                  </label>
                  <input
                    type="text"
                    value={product.slug}
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="product-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        stock: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category*
                  </label>
                  <input
                    type="text"
                    value={product.category}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Enter category ObjectId"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Enter product description"
                  required
                />
              </div>
            </div>

            {/* Colors */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Palette size={20} />
                <span>Color Settings</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={product.bgColor}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          bgColor: e.target.value,
                        }))
                      }
                      className="w-12 h-10 bg-gray-700 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={product.bgColor}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          bgColor: e.target.value,
                        }))
                      }
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={product.textColor}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          textColor: e.target.value,
                        }))
                      }
                      className="w-12 h-10 bg-gray-700 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={product.textColor}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          textColor: e.target.value,
                        }))
                      }
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Product Images *</h3>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Enter image URL"
                />
                <button
                  onClick={() => {
                    addToArray("images", newImage);
                    setNewImage("");
                  }}
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add Image</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md bg-gray-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNjQiIGZpbGw9IiM2QjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkltYWdlIEVycm9yPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                    <button
                      onClick={() => removeFromArray("images", index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              {product.images.length === 0 && (
                <p className="text-red-400 text-sm">
                  * At least one image is required
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Tags</h3>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Enter tag"
                />
                <button
                  onClick={() => {
                    addToArray("tags", newTag);
                    setNewTag("");
                  }}
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <Tag size={16} />
                  <span>Add Tag</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeFromArray("tags", index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "ingredients" && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Video size={24} />
                <span>Ingredients Section</span>
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Ingredients Video URL *
                </label>
                <input
                  type="text"
                  value={product.ingredientsVideo}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      ingredientsVideo: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Enter video URL"
                  required
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <ArrayField
                title="Ingredients"
                field="ingredients"
                placeholder="Enter ingredient name"
                buttonText="Add Ingredient"
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <ArrayField
                title="Ingredients Descriptions"
                field="ingredientsDescription"
                placeholder="Enter ingredient description"
                buttonText="Add Description"
              />
            </div>
          </div>
        )}

        {activeTab === "benefits" && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <ArrayField
                title="Benefits"
                field="benefits"
                placeholder="Enter product benefit"
                buttonText="Add Benefit"
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <ArrayField
                title="Supplement Guide"
                field="supplementGuide"
                placeholder="Enter supplement guide item"
                buttonText="Add Guide Item"
              />
            </div>
          </div>
        )}

        {activeTab === "mission" && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Target size={24} />
                <span>Mission Section</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mission Text *
                  </label>
                  <textarea
                    value={product.missiontext}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        missiontext: e.target.value,
                      }))
                    }
                    rows={6}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Enter mission statement or text"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mission Image URL *
                  </label>
                  <input
                    type="text"
                    value={product.missionImage}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        missionImage: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Enter mission image URL"
                    required
                  />

                  {product.missionImage && (
                    <div className="mt-4">
                      <img
                        src={product.missionImage}
                        alt="Mission"
                        className="w-full h-48 object-cover rounded-md bg-gray-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNjQiIGZpbGw9IiM2QjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkltYWdlIEVycm9yPC90ZXh0Pgo8L3N2Zz4K";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
