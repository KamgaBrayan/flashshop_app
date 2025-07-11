import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

// Sample data
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    sku: "TS001",
    category: "T-Shirt",
    description: "Premium cotton t-shirt for everyday wear",
    features: ["100% cotton", "Machine washable", "Comfort fit"],
    technicalDetails: {
      dimensions: "S/M/L/XL",
      weight: "200g",
      material: "Cotton",
      compatibility: "All seasons"
    },
    price: 29.99,
    stock: 100,
    availability: "In Stock"
  },
  {
    id: 2,
    name: "Leather Jacket",
    sku: "LJ002",
    category: "Jacket",
    description: "Genuine leather jacket with modern design",
    features: ["Real leather", "Zip closure", "Multiple pockets"],
    technicalDetails: {
      dimensions: "M/L/XL",
      weight: "1.2kg",
      material: "Genuine leather",
      compatibility: "Spring/Fall"
    },
    price: 199.99,
    stock: 45,
    availability: "Limited Stock"
  }
];

const topCategories = ['All', 'Clothing', 'Accessories'];
const categories = ['All', 'T-Shirt', 'Jacket', 'Pants', 'Accessories'];

const ProductCatalog = () => {
  const [selectedTopCategory, setSelectedTopCategory] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Top Categories */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2">
          {topCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedTopCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedTopCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Categories */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product Identity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Technical Details</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price & Availability</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">ID: {product.id}</div>
                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                    <div className="text-sm text-gray-500">Category: {product.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{product.description}</div>
                    <ul className="mt-1 text-sm text-gray-500">
                      {product.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div>Dimensions: {product.technicalDetails.dimensions}</div>
                      <div>Weight: {product.technicalDetails.weight}</div>
                      <div>Material: {product.technicalDetails.material}</div>
                      <div>Compatibility: {product.technicalDetails.compatibility}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Stock: {product.stock}</div>
                    <div className="text-sm text-gray-500">{product.availability}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProductCatalog;