import React, { useState } from 'react';
import { Search, SlidersHorizontal, Grid, AlertCircle, RefreshCw } from 'lucide-react';
import { CourseCategory, Course } from '../types';
import { COURSES } from '../data';
import CourseCard from './CourseCard';

interface CourseCatalogueProps {
  onSelectCourse: (course: Course) => void;
}

export default function CourseCatalogue({ onSelectCourse }: CourseCatalogueProps) {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'Cohort' | 'Self-Paced'>('All');

  // Categories list helper
  const CATEGORIES: (CourseCategory | 'All')[] = [
    'All',
    CourseCategory.TECHNOLOGY,
    CourseCategory.BUSINESS,
    CourseCategory.DATA,
    CourseCategory.CREATIVE
  ];

  // Filtering Logic
  const filteredCourses = COURSES.filter(course => {
    // 1. Matches Category filter
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    // 2. Matches Format filter
    const matchesFormat = selectedFormat === 'All' || 
      (selectedFormat === 'Cohort' && course.format.includes('Cohort')) ||
      (selectedFormat === 'Self-Paced' && course.format.includes('Self-Paced'));

    // 3. Matches Text Query
    const query = searchQuery.toLowerCase();
    const matchesQuery = course.title.toLowerCase().includes(query) || 
      course.subtitle.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query);

    return matchesCategory && matchesFormat && matchesQuery;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedFormat('All');
  };

  return (
    <article id="catalogue-page-wrapper" className="bg-white text-navy-950 min-h-screen">
      
      {/* Catalogue Header */}
      <header className="relative bg-[#0F2044] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center sm:text-left relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold text-[#F59E0B] tracking-[0.2em] font-mono uppercase">
              ACADEMY DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-4.5xl font-black mt-2 tracking-tight">
              Professional Courses
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Invest in your operational competence. Browse top interactive tech, creative, data and product strategy courses curated by practitioners.
            </p>
          </div>

          {/* Core total counter */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center sm:text-right shrink-0">
            <div className="text-2xl font-black font-mono text-[#F59E0B]">
              {filteredCourses.length}
            </div>
            <p className="text-[10px] text-gray-300 font-mono tracking-wider uppercase mt-0.5">
              Available Courses Filtered
            </p>
          </div>
        </div>
      </header>

      {/* Control Navigation Filters section */}
      <section className="py-8 bg-slate-50 border-b border-gray-100 sticky top-[71px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* 1. Category Tabs */}
            <div 
              id="catalogue-category-tabs"
              className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none snap-x"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`tab-cat-${cat.replace(' ', '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg whitespace-nowrap cursor-pointer transition-all snap-align-start ${
                    selectedCategory === cat
                      ? 'bg-[#0f2044] text-white shadow-xs'
                      : 'bg-white text-gray-600 hover:text-navy-950 border border-gray-200/60'
                  }`}
                >
                  {cat === 'All' ? 'All Curricula' : cat}
                </button>
              ))}
            </div>

            {/* 2. Format & Search query */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Format Filter Selection */}
              <div className="relative">
                <select
                  id="catalogue-format-select"
                  className="bg-white text-xs font-semibold text-gray-700 pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 cursor-pointer appearance-none"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as any)}
                >
                  <option value="All">All Formats</option>
                  <option value="Cohort">Live Cohort Only</option>
                  <option value="Self-Paced">Self-Paced Only</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-3.5 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-500" />
              </div>

              {/* TextInput search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
                <input
                  id="catalogue-search-query"
                  type="text"
                  placeholder="Query skill, topic, editor..."
                  className="w-full bg-white text-xs font-medium pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Main Grid display area */}
      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
        
        {filteredCourses.length > 0 ? (
          <div 
            id="catalogue-courses-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
          >
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id}
                course={course}
                onSelect={onSelectCourse}
              />
            ))}
          </div>
        ) : (
          /* Empty Template Placeholder State */
          <div 
            id="catalogue-empty-state"
            className="max-w-md mx-auto py-16 text-center flex flex-col items-center gap-4 bg-slate-50 border border-gray-100 rounded-2xl p-8"
          >
            <div className="p-3 bg-amber-50 rounded-full text-[#F59E0B]">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-lg font-black text-[#0f2044] tracking-tight">
              No courses in this category yet
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              We update our curricula frequently alongside active startup guidelines. Clear filters to explore our other active courses.
            </p>

            <button
              id="btn-clear-catalogue-filters"
              onClick={clearFilters}
              className="mt-2.5 flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-[#0F2044] hover:bg-navy-950 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Search Fields
            </button>
          </div>
        )}

      </main>

    </article>
  );
}
