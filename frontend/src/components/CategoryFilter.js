import { Filter } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['all', 'fiction', 'non-fiction', 'fantasy', 'mystery', 'romance', 'science'];

  return (
    <div className="flex items-center space-x-4">
      <Filter className="text-gray-400" size={20} />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;